package services

import (
	"anti-neck/internal/models"
	"sort"
)

type AreaScore struct {
	Name      string
	Location  string
	Intensity int
	Score     float64
}

// Menerima array lokasi, dan mengembalikan 4 nilai (untuk disimpan ke DB nantinya)
func CalculateAHP(locations []models.LocationInput, activity string) (string, float64, string, int) {
	const (
		W_Location  = 0.634
		W_Intensity = 0.106
		W_Trigger   = 0.260
	)

	// Inisialisasi 3 alternatif otot
	areas := []AreaScore{
		{Name: "Levator Scapulae", Location: "Leher", Score: 0},
		{Name: "Upper Trapezius", Location: "Bahu", Score: 0},
		{Name: "Quadratus Lumborum", Location: "Punggung", Score: 0},
	}

	// PROSES AHP: Hitung skor untuk SETIAP area
	for i := range areas {
		var rK1 float64 = 0.0 // Rating Kriteria 1 (Lokasi)
		var rK2 float64 = 0.0 // Rating Kriteria 2 (Intensitas)

		// Cek apakah area ini termasuk yang dipilih oleh user
		for _, loc := range locations {
			if loc.Name == areas[i].Location {
				rK1 = 10.0               // Lokasi valid/terpilih
				rK2 = float64(loc.Value) // Mengambil nilai intensitas spesifiknya (1-10)
				areas[i].Intensity = loc.Value
				break
			}
		}

		// Jika tidak dipilih user, lewati, biarkan skornya 0
		if rK1 == 0 {
			continue
		}

		rK3 := 5.0
		if activity != "" {
			rK3 = 10.0
		}

		// PERHITUNGAN GLOBAL AHP
		areas[i].Score = (rK1 * W_Location) + (rK2 * W_Intensity) + (rK3 * W_Trigger)
	}

	// PERANKINGAN AHP (Overpower-nya di sini, mencari pemenang otomatis)
	sort.Slice(areas, func(i, j int) bool {
		return areas[i].Score > areas[j].Score
	})

	// Kembalikan nama otot, skor akhir, nama keluhan pemenang, dan intensitas pemenang
	return areas[0].Name, areas[0].Score, areas[0].Location, areas[0].Intensity
}
