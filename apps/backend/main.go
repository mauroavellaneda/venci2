package main

import (
	"log"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type Article struct {
	ID      int    `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
	Author  string `json:"author"`
	Done    bool   `json:"done"`
	// CreatedAt   time.Time `json:"created_at"`
	// UpdatedAt   time.Time `json:"updated_at"`
	// PublishedAt time.Time `json:"published_at"`
	// Tags        []string  `json:"tags"`
	// Status      string    `json:"status"`

}

func main() {

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

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

	app.Patch("/api/articles/:id/done", func(c *fiber.Ctx) error {
		id, error := c.ParamsInt("id")

		if error != nil {
			return c.Status(401).SendString("invalid id")
		}

		for i, article := range articles {
			if article.ID == id {
				articles[i].Done = true
				break
			}
		}

		return c.JSON(articles)
	})

	app.Get("/api/articles", func(c *fiber.Ctx) error {
		return c.JSON(articles)
	})

	app.Delete("/api/articles/:id", func(c *fiber.Ctx) error {
		id, error := c.ParamsInt("id")

		if error != nil {
			return c.Status(401).SendString("invalid id")
		}

		for i, article := range articles {
			if article.ID == id {
				articles = append(articles[:i], articles[i+1:]...)
				break
			}
		}

		return c.JSON(articles)
	})

	app.Put("/api/articles/:id", func(c *fiber.Ctx) error {
		idParam := c.Params("id")
		id, err := strconv.Atoi(idParam)
		if err != nil {
			return c.Status(400).SendString(err.Error())
		}

		var articleIndex int
		found := false
		for i, article := range articles {
			if article.ID == id {
				articleIndex = i
				found = true
				break
			}
		}

		if !found {
			return c.Status(404).SendString("article not found")
		}

		updatedArticle := new(Article)
		if err := c.BodyParser(updatedArticle); err != nil {
			return c.Status(400).SendString(err.Error())
		}

		updatedArticle.ID = id

		articles[articleIndex] = *updatedArticle

		return c.JSON(articles)
	})

	log.Fatal(app.Listen(":4000"))

}
