export function getTemperatureColor(temperature: number): string {
  // Assuming temperature is in Celsius
  if (temperature < 0) return "from-blue-500 to-blue-700"
  if (temperature < 10) return "from-cyan-500 to-cyan-700"
  if (temperature < 20) return "from-green-500 to-green-700"
  if (temperature < 30) return "from-yellow-500 to-yellow-700"
  return "from-red-500 to-red-700"
}

