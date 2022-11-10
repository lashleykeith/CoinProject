package graph

import (
	"log"
	"net/http"

	"github.com/graphql-go/handler"
)

func SetupGraphQlServer() {

	// create a graphl-go HTTP handler with our previously defined schema
	// and we also set it to return pretty JSON output
	h := handler.New(&handler.Config{
		Schema: &ProductsSchema,
		Pretty: true,
	})

	// serve a GraphQL endpoint at `/graphql`
	http.Handle("/graphql", h)

	err := http.ListenAndServe(":5000", nil)
	if err != nil {
		log.Fatal(err)
		return
	}
}
