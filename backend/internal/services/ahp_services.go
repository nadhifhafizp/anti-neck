package services

import (
	"anti-neck/internal/models" // Sesuaikan dengan struktur folder Anda
	"fmt"
	"sort"
)

type AreaScore struct {
	Name      string
	Location  string
	Intensity int
	Score     float64
}

// 1. Fungsi Menghitung Bobot Prioritas (Eigenvector) dari Matriks
func CalculateAHPWeights(matrix [][]float64) []float64 {
	n := len(matrix)
	colSums := make([]float64, n)

	// Hitung jumlah setiap kolom
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			colSums[i] += matrix[j][i]
		}
	}

	// Normalisasi dan hitung rata-rata baris (Bobot Prioritas)
	weights := make([]float64, n)
	for i := 0; i < n; i++ {
		sumRow := 0.0
		for j := 0; j < n; j++ {
			if colSums[j] > 0 {
				sumRow += matrix[i][j] / colSums[j]
			}
		}
		weights[i] = sumRow / float64(n)
	}

	return weights
}

// 2. Fungsi Menghitung Consistency Ratio (CR) - Untuk logging saat sidang
func CalculateCR(matrix [][]float64, weights []float64) float64 {
	n := len(matrix)
	lambdaMax := 0.0

	for i := 0; i < n; i++ {
		rowSum := 0.0
		for j := 0; j < n; j++ {
			rowSum += matrix[i][j] * weights[j]
		}
		if weights[i] > 0 {
			lambdaMax += rowSum / weights[i]
		}
	}
	lambdaMax = lambdaMax / float64(n)
	ci := (lambdaMax - float64(n)) / (float64(n) - 1)

	// RI berdasarkan Thomas L. Saaty (Ordo 6 = 1.24)
	riValues := map[int]float64{1: 0.0, 2: 0.0, 3: 0.58, 4: 0.90, 5: 1.12, 6: 1.24}
	ri := riValues[n]

	if ri == 0 {
		return 0
	}
	return ci / ri
}

