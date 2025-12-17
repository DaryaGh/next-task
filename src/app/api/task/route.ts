import { NextRequest, NextResponse } from "next/server"
import {prisma} from "@/lib/prisma";


export async function GET() {
    try {
        const tasks = await prisma.task.findMany({
            orderBy: { createdAt: "desc" },
        })
        return NextResponse.json(tasks)
    } catch (error) {
        return NextResponse.json({ error: "Error" }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const task = await prisma.task.create({
            data: {
                title: body.title,
                description: body.description || null,
                status: body.status || "todo",
                priority: body.priority || "medium",
            },
        })
        return NextResponse.json(task, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "Error" }, { status: 500 })
    }
}
