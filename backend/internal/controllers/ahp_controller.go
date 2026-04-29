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

	// 1. Bind JSON Input dari Frontend
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Format input tidak sesuai: " + err.Error()})
		return
	}

	// 2. Hitung menggunakan algoritma AHP di Services
	// Pastikan return value dari services.CalculateAHP ada 4: nama otot, skor, lokasi dominan, dan intensitas.
	bestOtot, maxScore, dominantLoc, maxIntensity := services.CalculateAHP(req.Locations, req.Activity)

	// 3. Siapkan objek data untuk disimpan ke Database
	dbRecord := models.AHPResult{
		NPM:                req.NPM,
		AktivitasPemicu:    req.Activity,
		LokasiDominan:      dominantLoc,
		IntensitasMaksimal: maxIntensity,
		RekomendasiOtot:    bestOtot,
		SkorAHP:            maxScore,
	}

	// 4. Simpan ke Database PostgreSQL menggunakan GORM
	if ctrl.DB != nil {
		if err := ctrl.DB.Create(&dbRecord).Error; err != nil {
			// Jika gagal simpan ke DB, log error di terminal, tapi tetap lanjutkan proses agar user tidak error
			log.Printf("Gagal menyimpan riwayat AHP ke database untuk NPM %s: %v\n", req.NPM, err)
		} else {
			log.Printf("Berhasil menyimpan data AHP untuk NPM %s ke database.\n", req.NPM)
		}
	} else {
		log.Println("Peringatan: Koneksi database tidak ditemukan, data tidak disimpan.")
	}

	// 5. Kembalikan Response ke Frontend
	c.JSON(http.StatusOK, models.AHPResponse{
		NPM:            req.NPM,
		Recommendation: bestOtot,
		Score:          maxScore,
		Status:         "success",
	})
}
