package models

type Tags struct {
	Model
	TagName       string `json:"tagname"`
	Year          string `json:"year"`
	Mint          string `json:"mint"`
	Weight        string `json:"weight"`
	Metal         string `json:"metal"`
	Collection    string `json:"collection"`
	Commemorative string `json:"commemorative"`
	Novelty       string `json:"novelty"`
}
