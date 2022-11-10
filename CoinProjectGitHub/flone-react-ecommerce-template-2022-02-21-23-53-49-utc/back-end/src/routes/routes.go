package routes

import (
	"ambassador/src/controllers"
	"ambassador/src/middlewares"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	api := app.Group("api")

	superAdmin := api.Group("superAdmin")
	superAdmin.Post("login", controllers.Login)

	superAdminAuthenticated := superAdmin.Use(middlewares.IsSuperAdminAuthentificated)
	superAdminAuthenticated.Get("accounts", controllers.Accounts)
	superAdminAuthenticated.Get("user/data/:id", controllers.AccountData)
	superAdminAuthenticated.Get("allproducts", controllers.GetAllProducts)
	superAdminAuthenticated.Put("products/:id", controllers.UpdateProduct)
	superAdminAuthenticated.Get("products/:id", controllers.GetProduct)
	superAdminAuthenticated.Post("promote/", controllers.PromoteUser)
	superAdminAuthenticated.Get("allorders", controllers.GetAllOrders)
	superAdminAuthenticated.Delete("users/:id", controllers.DeleteUser)
	superAdminAuthenticated.Post("products", controllers.CreateProducts)
	superAdminAuthenticated.Post("create-tag", controllers.CreateTag)
	superAdminAuthenticated.Get("get-tag/:id", controllers.GetTag)
	superAdminAuthenticated.Put("update-tag/:id", controllers.UpdateTag)

	admin := api.Group("admin")
	admin.Post("register", controllers.Register)
	admin.Post("login", controllers.Login)

	adminAuthenticated := admin.Use(middlewares.IsAuthenticated)
	adminAuthenticated.Get("user", controllers.User)
	adminAuthenticated.Post("logout", controllers.Logout)
	adminAuthenticated.Get("supplier/products/", controllers.GetSupplierProduct)
	adminAuthenticated.Put("users/info", controllers.UpdateInfo)
	adminAuthenticated.Put("users/password", controllers.UpdatePassword)
	adminAuthenticated.Get("ambassador", controllers.Ambassadors)
	adminAuthenticated.Get("supplier/product/:id", controllers.EditSupplierProduct)
	adminAuthenticated.Put("products/:id", controllers.UpdateSupplierProduct)
	adminAuthenticated.Delete("products/:id", controllers.DeleteProduct)
	adminAuthenticated.Get("users/:id/links", controllers.Link)
	adminAuthenticated.Get("orders", controllers.SupplierOrders)

	ambassador := api.Group("ambassador")
	ambassador.Post("register", controllers.Register)
	ambassador.Post("login", controllers.Login)
	ambassador.Get("products/frontend", controllers.ProductsFrontend)
	ambassador.Get("products/backend", controllers.ProductsBackend)
	ambassador.Get("product/data/:id", controllers.GetProductData)
	ambassador.Get("image/:id", controllers.GetImage)
	ambassador.Get("back-img/:id", controllers.GetBackImage)
	ambassador.Get("alltags", controllers.GetAllTags)
	ambassador.Get("adminInfos", controllers.GetAdminInfos)

	ambassadorAuthenticated := ambassador.Use(middlewares.IsAuthenticated)
	ambassadorAuthenticated.Get("user", controllers.User)
	ambassadorAuthenticated.Post("confirm-user-email", controllers.ConfirmEmail)
	ambassadorAuthenticated.Post("logout", controllers.Logout)
	ambassadorAuthenticated.Put("users/info", controllers.UpdateInfo)
	ambassadorAuthenticated.Put("users/password", controllers.UpdatePassword)
	ambassadorAuthenticated.Post("links", controllers.CreateLink)
	ambassadorAuthenticated.Get("stats", controllers.Stats)
	ambassadorAuthenticated.Get("rankings", controllers.Rankings)
	ambassadorAuthenticated.Get("subscriptions", controllers.GetSubscriptions)

	checkout := api.Group("checkout")

	checkout.Get("links/:code", controllers.GetLink)
	checkout.Post("order", controllers.CreateOrder)
	checkout.Post("subscription", controllers.Subscription)
	checkout.Post("cancel/subscription", controllers.CancelSubscription)
	checkout.Post("orders/confirm", controllers.CompleteOrder)

}
