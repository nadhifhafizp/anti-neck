package controllers

import (
	"anti-neck/internal/models"
	"anti-neck/internal/services"
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ProcessAHP(c *gin.Context, db *sql.DB) {
	var input models.AHPRequest

	// 1. Bind JSON input dari frontend
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Format data tidak valid"})
		return
	}

	// 2. Panggil Service untuk hitung rekomendasi (Sekarang hanya 1 lokasi dominan)
	recommendation, score := services.CalculateAHP(input.Location, input.Intensity, input.Activity)

	// 3. Simpan hasil ke database Supabase
	// Catatan: Jika query ini error di terminal, pastikan kolom di tabel Supabase kamu
	// juga bernama 'location' (tipe text) dan 'activity' (tipe text)
	_, err := db.Exec(
		"INSERT INTO user_assessments (npm, location, intensity, activity, recommendation, score) VALUES ($1, $2, $3, $4, $5, $6)",
		input.NPM, input.Location, input.Intensity, input.Activity, recommendation, score,
	)
	if err != nil {
		c.Error(err)
	}

	// 4. Kirim response balik ke frontend
	c.JSON(http.StatusOK, models.AHPResponse{
		NPM:            input.NPM,
		Recommendation: recommendation,
		Score:          score,
		Status:         "Success",
	})
}
