package models

import "time"

type LocationInput struct {
	Name  string `json:"name"`
	Value int    `json:"value"`
}

type AHPRequest struct {
	Nama      string          `json:"nama" binding:"required"` // Tambahkan ini
	NPM       string          `json:"npm" binding:"required"`
	Locations []LocationInput `json:"locations" binding:"required"`
	Activity  string          `json:"activity" binding:"required"`
}

type AHPResponse struct {
	NPM            string  `json:"npm"`
	Recommendation string  `json:"recommendation"`
	Score          float64 `json:"score"`
	Status         string  `json:"status"`
}

type AHPResult struct {
	ID                 uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Nama               string    `gorm:"type:varchar(100);not null" json:"nama"` // Tambahkan ini
	NPM                string    `gorm:"type:varchar(20);not null" json:"npm"`
	AktivitasPemicu    string    `gorm:"type:varchar(100);not null" json:"aktivitas_pemicu"`
	LokasiDominan      string    `gorm:"type:varchar(50);not null" json:"lokasi_dominan"`
	IntensitasMaksimal int       `gorm:"not null" json:"intensitas_maksimal"`
	RekomendasiOtot    string    `gorm:"type:varchar(100);not null" json:"rekomendasi_otot"`
	SkorAHP            float64   `gorm:"not null" json:"skor_ahp"`
	CreatedAt          time.Time `gorm:"autoCreateTime" json:"created_at"`
}
