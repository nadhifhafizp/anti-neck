package models

// Struct bantuan untuk membaca isi array dari frontend
type LocationInput struct {
	Name  string `json:"name"`
	Value int    `json:"value"`
}

type AHPRequest struct {
	NPM       string          `json:"npm" binding:"required"`
	Locations []LocationInput `json:"locations" binding:"required"` // Diubah kembali jadi Array
	Activity  string          `json:"activity" binding:"required"`
}

type AHPResponse struct {
	NPM            string  `json:"npm"`
	Recommendation string  `json:"recommendation"`
	Score          float64 `json:"score"`
	Status         string  `json:"status"`
}
