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

	// 2. Panggil Service untuk hitung rekomendasi (Multi-Location)
	recommendation, score := services.CalculateAHP(input.Locations, input.Intensity, input.Trigger)

	// 3. Simpan hasil ke database Supabase (Penting untuk data penelitian Skripsi)
	_, err := db.Exec(
		"INSERT INTO user_assessments (npm, locations, intensity, trigger_factor, recommendation, score) VALUES ($1, $2, $3, $4, $5, $6)",
		input.NPM, input.Locations, input.Intensity, input.Trigger, recommendation, score,
	)
	if err != nil {
		// Log error tapi tetap kirim response ke user
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
