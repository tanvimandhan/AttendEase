import { NextResponse } from 'next/server'
//  import { PrismaClient } from "../lib/generated/prisma"
//import {prisma} from "@lib/prism"
import { PrismaClient } from '@/lib/generated/prisma'
const prisma = new PrismaClient()

// GET all students
export async function GET() {
  try {
    const students = await prisma.grades.findMany() // Make sure 'student' matches your model name
    
    return NextResponse.json(students)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch students", details: error.message },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}