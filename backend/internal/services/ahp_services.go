package services

import "sort"

type AreaScore struct {
	Name  string
	Score float64
}

// Pastikan baris ini mengembalikan (string, float64)
func CalculateAHP(locations []string, intensity int, trigger string) (string, float64) {
	const (
		W_Location  = 0.634
		W_Intensity = 0.106
		W_Trigger   = 0.260
	)

	areas := []AreaScore{
		{Name: "Levator Scapulae", Score: 0},
		{Name: "Upper Trapezius", Score: 0},
		{Name: "Quadratus Lumborum", Score: 0},
	}

	for i := range areas {
		var rK1 float64 = 1.0
		for _, loc := range locations {
			if (loc == "Leher" && areas[i].Name == "Levator Scapulae") ||
				(loc == "Bahu" && areas[i].Name == "Upper Trapezius") ||
				(loc == "Punggung" && areas[i].Name == "Quadratus Lumborum") {
				rK1 = 10.0
			}
		}
		rK2 := float64(intensity)
		rK3 := 5.0
		if trigger != "" {
			rK3 = 10.0
		}

		areas[i].Score = (rK1 * W_Location) + (rK2 * W_Intensity) + (rK3 * W_Trigger)
	}

	sort.Slice(areas, func(i, j int) bool {
		return areas[i].Score > areas[j].Score
	})

	// Mengembalikan nama area DAN skornya
	return areas[0].Name, areas[0].Score
}
