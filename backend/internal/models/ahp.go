package models

import "github.com/lib/pq"

type AHPRequest struct {
	NPM       string         `json:"npm" binding:"required"`
	Locations pq.StringArray `json:"locations" binding:"required"` // Gunakan pq.StringArray untuk Postgres
	Intensity int            `json:"intensity" binding:"required"`
	Trigger   string         `json:"trigger" binding:"required"`
}

type AHPResponse struct {
	NPM            string  `json:"npm"`
	Recommendation string  `json:"recommendation"`
	Score          float64 `json:"score"`
	Status         string  `json:"status"`
}
