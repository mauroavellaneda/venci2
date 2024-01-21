package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

type Article struct {
    ID          int       `json:"id"`
    Title       string    `json:"title"`
    Content     string    `json:"content"`
    Author      string    `json:"author"`
    // CreatedAt   time.Time `json:"created_at"`
    // UpdatedAt   time.Time `json:"updated_at"`
    // PublishedAt time.Time `json:"published_at"`
    // Tags        []string  `json:"tags"`
    // Status      string    `json:"status"` 
    
}


func main() {

	app := fiber.New()

	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.SendString("all good")
	})

	log.Fatal(app.Listen(":4000"))

}
