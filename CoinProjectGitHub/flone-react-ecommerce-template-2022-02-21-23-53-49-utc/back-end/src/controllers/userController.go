package controllers

import (
	"ambassador/src/database"
	"ambassador/src/models"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"strconv"

	"github.com/go-redis/redis/v8"
	"github.com/gofiber/fiber/v2"
)

func Ambassadors(c *fiber.Ctx) error {
	var users []models.User

	database.DB.Where("is_ambassador = true").Find(&users)

	return c.JSON(users)
}

func Accounts(c *fiber.Ctx) error {
	var accounts []models.User
	database.DB.Where("is_super_admin = false").Find(&accounts)

	return c.JSON(accounts)

}

type PromoteRequest struct {
	UserID string `json:"userId"`
}

func PromoteUser(c *fiber.Ctx) error {
	var request PromoteRequest

	if err := c.BodyParser(&request); err != nil {
		log.Print(err)
		return err
	}

	var account models.User
	database.DB.Model(account).Where("id =?", request.UserID).Update("is_ambassador", false)

	return c.JSON(account)
}

func DeleteUser(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	user := models.User{}
	user.Id = id

	database.DB.Model(user).Where("id = ?", user.Id).Delete(&user)

	go database.ClearCache("products_frontend", "products_backend")

	return nil
}

func AccountData(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	var accountModel models.User

	database.DB.Where("Id = ?", id).Find(&accountModel)

	jsonAccount, err := json.Marshal(accountModel)

	out := map[string]interface{}{}
	json.Unmarshal(jsonAccount, &out)
	out["id"] = accountModel.Id
	out["first_name"] = accountModel.FirstName
	out["last_name"] = accountModel.LastName
	out["email"] = accountModel.Email
	out["is_ambassador"] = accountModel.IsAmbassador
	out["revenue"] = accountModel.Revenue

	outputJSON, err := json.Marshal(out)
	fmt.Println(err, string(outputJSON))

	return c.JSON(string(outputJSON))
}

func Rankings(c *fiber.Ctx) error {
	rankings, err := database.Cache.ZRevRangeByScoreWithScores(context.Background(), "rankings", &redis.ZRangeBy{
		Min: "-inf",
		Max: "+inf",
	}).Result()

	if err != nil {
		return err
	}

	result := make(map[string]float64)

	for _, ranking := range rankings {
		result[ranking.Member.(string)] = ranking.Score
	}

	return c.JSON(result)
}

func GetAdminInfos(c *fiber.Ctx) error {
	var admin models.User

	database.DB.Where("is_super_admin = 1").First(&admin)

	return c.JSON(fiber.Map{
		"adminEmail": admin.Email,
		"adminPhone": admin.PhoneNumber,
	})

}