// 3. Fungsi Utama Controller AHP
func CalculateAHP(locations []models.LocationInput, activity string) (string, float64, string, int) {
	// Bobot Kriteria Utama AHP (Berdasarkan Tabel Normalisasi Matriks Bab 4)
	const (
		W_Location  = 0.648
		W_Intensity = 0.230
		W_Trigger   = 0.122
	)

	// 6 Alternatif Titik Terapi
	areas := []AreaScore{
		{Name: "Levator Scapulae", Location: "Leher", Score: 0},
		{Name: "Splenius Capitis", Location: "Leher", Score: 0},
		{Name: "Upper Trapezius", Location: "Bahu", Score: 0},
		{Name: "Rhomboid Major", Location: "Bahu", Score: 0},
		{Name: "Quadratus Lumborum", Location: "Punggung", Score: 0},
		{Name: "Erector Spinae", Location: "Punggung", Score: 0},
	}

	// 1. Proses Input Form User
	dominantLoc := ""
	maxIntensity := 0
	for _, loc := range locations {
		// Pasangkan nilai intensitas (1-10) ke alternatif yang sesuai lokasinya
		for i := range areas {
			if areas[i].Location == loc.Name {
				areas[i].Intensity = loc.Value
			}
		}
		// Cari lokasi paling sakit untuk memicu matriks K1
		if loc.Value > maxIntensity {
			maxIntensity = loc.Value
			dominantLoc = loc.Name
		}
	}

	// 2. MATRIKS K1: LOKASI (Ordo 6x6)
	var matrixLocation [][]float64
	switch dominantLoc {
	case "Leher":
		matrixLocation = [][]float64{
			{1.0, 1.0, 3.0, 3.0, 5.0, 5.0},                 // Levator
			{1.0, 1.0, 3.0, 3.0, 5.0, 5.0},                 // Splenius
			{1 / 3.0, 1 / 3.0, 1.0, 1.0, 3.0, 3.0},         // Trapezius
			{1 / 3.0, 1 / 3.0, 1.0, 1.0, 3.0, 3.0},         // Rhomboid
			{1 / 5.0, 1 / 5.0, 1 / 3.0, 1 / 3.0, 1.0, 1.0}, // QL
			{1 / 5.0, 1 / 5.0, 1 / 3.0, 1 / 3.0, 1.0, 1.0}, // Erector
		}
	case "Bahu":
		matrixLocation = [][]float64{
			{1.0, 1.0, 1 / 3.0, 1 / 3.0, 2.0, 2.0},
			{1.0, 1.0, 1 / 3.0, 1 / 3.0, 2.0, 2.0},
			{3.0, 3.0, 1.0, 1.0, 4.0, 4.0},
			{3.0, 3.0, 1.0, 1.0, 4.0, 4.0},
			{1 / 2.0, 1 / 2.0, 1 / 4.0, 1 / 4.0, 1.0, 1.0},
			{1 / 2.0, 1 / 2.0, 1 / 4.0, 1 / 4.0, 1.0, 1.0},
		}
	case "Punggung":
		matrixLocation = [][]float64{
			{1.0, 1.0, 1 / 3.0, 1 / 3.0, 1 / 5.0, 1 / 5.0},
			{1.0, 1.0, 1 / 3.0, 1 / 3.0, 1 / 5.0, 1 / 5.0},
			{3.0, 3.0, 1.0, 1.0, 1 / 3.0, 1 / 3.0},
			{3.0, 3.0, 1.0, 1.0, 1 / 3.0, 1 / 3.0},
			{5.0, 5.0, 3.0, 3.0, 1.0, 1.0},
			{5.0, 5.0, 3.0, 3.0, 1.0, 1.0},
		}
	default: // Fallback Netral
		matrixLocation = [][]float64{{1, 1, 1, 1, 1, 1}, {1, 1, 1, 1, 1, 1}, {1, 1, 1, 1, 1, 1}, {1, 1, 1, 1, 1, 1}, {1, 1, 1, 1, 1, 1}, {1, 1, 1, 1, 1, 1}}
	}
	weightsLocation := CalculateAHPWeights(matrixLocation)
	crLocation := CalculateCR(matrixLocation, weightsLocation)
	fmt.Printf("[AHP Log] CR Matriks Lokasi: %.4f\n", crLocation)

	// 3. MATRIKS K2: INTENSITAS NYERI (Dinamis dari input form rasio 1-10)
	nAlt := len(areas)
	matrixIntensity := make([][]float64, nAlt)
	for i := 0; i < nAlt; i++ {
		matrixIntensity[i] = make([]float64, nAlt)
		for j := 0; j < nAlt; j++ {
			valI := float64(areas[i].Intensity)
			valJ := float64(areas[j].Intensity)

			if valI == 0 && valJ == 0 {
				matrixIntensity[i][j] = 1.0
			} else if valJ == 0 {
				matrixIntensity[i][j] = 9.0
			} else if valI == 0 {
				matrixIntensity[i][j] = 1.0 / 9.0
			} else {
				ratio := valI / valJ
				if ratio > 9 {
					ratio = 9.0
				}
				if ratio < 1.0/9.0 {
					ratio = 1.0 / 9.0
				}
				matrixIntensity[i][j] = ratio
			}
		}
	}
	weightsIntensity := CalculateAHPWeights(matrixIntensity)
	crIntensity := CalculateCR(matrixIntensity, weightsIntensity)
	fmt.Printf("[AHP Log] CR Matriks Intensitas: %.4f\n", crIntensity)

	// 4. MATRIKS K3: AKTIVITAS PEMICU (Pemecah kondisi seri antar otot)
	var matrixTrigger [][]float64
	switch activity {
	case "Menunduk": // Menatap HP/Laptop Terlalu Lama (Fokus ke Splenius & Trapezius)
		matrixTrigger = [][]float64{
			{1.0, 1 / 3.0, 1 / 2.0, 3.0, 5.0, 5.0},         // Levator
			{3.0, 1.0, 2.0, 5.0, 7.0, 7.0},                 // Splenius (Tertarik maksimal saat menunduk)
			{2.0, 1 / 2.0, 1.0, 3.0, 5.0, 5.0},             // Trapezius
			{1 / 3.0, 1 / 5.0, 1 / 3.0, 1.0, 3.0, 3.0},     // Rhomboid
			{1 / 5.0, 1 / 7.0, 1 / 5.0, 1 / 3.0, 1.0, 1.0}, // QL
			{1 / 5.0, 1 / 7.0, 1 / 5.0, 1 / 3.0, 1.0, 1.0}, // Erector
		}
	case "Lainnya": // Posisi Tidur Salah (Tortikolis, fokus ke Levator)
		matrixTrigger = [][]float64{
			{1.0, 3.0, 5.0, 5.0, 7.0, 7.0},                 // Levator (Pemicu utama salah bantal)
			{1 / 3.0, 1.0, 3.0, 3.0, 5.0, 5.0},             // Splenius
			{1 / 5.0, 1 / 3.0, 1.0, 1.0, 3.0, 3.0},         // Trapezius
			{1 / 5.0, 1 / 3.0, 1.0, 1.0, 3.0, 3.0},         // Rhomboid
			{1 / 7.0, 1 / 5.0, 1 / 3.0, 1 / 3.0, 1.0, 1.0}, // QL
			{1 / 7.0, 1 / 5.0, 1 / 3.0, 1 / 3.0, 1.0, 1.0}, // Erector
		}
	case "Aktivitas Berat": // Membawa Tas Punggung (Fokus ke Rhomboid)
		matrixTrigger = [][]float64{
			{1.0, 1.0, 1 / 3.0, 1 / 5.0, 3.0, 3.0},         // Levator
			{1.0, 1.0, 1 / 3.0, 1 / 5.0, 3.0, 3.0},         // Splenius
			{3.0, 3.0, 1.0, 1 / 2.0, 5.0, 5.0},             // Trapezius
			{5.0, 5.0, 2.0, 1.0, 7.0, 7.0},                 // Rhomboid (Penyangga beban tali tas)
			{1 / 3.0, 1 / 3.0, 1 / 5.0, 1 / 7.0, 1.0, 1.0}, // QL
			{1 / 3.0, 1 / 3.0, 1 / 5.0, 1 / 7.0, 1.0, 1.0}, // Erector
		}
	case "Duduk Belajar": // Duduk Tanpa Sandaran (Fokus ke Erector Spinae & QL)
		matrixTrigger = [][]float64{
			{1.0, 1.0, 1 / 3.0, 1 / 3.0, 1 / 5.0, 1 / 7.0}, // Levator
			{1.0, 1.0, 1 / 3.0, 1 / 3.0, 1 / 5.0, 1 / 7.0}, // Splenius
			{3.0, 3.0, 1.0, 1.0, 1 / 3.0, 1 / 5.0},         // Trapezius
			{3.0, 3.0, 1.0, 1.0, 1 / 3.0, 1 / 5.0},         // Rhomboid
			{5.0, 5.0, 3.0, 3.0, 1.0, 1 / 2.0},             // QL
			{7.0, 7.0, 5.0, 5.0, 2.0, 1.0},                 // Erector (Penopang utama tulang belakang saat duduk)
		}
	default: // Fallback Netral
		matrixTrigger = [][]float64{{1, 1, 1, 1, 1, 1}, {1, 1, 1, 1, 1, 1}, {1, 1, 1, 1, 1, 1}, {1, 1, 1, 1, 1, 1}, {1, 1, 1, 1, 1, 1}, {1, 1, 1, 1, 1, 1}}
	}
	weightsTrigger := CalculateAHPWeights(matrixTrigger)
	crTrigger := CalculateCR(matrixTrigger, weightsTrigger)
	fmt.Printf("[AHP Log] CR Matriks Pemicu: %.4f\n", crTrigger)

	// 5. PERHITUNGAN GLOBAL SKOR AHP
	for i := 0; i < nAlt; i++ {
		areas[i].Score = (weightsLocation[i] * W_Location) +
			(weightsIntensity[i] * W_Intensity) +
			(weightsTrigger[i] * W_Trigger)
	}

	// 6. PERANKINGAN AHP (Sortir Descending)
	sort.SliceStable(areas, func(i, j int) bool {
		// Tie-Breaker terakhir: Jika skor AHP masih sama persis, titik dengan intensitas tertinggi menang
		if areas[i].Score == areas[j].Score {
			return areas[i].Intensity > areas[j].Intensity
		}
		return areas[i].Score > areas[j].Score
	})

	// Log hasil rekomendasi tertinggi untuk sidang
	fmt.Printf("[AHP Log] Rekomendasi Teratas: %s (Skor Global: %.4f)\n", areas[0].Name, areas[0].Score)

	// Pemenang didapatkan di Index 0
	return areas[0].Name, areas[0].Score, areas[0].Location, areas[0].Intensity
}
