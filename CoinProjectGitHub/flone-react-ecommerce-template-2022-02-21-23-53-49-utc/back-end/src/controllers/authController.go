package controllers

import (
	"ambassador/src/database"
	"ambassador/src/middlewares"
	"ambassador/src/models"
	"fmt"

	//"github.com/dgrijalva/jwt-go"

	"github.com/gofiber/fiber/v2"

	//"strconv"
	"strings"
	"time"
)

func Register(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	if data["password"] != data["password_confirm"] {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "password do not match",
		})
	}

	user := models.User{
		FirstName:        data["first_name"],
		LastName:         data["last_name"],
		Email:            data["email"],
		UsaMailAddress:   data["usa_mail"],
		PhoneNumber:      data["phone_number"],
		SecurityQuestion: data["security_question"],
		SecurityAnswer:   data["security_answer"],

		IsAmbassador: strings.Contains(c.Path(), "api/ambassador"),
	}
	user.SetPassword(data["password"])

	database.DB.Create(&user)

	token, err := middlewares.GenerateJWT(user.Id, "ambassador")

	if err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Invalid Credentials",
		})
	}

	return c.JSON(fiber.Map{
		"message":      "success",
		"cookie_value": token,
	})
}

func IsSuperAdmin(c *fiber.Ctx, data map[string]string) bool {
	var user models.User
	database.DB.Where("email = ?", data["email"]).First(&user)

	if user.IsSuperAdmin {
		return true
	}

	return false
}

func IsAdmin(c *fiber.Ctx, data map[string]string) bool {

	var user models.User
	database.DB.Where("email = ?", data["email"]).First(&user)

	if user.IsAmbassador {
		return false
	}

	return true
}

func Login(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	var user models.User

	database.DB.Where("email = ?", data["email"]).First(&user)

	if user.Id == 0 {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Invalid Credentials",
		})
	}

	if err := user.ComparePassword(data["password"]); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Invalid Credentials",
		})
	}

	if data["security_answer"] != user.SecurityAnswer {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Invalid Credentials",
		})
	}

	isAmbassador := strings.Contains(c.Path(), "api/ambassador")

	var scope string

	if IsSuperAdmin(c, data) {
		scope = "super_admin"
	} else if IsAdmin(c, data) {
		scope = "admin"
	} else {
		scope = "ambassador"
	}

	if !isAmbassador && user.IsAmbassador {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "unauthorized",
		})
	}

	token, err := middlewares.GenerateJWT(user.Id, scope)

	if err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Invalid Credentials",
		})
	}

	return c.JSON(fiber.Map{
		"message":      "success",
		"scope":        scope,
		"cookie_value": token,
	})
}

func User(c *fiber.Ctx) error {
	id, _ := middlewares.GetUserId(c)

	var user models.User

	database.DB.Where("id = ?", id).First(&user)

	if strings.Contains(c.Path(), "api/ambassador") {
		ambassador := models.Ambassador(user)
		return c.JSON(ambassador)

	}

	return c.JSON(user)

}

func ConfirmEmail(c *fiber.Ctx) error {

	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	id, _ := middlewares.GetUserId(c)

	user := models.User{
		EmailComfirmed: true,
	}
	user.Id = int(id)

	database.DB.Model(&user).Updates(&user)

	return c.JSON(fiber.Map{
		"message": "success",
	})

}

func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "success",
	})

}

func UpdateInfo(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		fmt.Print(err)
		return err
	}

	id, _ := middlewares.GetUserId(c)

	user := models.User{
		FirstName:        data["first_name"],
		LastName:         data["last_name"],
		Email:            data["email"],
		PhoneNumber:      data["phone"],
		UsaMailAddress:   data["usa_mail"],
		SecurityQuestion: data["security_question"],
		SecurityAnswer:   data["security_answer"],
	}
	user.Id = int(id)

	database.DB.Model(&user).Updates(&user)

	return c.JSON(user)
}

func UpdatePassword(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	if data["password"] != data["password_confirm"] {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "password do not match",
		})
	}

	id, _ := middlewares.GetUserId(c)

	user := models.User{}
	user.Id = int(id)

	user.SetPassword(data["password"])

	database.DB.Model(&user).Updates(&user)

	return c.JSON(user)
}
