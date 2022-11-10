package controllers

import (
	"ambassador/src/database"
	"ambassador/src/models"
	"context"
	"fmt"
	"log"
	"net/smtp"
	"strconv"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"

	"github.com/stripe/stripe-go/v72"
	"github.com/stripe/stripe-go/v72/checkout/session"
	"github.com/stripe/stripe-go/v72/customer"
	"github.com/stripe/stripe-go/v72/price"
	"github.com/stripe/stripe-go/v72/product"
	"github.com/stripe/stripe-go/v72/sub"
)

func GetAllOrders(c *fiber.Ctx) error {
	var orders []models.Order

	database.DB.Preload("OrderItems").Find(&orders)

	for i, order := range orders {
		orders[i].Name = order.FullName()
		orders[i].Total = order.GetTotal()
	}

	return c.JSON(orders)
}

func SupplierOrders(c *fiber.Ctx) error {
	var orders []models.Order

	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &ClaimsWithScope{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		return err
	}

	payload := token.Claims.(*ClaimsWithScope)

	userId, err := strconv.Atoi(payload.Subject)

	if err != nil {
		return err
	}

	database.DB.Preload("OrderItems").Where("supplier_id = ?", userId).Find(&orders)

	for i, order := range orders {
		orders[i].Name = order.FullName()
		orders[i].Total = order.GetTotal()
	}

	return c.JSON(orders)
}

type OrderProductType struct {
	models.Product
	Quantity int `json:"quantity"`
}

type CreateOrderRequest struct {
	FirstName        string `json:"firstName"`
	LastName         string `json:"lastName"`
	Email            string `json:"email"`
	UsaMailingAddres string `json:"usaMailingAddres"`
	PhoneNumber      string `json:"phone"`
	Addnotes         string `json:"addnotes"`
	Products         []OrderProductType
}

