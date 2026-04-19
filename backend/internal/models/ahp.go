package models

// Hapus import "github.com/lib/pq" karena kita tidak pakai array database lagi di struct ini

type AHPRequest struct {
	NPM       string `json:"npm" binding:"required"`
	Location  string `json:"location" binding:"required"` // Diubah menjadi String tunggal
	Intensity int    `json:"intensity" binding:"required"`
	Activity  string `json:"activity" binding:"required"` // Diubah dari "trigger" menjadi "activity"
}

type AHPResponse struct {
	NPM            string  `json:"npm"`
	Recommendation string  `json:"recommendation"`
	Score          float64 `json:"score"`
	Status         string  `json:"status"`
}
