// backend/cmd/api/main.go
package main

import (
	"log"
	"os"

	"anti-neck/internal/controllers"
	"anti-neck/internal/models"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	// Load .env hanya di local development
	// Di production (Render), env vars sudah di-set via dashboard
	if os.Getenv("ENVIRONMENT") != "production" {
		err := godotenv.Load()
		if err != nil {
			err = godotenv.Load("../../.env")
			if err != nil {
				log.Println("Note: .env file not found, using system environment variables")
			}
		}
	}

	// Set Gin mode berdasarkan environment
	if os.Getenv("ENVIRONMENT") == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Koneksi Database
	connStr := os.Getenv("DB_URL")
	if connStr == "" {
		log.Fatal("DB_URL is not set in environment variables")
	}

	db, err := gorm.Open(postgres.New(postgres.Config{
		DSN:                  connStr,
		PreferSimpleProtocol: true,
	}), &gorm.Config{
		PrepareStmt: false,
	})
	if err != nil {
		log.Fatal("Gagal koneksi ke database:", err)
	}

	// AutoMigrate
	err = db.AutoMigrate(&models.AHPResult{})
	if err != nil {
		log.Fatal("Gagal melakukan migrasi database:", err)
	}

	r := gin.Default()

	// CORS - Update untuk production
	allowedOrigins := os.Getenv("ALLOWED_ORIGINS")
	if allowedOrigins == "" {
		allowedOrigins = "*" // Default untuk development
	}

	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", allowedOrigins)
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// Health check endpoint - PENTING untuk Render!
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"service": "anti-neck-api",
		})
	})

	// Routes
	ahpController := controllers.NewAHPController(db)
	r.POST("/api/recommend", ahpController.Recommend)

	// Port dari environment variable
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server running on port %s", port)
	r.Run(":" + port)
}
