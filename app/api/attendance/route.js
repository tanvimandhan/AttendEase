
// import { PrismaClient } from '@/lib/generated/prisma'
// const prisma = new PrismaClient()
import { prisma } from '@/lib/prisma'; 
import { NextResponse } from "next/server";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const grade = searchParams.get("grade");
  const date = searchParams.get("month");

  const students = await prisma.students.findMany({
    where: {
      ...(grade && grade !== "undefined" ? { grade } : {}), // ✅ only apply grade filter if valid
    },
    include: {
      attendance: true, // ✅ correct relation name as per your schema
    },
  });

  const result = students.map(student => ({
    ...student,
    attendance: student.attendance.filter(att =>
      att.date === date || !att.date
    ),
  }));

  return NextResponse.json(result);
}

export async function POST(req) {
    const data = await req.json();
    if (typeof data.day !== 'number') {
      data.day = Number(data.day);
  }
    const result = await prisma.attendance.create({
      data: {
        studentId: data.studentId,
        present: data.present, // corrected typo from `presnt` to `present`
        day: data.day,
        date: data.date,
      },
    });
  
    return NextResponse.json(result);
}

export async function DELETE(req) {
  const searchParams = req.nextUrl.searchParams;
  const studentId = searchParams.get("studentId");
  const date = searchParams.get("date");
  const day = searchParams.get("day");
  const studentIdNumber = parseInt(studentId);
  // Validate required parameters
  if (!studentId || !date || !day) {
    return NextResponse.json(
      { error: "Missing required parameters: studentId, date, or day" },
      { status: 400 }
    );
  }

  try {
    // Convert day to number since it's likely stored as Int in DB
    const dayNumber = parseInt(day);
    if (isNaN(dayNumber)) {
      return NextResponse.json(
        { error: "Day must be a number" },
        { status: 400 }
      );
    }

    const result = await prisma.attendance.deleteMany({
      where: {
        studentId: studentIdNumber,
        date: date,
        day: dayNumber, // Use the converted number
      },
    });

    // Check if any records were actually deleted
    if (result.count === 0) {
      return NextResponse.json(
        { error: "No matching attendance record found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error deleting attendance record:", error);
    return NextResponse.json(
      { error: "Failed to delete attendance record" },
      { status: 500 }
    );
  }
}

// .from(STUDENTS).LEFTJOIN(ATTENDANCE,and(eq(STUDENTS.id,ATTENDANCE.studentId),eq(ATTENDANCE.date,month)))
// .where(eq(STUDENTS.grade,grade))
// 
// )