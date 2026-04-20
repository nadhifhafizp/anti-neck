package controllers

import (
	"anti-neck/internal/models"
	"anti-neck/internal/services"
	"database/sql"
	"log"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func ProcessAHP(c *gin.Context, db *sql.DB) {
	var input models.AHPRequest

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Format data tidak valid"})
		return
	}

	// Proses AHP
	recommendation, score, _, topIntensity := services.CalculateAHP(input.Locations, input.Activity)

	// Gabungkan semua keluhan jadi teks (Misal: "Leher, Bahu")
	var allLocations []string
	for _, loc := range input.Locations {
		allLocations = append(allLocations, loc.Name)
	}
	joinedLocations := strings.Join(allLocations, ", ")

	// SIMPAN KE SUPABASE (Menggunakan nama kolom yang baru saja kita Reset)
	query := `INSERT INTO user_assessments (
		npm,               -- ganti jika namanya berbeda
		location,          -- ganti jika namanya berbeda (misal: lokasi)
		intensity,         -- ganti jika namanya berbeda
		trigger_factor,    -- ganti jika namanya berbeda (misal: activity)
		recommendation,    -- UBAH INI sesuai Supabase (misal: rekomendasi, recomendation)
		score              -- ganti jika namanya berbeda
	) VALUES ($1, $2, $3, $4, $5, $6)`

	// Eksekusi ke database
	_, err := db.Exec(query, input.NPM, joinedLocations, topIntensity, input.Activity, recommendation, score)

	if err != nil {
		log.Println("❌ GAGAL SIMPAN KE SUPABASE:", err)
	} else {
		log.Println("✅ DATA BERHASIL DISIMPAN!")
	}

	c.JSON(http.StatusOK, models.AHPResponse{
		NPM:            input.NPM,
		Recommendation: recommendation,
		Score:          score,
		Status:         "Success",
	})
}
