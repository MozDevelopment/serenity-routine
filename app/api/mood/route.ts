import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const dataFilePath = path.join(process.cwd(), "data", "mood-data.json")

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const startDate = searchParams.get("startDate")
  const endDate = searchParams.get("endDate")

  const data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"))
  const user = data.users.find((u: any) => u.id === userId)

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  let filteredEntries = user.entries
  if (startDate && endDate) {
    filteredEntries = user.entries.filter((entry: any) => {
      return entry.date >= startDate && entry.date <= endDate
    })
  }

  return NextResponse.json({ entries: filteredEntries })
}

export async function POST(request: Request) {
  const { userId, entry } = await request.json()

  const data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"))
  const userIndex = data.users.findIndex((u: any) => u.id === userId)

  if (userIndex === -1) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  data.users[userIndex].entries.push(entry)
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))

  return NextResponse.json({ message: "Entry saved successfully" })
}

