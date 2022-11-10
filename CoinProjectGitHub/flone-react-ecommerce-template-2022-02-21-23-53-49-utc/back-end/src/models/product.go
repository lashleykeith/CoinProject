package models

type Product struct {
	Id            int     `json:"id"`
	Title         string  `json:"title"`
	Description   string  `json:"description"`
	FaceImage     string  `json:"faceImage"`
	BackImage     string  `json:"backImage"`
	Year          string  `json:"year"`
	Mint          string  `json:"mint"`
	Weight        string  `json:"weight"`
	Metal         string  `json:"metal"`
	Collection    string  `json:"collection"`
	Commemorative string  `json:"commemorative"`
	Novelty       string  `json:"novelty"`
	In_stock      int     `json:"in_stock"`
	IsSale        bool    `json:"is_sale"`
	Price         float64 `json:"price"`
	DiscountPrice float64 `json:"discount_price"`
}
