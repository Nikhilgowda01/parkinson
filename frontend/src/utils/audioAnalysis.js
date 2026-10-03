/**
 * ParkinsonVoice Backend API Integration
 */

export async function extractAcousticFeatures(audioBlob) {
  try {
    const formData = new FormData()
    formData.append("file", audioBlob)

    const response = await fetch(
      "http://127.0.0.1:8000/predict",
      {
        method: "POST",
        body: formData
      }
    )

    if (!response.ok) {
      throw new Error("Prediction request failed")
    }

    const result = await response.json()

    return {
      prediction: result.prediction,
      healthyProbability: result.healthy_probability,
      parkinsonProbability: result.parkinson_probability
    }

  } catch (error) {
    console.error("Prediction Error:", error)

    return {
      prediction: "Error",
      healthyProbability: 0,
      parkinsonProbability: 0
    }
  }
}

export function getFallbackAnalysis() {
  return {
    prediction: "Unavailable",
    healthyProbability: 0,
    parkinsonProbability: 0
  }
}