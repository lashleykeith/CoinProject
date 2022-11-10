package controllers

import (
	"ambassador/src/database"
	"ambassador/src/middlewares"
	"ambassador/src/models"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
)

func GetAllProducts(c *fiber.Ctx) error {
	var products []models.Product
	database.DB.Find(&products)

	return c.JSON(products)
}

const SecretKey = "secret"

type ClaimsWithScope struct {
	jwt.StandardClaims
	Scope string
}

type Products_Suppliers struct {
	Product_id uint `json:"product_id"`
	User_id    int  `json:"user_id"`
}

func EditSupplierProduct(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	product_supplier := Products_Suppliers{}

	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &ClaimsWithScope{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		return err
	}

	payload := token.Claims.(*ClaimsWithScope)

	database.DB.Model(&product_supplier).Where("product_id = ?", id).Find(&product_supplier)

	userId, err := strconv.Atoi(payload.Subject)

	if err != nil {
		return err
	}

	if product_supplier.User_id != userId {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "unauthorized",
		})
	}

	var product models.Product
	database.DB.Where("id =?", product_supplier.Product_id).Find(&product)

	return c.JSON(product)
}

func UpdateSupplierProduct(c *fiber.Ctx) error {

	id, _ := strconv.Atoi(c.Params("id"))

	product_supplier := Products_Suppliers{}

	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &ClaimsWithScope{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		return err
	}

	payload := token.Claims.(*ClaimsWithScope)

	database.DB.Model(&product_supplier).Where("product_id = ?", id).Find(&product_supplier)

	userId, err := strconv.Atoi(payload.Subject)

	if err != nil {
		return err
	}

	if payload.Scope != "super_admin" {

		if product_supplier.User_id != userId {
			c.Status(fiber.StatusUnauthorized)
			return c.JSON(fiber.Map{
				"message": "unauthorized",
			})
		}
	}

	product := models.Product{}
	old_product := models.Product{}
	product.Id = id

	c.MultipartForm()

	file, err := c.FormFile("file")
	if file != nil {

		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": true,
				"msg":   err.Error(),
			})
		}

		log.Printf("Uploaded File: %+v\n", file.Filename)
		log.Printf("File Size: %+v\n", file.Size)
		log.Printf("MIME Header: %+v\n", file.Header)

		// Get Buffer from file
		buffer, err := file.Open()

		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": true,
				"msg":   err.Error(),
			})
		}
		defer buffer.Close()

		ImageToken := middlewares.GenerateSecureToken(12)

		// Create a temporary file within our temp-images directory that follows
		// a particular naming pattern
		tempFile, err := ioutil.TempFile("products-images", ImageToken+"-*.jpg")
		if err != nil {
			fmt.Println(err)
		}
		defer tempFile.Close()

		// read all of the contents of our uploaded file into a
		// byte array
		fileBytes, err := ioutil.ReadAll(buffer)
		if err != nil {
			fmt.Println(err)
		}
		// write this byte array to our temporary file
		tempFile.Write(fileBytes)
		tempFile.Close()
		// product.Image = tempFile.Name()

		database.DB.Model(&product).Where("id = ?", id).Find(&old_product)
		// os.Remove(old_product.Image)

	} else {
		product.FaceImage = c.FormValue("faceImage")
		product.BackImage = c.FormValue("backImage")

	}

	price, _ := strconv.ParseFloat(c.FormValue("price"), 64)
	issale, _ := strconv.ParseBool(c.FormValue("is_sale"))

	product.Title = c.FormValue("title")
	product.Description = c.FormValue("description")
	product.Price = price
	product.IsSale = issale

	database.DB.Model(&product).Updates(&product)

	return c.JSON(product)
}

func GetImage(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	var product models.Product

	database.DB.Where("id=?", id).Find(&product)
	return c.Download(product.FaceImage)

}

func GetBackImage(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	var product models.Product

	database.DB.Where("id=?", id).Find(&product)
	return c.Download(product.BackImage)

}