func CreateOrder(c *fiber.Ctx) error {
	var request CreateOrderRequest

	if err := c.BodyParser(&request); err != nil {
		log.Print(err)
		return err
	}

	order := models.Order{}

	tx := database.DB.Begin()

	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &ClaimsWithScope{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil || !token.Valid {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}

	payload := token.Claims.(*ClaimsWithScope)

	fmt.Println(payload.Subject)

	userId, err := strconv.ParseInt(payload.Subject, 10, 64)

	var lineItems []*stripe.CheckoutSessionLineItemParams

	for _, requestProduct := range request.Products {
		product := models.Product{}
		product.Id = requestProduct.Id
		database.DB.First(&product)

		order = models.Order{
			FirstName:         request.FirstName,
			LastName:          request.LastName,
			UserId:            uint(userId),
			Email:             request.Email,
			PhoneNumber:       request.PhoneNumber,
			USAMailingAddress: request.UsaMailingAddres,
			ProductId:         uint(product.Id),
		}

		if err := tx.Create(&order).Error; err != nil {
			tx.Rollback()
			c.Status(fiber.StatusBadRequest)
			return c.JSON(fiber.Map{
				"message": err.Error(),
			})
		}

		total := product.Price * float64(requestProduct.Quantity)

		item := models.OrderItem{
			OrderId:      uint(order.Id),
			ProductTitle: product.Title,
			Price:        product.Price,
			Quantity:     uint(requestProduct.Quantity),
			AdminRevenue: total,
		}

		if err := tx.Create(&item).Error; err != nil {
			tx.Rollback()
			c.Status(fiber.StatusBadRequest)
			return c.JSON(fiber.Map{
				"message": err.Error(),
			})
		}

		lineItems = append(lineItems, &stripe.CheckoutSessionLineItemParams{
			Name:        stripe.String(product.Title),
			Description: stripe.String(product.Description),
			Amount:      stripe.Int64(100 * int64(product.Price)),
			Currency:    stripe.String("usd"),
			Quantity:    stripe.Int64(int64(requestProduct.Quantity)),
		})

	}

	var admin models.User
	var user models.User

	database.DB.Where("is_super_admin = ?", 1).First(&admin)
	database.DB.Where("id = ?", userId).First(&user)

	userName := user.FirstName + " " + user.LastName

	stripe.Key = "sk_test_51KqCTnHKhevhi95LPvcjgmwjAqQ4Y7VcZQiQq03msT7Smcy9RCzFkEMgbZo0Ko4veL95pbdSLE2q1PnFNDxbWswe00IHLC8ehx"

	params := stripe.CheckoutSessionParams{
		SuccessURL:         stripe.String("http://localhost:3000/success?source={CHECKOUT_SESSION_ID}&email=" + admin.Email + "&userName=" + userName),
		CancelURL:          stripe.String("http://localhost:3000/error"),
		PaymentMethodTypes: stripe.StringSlice([]string{"card"}),
		LineItems:          lineItems,
		Mode:               stripe.String(string(stripe.CheckoutSessionModePayment)),
	}

	source, err := session.New(&params)

	if err != nil {
		tx.Rollback()
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	order.TransactionId = source.ID

	if err := tx.Save(&order).Error; err != nil {
		tx.Rollback()
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	tx.Commit()

	return c.JSON(fiber.Map{
		"url":     source.URL,
		"success": true,
	})

}

type CreateSubscriptionRequest struct {
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
	Email       string
	Address     string
	Country     string
	City        string
	PhoneNumber string
	Product     OrderProductType
}

func GetSubscriptions(c *fiber.Ctx) error {
	subs := []models.Subscription{}

	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &ClaimsWithScope{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		return err
	}

	payload := token.Claims.(*ClaimsWithScope)

	userId, err := strconv.Atoi(payload.Subject)

	database.DB.Model(subs).Where("user_id = ?", userId).Find(&subs)

	log.Print(subs)

	return c.JSON(subs)

}

func Subscription(c *fiber.Ctx) error {
	var request CreateSubscriptionRequest

	if err := c.BodyParser(&request); err != nil {
		log.Print(err)
		return err
	}

	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &ClaimsWithScope{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		return err
	}

	payload := token.Claims.(*ClaimsWithScope)

	userId, err := strconv.Atoi(payload.Subject)

	product_supplier := Products_Suppliers{}
	database.DB.Model(&product_supplier).Where("product_id = ?", request.Product.Id).Find(&product_supplier)

	subProd := models.Product{}

	database.DB.Model(&subProd).Where("id = ?", request.Product.Id).Find(&subProd)

	subscription := models.Subscription{
		UserId:      uint(userId),
		ProductName: subProd.Title,
		Total:       subProd.Price,
		FirstName:   request.FirstName,
		LastName:    request.LastName,
		Email:       request.Email,
		Address:     request.Address,
		Country:     request.Country,
		City:        request.City,
		PhoneNumber: request.PhoneNumber,
		SupplierID:  uint(product_supplier.User_id),
		ProductId:   uint(request.Product.Id),
	}

	tx := database.DB.Begin()

	stripe.Key = "sk_test_51KqCTnHKhevhi95LPvcjgmwjAqQ4Y7VcZQiQq03msT7Smcy9RCzFkEMgbZo0Ko4veL95pbdSLE2q1PnFNDxbWswe00IHLC8ehx"

	customerParams := &stripe.CustomerParams{
		Description:   stripe.String("My First Test Customer (created for API docs)"),
		DefaultSource: stripe.String("card"),
	}

	customer, err := customer.New(customerParams)

	Prodparams := &stripe.ProductParams{
		Name: stripe.String(request.Product.Title),
	}
	prod, _ := product.New(Prodparams)

	PriceParams := &stripe.PriceParams{
		Currency: stripe.String(string(stripe.CurrencyRON)),
		Product:  stripe.String(prod.ID),
		Recurring: &stripe.PriceRecurringParams{
			Interval: stripe.String("month"),
		},
		UnitAmount: stripe.Int64(2000),
	}
	p, _ := price.New(PriceParams)

	params := stripe.SubscriptionParams{
		Customer: &customer.ID,
		Items: []*stripe.SubscriptionItemsParams{
			{
				Price: stripe.String(p.ID),
			},
		},
	}

	source, err := sub.New(&params)

	if err != nil {
		tx.Rollback()
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if err := tx.Save(&subscription).Error; err != nil {
		tx.Rollback()
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	tx.Commit()

	return c.JSON(fiber.Map{
		"source":  source,
		"success": true,
	})

}

type SubData struct {
	Product_id int `json:"product_id"`
}

func CancelSubscription(c *fiber.Ctx) error {
	subs := models.Subscription{}
	data := SubData{}

	if err := c.BodyParser(&data); err != nil {
		log.Print(err)
		return err
	}

	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &ClaimsWithScope{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {

		log.Print(err)
		return err
	}

	payload := token.Claims.(*ClaimsWithScope)

	database.DB.Model(subs).Where("user_id = ? AND product_id = ?", payload.Subject, data.Product_id).Delete(&subs)

	return c.JSON(fiber.Map{
		"success": true,
	})
}

func CompleteOrder(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	order := models.Order{}

	database.DB.Preload("OrderItems").First(&order, models.Order{
		TransactionId: data["source"],
	})

	if order.Id == 0 {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "Order not found",
		})
	}

	order.Complete = true
	database.DB.Save(&order)

	go func(order models.Order) {
		supplierRevenue := 0.0
		adminRevenue := 0.0

		for _, item := range order.OrderItems {
			// supplierRevenue += item.SupplierRevenue
			adminRevenue += item.AdminRevenue
		}

		user := models.User{}
		user.Id = int(order.UserId)

		database.DB.First(&user)

		database.Cache.ZIncrBy(context.Background(), "rankings", supplierRevenue, user.Name())

		// ambassadorMessage := []byte(fmt.Sprintf("You earned $%f from the link #%s", supplierRevenue, order.ProductId))
		// smtp.SendMail("0.0.0.0:1025", nil, "no-reply@email.com", []string{order.SupplierEmail}, ambassadorMessage)
		adminMessage := []byte(fmt.Sprintf("Order #%d with a total of $%f has been completed", order.Id, adminRevenue))
		smtp.SendMail("host.docker.internal:1025", nil, "no-reply@email.com", []string{"admin@admin.com"}, adminMessage)
	}(order)

	return c.JSON(fiber.Map{
		"message": "success",
	})
}
