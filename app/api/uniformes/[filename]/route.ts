import { NextRequest } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ filename: string }> },
) {
  const { filename } = await params

  try {
    const decoded = decodeURIComponent(filename)

    // Only allow .jpg files from the uniformes directory
    if (!decoded.toLowerCase().endsWith(".jpg")) {
      return new Response("Unsupported file type", { status: 400 })
    }

    const filePath = path.join(process.cwd(), "images", "uniformes", decoded)
    const data = await fs.readFile(filePath)

    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    return new Response("Not found", { status: 404 })
  }
}


