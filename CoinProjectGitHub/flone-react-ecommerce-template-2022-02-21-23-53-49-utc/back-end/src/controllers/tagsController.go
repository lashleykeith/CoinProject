package controllers

import (
	"ambassador/src/database"
	"ambassador/src/models"
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetAllTags(c *fiber.Ctx) error {
	var tags []models.Tags
	database.DB.Find(&tags)

	return c.JSON(tags)
}

func GetTag(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	var tags models.Tags

	tags.Id = id

	database.DB.Find(&tags)

	return c.JSON(tags)
}

func UpdateTag(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	product := models.Tags{}
	product.Id = id

	c.MultipartForm()

	product.TagName = c.FormValue("tagname")

	if c.FormValue("novelty") == "" {
		product.Novelty = ""
	} else {
		product.Novelty = c.FormValue("novelty")
	}

	if c.FormValue("mint") == "" {
		product.Mint = ""
	} else {
		product.Mint = c.FormValue("mint")
	}

	if c.FormValue("year") == "" {
		product.Year = ""
	} else {
		product.Year = c.FormValue("year")
	}

	if c.FormValue("weight") == "" {
		product.Weight = ""
	} else {
		product.Weight = c.FormValue("weight")
	}

	if c.FormValue("metal") == "" {
		product.Metal = ""
	} else {
		product.Metal = c.FormValue("metal")
	}

	if c.FormValue("collection") == "" {
		product.Collection = ""
	} else {
		product.Collection = c.FormValue("collection")
	}

	if c.FormValue("commemorative") == "" {
		product.Commemorative = ""
	} else {
		product.Commemorative = c.FormValue("commemorative")
	}

	database.DB.Model(&product).Updates(&product)
	go database.ClearCache("products_frontend", "products_backend")

	return c.JSON(product)
}

func CreateTag(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		fmt.Println(err)
		return err
	}

	user := models.Tags{
		TagName:       data["title"],
		Year:          data["year"],
		Mint:          data["mint"],
		Weight:        data["weight"],
		Metal:         data["metal"],
		Collection:    data["collection"],
		Commemorative: data["commemorative"],
		Novelty:       data["novelty"],
	}

	database.DB.Create(&user)

	return c.JSON(user)
}
