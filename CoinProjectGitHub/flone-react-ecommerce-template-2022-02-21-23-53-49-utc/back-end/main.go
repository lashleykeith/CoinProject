package main

import (
	"ambassador/src/database"
	"ambassador/src/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	database.Connect()
	database.AutoMigrate()
	database.SetupRedis()
	database.SetupCacheChannel()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	routes.Setup(app)

	app.Listen(":8000")
}

// echo.>main.go
//https://www.docker.com/products/docker-desktop
// go mod init ambassador
// go mod tidy
// docker-compose up
// https://gorm.io/
// go get -u gorm.io/gorm
// go get -u gorm.io/driver/mysql
// https://github.com/cosmtrek/air
// docker-compose up --build
// docker-compose up
// https://github.com/antoniopapa/go-ambassador/tree/main/src/controllers
// https://pkg.go.dev/golang.org/x/crypto@v0.0.0-20220214200702-86341886e292/bcrypt
// https://pkg.go.dev/github.com/bxcodec/faker/v3
// docker-compose exec backend sh
// go run src/commands/populateUsers.go
// docker image prune -a --force
// docker version
// https://pkg.go.dev/github.com/go-redis/redis/v8
// go run src/commands/updateRankings.go
// https://github.com/stripe/stripe-go
// https://github.com/mailhog/MailHog

//  Commands that are not working
// docker-compose exec backend sh
// docker-compose up --build

// Two commands I need to work
//  docker-compose exec backend sh
// go run src/commands/populateUsers.go

// https://github.com/antoniopapa/go-ambassador
// https://github.com/antoniopapa/react-ambassador
