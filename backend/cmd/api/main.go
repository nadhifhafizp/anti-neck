package main

import (
	"database/sql"
	"log"
	"os"

	"anti-neck/internal/controllers" // Pastikan path ini sesuai dengan modul di go.mod

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
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
	// 2. Koneksi Database
	connStr := os.Getenv("DB_URL")
	if connStr == "" {
		log.Fatal("DB_URL is not set in environment variables")
	}

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Cek koneksi
	if err := db.Ping(); err != nil {
		log.Fatal("Database unreachable:", err)
	}

	r := gin.Default()

	// 3. Middleware CORS
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

	// 4. Perutean (Routing)
	// Kita membungkus handler agar bisa menerima instance 'db'
	r.POST("/api/recomend", func(c *gin.Context) {
		controllers.ProcessAHP(c, db)
	})

	// 5. Menjalankan Server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server running on port %s", port)
	r.Run(":" + port)
}