func CreateProducts(c *fiber.Ctx) error {
	product := models.Product{}

	c.MultipartForm()

	file, err := c.FormFile("file")

	if file != nil {

		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": true,
				"msg":   err.Error(),
			})
		}

		log.Printf("Uploaded File: %+v\n", file.Filename)
		log.Printf("File Size: %+v\n", file.Size)
		log.Printf("MIME Header: %+v\n", file.Header)

		// Get Buffer from file
		buffer, err := file.Open()

		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": true,
				"msg":   err.Error(),
			})
		}
		defer buffer.Close()

		ImageToken := middlewares.GenerateSecureToken(12)

		// Create a temporary file within our temp-images directory that follows
		// a particular naming pattern
		tempFile, err := ioutil.TempFile("products-images", ImageToken+"-*.jpg")
		if err != nil {
			fmt.Println(err)
		}
		defer tempFile.Close()

		// read all of the contents of our uploaded file into a
		// byte array
		fileBytes, err := ioutil.ReadAll(buffer)
		if err != nil {
			fmt.Println(err)
		}
		// write this byte array to our temporary file
		tempFile.Write(fileBytes)
		tempFile.Close()
		// product.Image = tempFile.Name()

	} else {
		// product.Image = c.FormValue("image")

	}

	price, _ := strconv.ParseFloat(c.FormValue("price"), 64)

	product.Title = c.FormValue("title")
	product.Description = c.FormValue("description")
	product.Year = c.FormValue("year")
	product.Mint = c.FormValue("mint")
	product.Weight = c.FormValue("weight")
	product.Metal = c.FormValue("metal")
	product.Collection = c.FormValue("collection")
	product.Commemorative = c.FormValue("commemorative")
	product.Novelty = c.FormValue("novelty")
	product.Price = price

	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &ClaimsWithScope{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	database.DB.Create(&product)

	payload := token.Claims.(*ClaimsWithScope)

	products_supplier := Products_Suppliers{}

	userId, err := strconv.Atoi(payload.Subject)

	products_supplier.User_id = userId
	products_supplier.Product_id = uint(product.Id)

	if err != nil {
		return err
	}

	database.DB.Model(&products_supplier).Create(&products_supplier)

	go database.ClearCache("products_frontend", "products_backend")

	return c.JSON(product)
}

func GetProduct(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	var product models.Product

	product.Id = id

	database.DB.Find(&product)

	return c.JSON(product)
}

func GetSupplierProduct(c *fiber.Ctx) error {
	products_supplier := []Products_Suppliers{}
	var product []models.Product
	products := []models.Product{}

	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &ClaimsWithScope{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		return err
	}

	payload := token.Claims.(*ClaimsWithScope)

	database.DB.Model(&products_supplier).Where("user_id = ?", payload.Subject).Find(&products_supplier)

	for i := 0; i < len(products_supplier); i++ {
		database.DB.Model(&products).Where("id = ?", products_supplier[i].Product_id).Find(&product)
		products = append(products, product...)
	}

	return c.JSON(products)
}

func UpdateProduct(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	product := models.Product{}
	product.Id = id
	old_product := models.Product{}

	c.MultipartForm()

	faceFile, err1 := c.FormFile("faceFile")
	fmt.Println(err1)
	backFile, err2 := c.FormFile("backFile")
	fmt.Println(err2)

	if faceFile != nil {

		if err1 != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": true,
				"msg":   err2.Error(),
			})
		}

		log.Printf("Uploaded File: %+v\n", faceFile.Filename)
		log.Printf("File Size: %+v\n", faceFile.Size)
		log.Printf("MIME Header: %+v\n", faceFile.Header)

		// Get Buffer from file
		buffer, err := faceFile.Open()

		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": true,
				"msg":   err.Error(),
			})
		}
		defer buffer.Close()

		ImageToken := middlewares.GenerateSecureToken(12)

		// Create a temporary file within our temp-images directory that follows
		// a particular naming pattern
		tempFile, err := ioutil.TempFile("products-images", ImageToken+"-*.jpg")
		if err != nil {
			fmt.Println(err)
		}
		defer tempFile.Close()

		// read all of the contents of our uploaded file into a
		// byte array
		fileBytes, err := ioutil.ReadAll(buffer)
		if err != nil {
			fmt.Println(err)
		}
		// write this byte array to our temporary file
		tempFile.Write(fileBytes)
		tempFile.Close()
		product.FaceImage = tempFile.Name()

		database.DB.Model(&product).Where("id = ?", id).Find(&old_product)
		os.Remove(old_product.FaceImage)

	} else {
		product.FaceImage = c.FormValue("faceImage")
	}

	if backFile != nil {

		if err2 != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": true,
				"msg":   err2.Error(),
			})
		}

		log.Printf("Uploaded File: %+v\n", backFile.Filename)
		log.Printf("File Size: %+v\n", backFile.Size)
		log.Printf("MIME Header: %+v\n", backFile.Header)

		// Get Buffer from file
		buffer, err := backFile.Open()

		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": true,
				"msg":   err.Error(),
			})
		}
		defer buffer.Close()

		ImageToken := middlewares.GenerateSecureToken(12)

		// Create a temporary file within our temp-images directory that follows
		// a particular naming pattern
		tempFile, err := ioutil.TempFile("products-images", ImageToken+"-*.jpg")
		if err != nil {
			fmt.Println(err)
		}
		defer tempFile.Close()

		// read all of the contents of our uploaded file into a
		// byte array
		fileBytes, err := ioutil.ReadAll(buffer)
		if err != nil {
			fmt.Println(err)
		}
		// write this byte array to our temporary file
		tempFile.Write(fileBytes)
		tempFile.Close()
		product.BackImage = tempFile.Name()

		database.DB.Model(&product).Where("id = ?", id).Find(&old_product)
		os.Remove(old_product.BackImage)

	} else {
		product.BackImage = c.FormValue("backImage")
	}

	price, _ := strconv.ParseFloat(c.FormValue("price"), 64)

	if c.FormValue("discountPrice") == "0" {
		database.DB.Exec("update products set discount_price = 0  WHERE id=" + strconv.FormatUint(uint64(product.Id), 10))
	} else {
		disc_price, _ := strconv.ParseFloat(c.FormValue("discountPrice"), 64)
		product.DiscountPrice = disc_price
	}
	stock, _ := strconv.ParseInt(c.FormValue("in_stock"), 10, 64)

	product.Title = c.FormValue("title")
	product.Description = c.FormValue("description")
	product.Year = c.FormValue("year")
	product.Mint = c.FormValue("mint")
	product.Weight = c.FormValue("weight")
	product.Metal = c.FormValue("metal")
	product.Collection = c.FormValue("collection")
	product.Commemorative = c.FormValue("commemorative")
	product.Novelty = c.FormValue("novelty")
	product.In_stock = int(stock)
	product.Price = price

	database.DB.Model(&product).Updates(&product)
	go database.ClearCache("products_frontend", "products_backend")

	return c.JSON(product)
}

