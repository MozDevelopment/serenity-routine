import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Button } from "@/components/ui/button"
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
})

interface MonthlyReportProps {
  data: any[]
}

export function MonthlyReport({ data }: MonthlyReportProps) {
  const chartData = {
    labels: data.map((entry) => entry.date),
    datasets: [
      {
        label: "Mood",
        data: data.map((entry) => entry.moods[0].value),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Energy",
        data: data.map((entry) => entry.energies[0].value),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  }

  const PDFReport = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Monthly Report</Text>
          {data.map((entry, index) => (
            <Text key={index}>
              Date: {entry.date}, Mood: {entry.moods[0].value}, Energy: {entry.energies[0].value}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Report</CardTitle>
      </CardHeader>
      <CardContent>
        <Line data={chartData} />
        <PDFDownloadLink document={<PDFReport />} fileName="monthly_report.pdf">
          {({ blob, url, loading, error }) => (loading ? "Loading document..." : <Button>Download PDF</Button>)}
        </PDFDownloadLink>
      </CardContent>
    </Card>
  )
}

