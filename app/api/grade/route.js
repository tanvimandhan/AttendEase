import { NextResponse } from 'next/server'
// import { PrismaClient } from '@/lib/generated/prisma'
// const prisma = new PrismaClient()
import { prisma } from '@/lib/prisma'; 

// GET all students
export async function GET() {
  try {
    const grades = await prisma.grades.findMany()
   // console.log(grades)
     // Make sure 'student' matches your model name
   // console.log(3);
    return NextResponse.json(grades)
  } catch (error) {
    console.log("Err in grade api:\n\n", error)
    return NextResponse.json(
      { error: "Failed to fetch students", details: error.message },
      { status: 500 }
    )
  } finally {
    // await prisma.$disconnect()
  }
}