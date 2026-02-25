import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.log("[v0] Supabase GET error:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  const { data, error } = await supabase
    .from("tasks")
    .insert({ title: body.title, status: "pending", category: body.category || "default" })
    .select()
    .single()

  if (error) {
    console.log("[v0] Supabase POST error:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function PATCH(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  const { data, error } = await supabase
    .from("tasks")
    .update({ status: body.status })
    .eq("id", body.id)
    .select()
    .single()

  if (error) {
    console.log("[v0] Supabase PATCH error:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function DELETE(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Missing task id" }, { status: 400 })
  }

  const { error } = await supabase.from("tasks").delete().eq("id", id)

  if (error) {
    console.log("[v0] Supabase DELETE error:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
