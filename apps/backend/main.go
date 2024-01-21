package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

type Article struct {
	ID      int    `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
	Author  string `json:"author"`
	// CreatedAt   time.Time `json:"created_at"`
	// UpdatedAt   time.Time `json:"updated_at"`
	// PublishedAt time.Time `json:"published_at"`
	// Tags        []string  `json:"tags"`
	// Status      string    `json:"status"`

}

func main() {

	app := fiber.New()

	articles := []Article{}

	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.SendString("all good")
	})

	app.Post("/api/articles", func(c *fiber.Ctx) error {
		article := new(Article)
		if err := c.BodyParser(article); err != nil {
			return c.Status(400).SendString(err.Error())
		}

		article.ID = len(articles) + 1
		articles = append(articles, *article)
		return c.JSON(articles)
	})

	log.Fatal(app.Listen(":4000"))

}
