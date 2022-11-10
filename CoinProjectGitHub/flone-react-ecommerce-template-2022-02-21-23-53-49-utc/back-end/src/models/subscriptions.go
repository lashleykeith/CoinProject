package models

type Subscription struct {
	Model
	UserId      uint    `json:"user_id"`
	SupplierID  uint    `json:"supplier_id"`
	ProductName string  `json:"product_name"`
	ProductId   uint    `json:"product_id"`
	FirstName   string  `json:"-"`
	LastName    string  `json:"-"`
	Name        string  `json:"name" gorm:"-"`
	Email       string  `json:"email"`
	Address     string  `json:"address" gorm:"null"`
	City        string  `json:"city" gorm:"null"`
	Country     string  `json:"country" gorm:"null"`
	PhoneNumber string  `json:"phoneNumber" gorm:"null"`
	Total       float64 `json:"total"`
}
