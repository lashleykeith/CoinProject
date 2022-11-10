package graph

import (
	"ambassador/src/database"
	"ambassador/src/models"

	"github.com/graphql-go/graphql"
)

var ProductType = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Products",
		Fields: graphql.Fields{
			"id": &graphql.Field{
				Type: graphql.Int,
			},
			"title": &graphql.Field{
				Type: graphql.String,
			},
			"description": &graphql.Field{
				Type: graphql.String,
			},
			"image": &graphql.Field{
				Type: graphql.String,
			},
			"price": &graphql.Field{
				Type: graphql.Float,
			},
			"isSale": &graphql.Field{
				Type: graphql.Boolean,
			},
		},
	},
)

var fields = graphql.Fields{
	"products": &graphql.Field{
		Type:        graphql.NewList(ProductType),
		Description: "Get projects",
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			var products []models.Product
			database.DB.Find(&products)

			return products, nil
		},
	},
}

var rootQuery = graphql.ObjectConfig{Name: "RootQuery", Fields: fields}
var schemaConfig = graphql.SchemaConfig{Query: graphql.NewObject(rootQuery)}

var ProductsSchema, err = graphql.NewSchema(schemaConfig)
