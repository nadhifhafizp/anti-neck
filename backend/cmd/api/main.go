package main

import (
	"log"
	"os"

	"anti-neck/internal/controllers"
	"anti-neck/internal/models" // Wajib di-import untuk membaca struct AHPResult saat AutoMigrate

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	// 1. Load file .env
	err := godotenv.Load()
	if err != nil {
		// Jika gagal, coba load manual dari root (jika main.go ada di subfolder)
		err = godotenv.Load("../../.env")
		if err != nil {
			log.Println("Note: .env file not found, using system environment variables")
		}
	}

	// 2. Koneksi Database menggunakan GORM untuk PostgreSQL
	connStr := os.Getenv("DB_URL")
	if connStr == "" {
		log.Fatal("DB_URL is not set in environment variables")
	}

	db, err := gorm.Open(postgres.Open(connStr), &gorm.Config{})
	if err != nil {
		log.Fatal("Gagal koneksi ke database:", err)
	}

	// 3. AutoMigrate: GORM akan otomatis membuatkan tabel ahp_results di PostgreSQL Anda
	err = db.AutoMigrate(&models.AHPResult{})
	if err != nil {
		log.Fatal("Gagal melakukan migrasi database:", err)
	}

	r := gin.Default()

	// 4. Middleware CORS
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// 5. Perutean (Routing) dengan Controller Baru
	ahpController := controllers.NewAHPController(db)
	r.POST("/api/recommend", ahpController.Recommend)

	// 6. Menjalankan Server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server running on port %s", port)
	r.Run(":" + port)
}