func DeleteProduct(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	products_supplier := Products_Suppliers{}

	product := models.Product{}
	product.Id = id

	database.DB.Model(products_supplier).Where("product_id = ?", product.Id).Delete(&product)
	database.DB.Where("id = ?", product.Id).Delete(&product)

	go database.ClearCache("products_frontend", "products_backend")

	return nil
}

func GetProductData(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	var product models.Product

	database.DB.Where("id = ?", id).Find(&product)
	fmt.Println(id)

	return c.JSON(product)
}

func ProductsFrontend(c *fiber.Ctx) error {
	var products []models.Product
	var ctx = context.Background()

	result, err := database.Cache.Get(ctx, "products_frontend").Result()

	if err != nil {
		database.DB.Find(&products)

		bytes, err := json.Marshal(products)

		if err != nil {
			panic(err)
		}

		if errKey := database.Cache.Set(ctx, "products_frontend", bytes, 30*time.Minute).Err(); errKey != nil {
			panic(errKey)
		}
	} else {
		json.Unmarshal([]byte(result), &products)
	}
	return c.JSON(products)
}

func ProductsBackend(c *fiber.Ctx) error {
	var products []models.Product
	var ctx = context.Background()

	result, err := database.Cache.Get(ctx, "products_backend").Result()

	if err != nil {
		database.DB.Find(&products)

		bytes, err := json.Marshal(products)
		if err != nil {
			panic(err)
		}

		database.Cache.Set(ctx, "products_backend", bytes, 30*time.Minute)
	} else {
		json.Unmarshal([]byte(result), &products)
	}

	var searchedProducts []models.Product

	if s := c.Query("s"); s != "" {
		lower := strings.ToLower(s)
		for _, product := range products {
			if strings.Contains(strings.ToLower(product.Title), lower) || strings.Contains(strings.ToLower(product.Description), lower) {
				searchedProducts = append(searchedProducts, product)
			}
		}
	} else {
		searchedProducts = products
	}

	if sortParam := c.Query("sort"); sortParam != "" {
		sortLower := strings.ToLower(sortParam)
		if sortLower == "asc" {
			sort.Slice(searchedProducts, func(i, j int) bool {
				return searchedProducts[i].Price < searchedProducts[j].Price
			})
		} else if sortLower == "desc" {
			sort.Slice(searchedProducts, func(i, j int) bool {
				return searchedProducts[i].Price > searchedProducts[j].Price
			})
		}
	}

	var total = len(searchedProducts)
	page, _ := strconv.Atoi(c.Query("page", "1"))
	perPage := 9

	var data []models.Product

	if total <= page*perPage && total >= (page-1)*perPage {
		data = searchedProducts[(page-1)*perPage : total]
	} else if total >= page*perPage {
		data = searchedProducts[(page-1)*perPage : page*perPage]
	} else {
		data = []models.Product{}
	}

	return c.JSON(fiber.Map{
		"data":      data,
		"total":     total,
		"page":      page,
		"last_page": total/perPage + 1,
	})
}
