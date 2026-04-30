package controllers

import (
	"anti-neck/internal/models"
	"anti-neck/internal/services"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type AHPController struct {
	DB *gorm.DB
}

// Konstruktor untuk menyuntikkan koneksi database ke dalam Controller
func NewAHPController(db *gorm.DB) *AHPController {
	return &AHPController{DB: db}
}

func (ctrl *AHPController) Recommend(c *gin.Context) {
	var req models.AHPRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Format input tidak sesuai: " + err.Error()})
		return
	}

	bestOtot, maxScore, dominantLoc, maxIntensity := services.CalculateAHP(req.Locations, req.Activity)

	// Masukkan req.Nama ke field Nama di database
	dbRecord := models.AHPResult{
		Nama:               req.Nama, // Tambahkan ini
		NPM:                req.NPM,
		AktivitasPemicu:    req.Activity,
		LokasiDominan:      dominantLoc,
		IntensitasMaksimal: maxIntensity,
		RekomendasiOtot:    bestOtot,
		SkorAHP:            maxScore,
	}

	if ctrl.DB != nil {
		if err := ctrl.DB.Create(&dbRecord).Error; err != nil {
			log.Printf("Gagal menyimpan ke database: %v\n", err)
		}
	}

	c.JSON(http.StatusOK, models.AHPResponse{
		NPM:            req.NPM,
		Recommendation: bestOtot,
		Score:          maxScore,
		Status:         "success",
	})
}
