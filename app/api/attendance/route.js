import { PrismaClient } from '@/lib/generated/prisma'
const prisma = new PrismaClient()
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

  const result = await prisma.attendance.deleteMany({
    where: {
      studentId: studentId ?? undefined,
      date: date ?? undefined,
      day: day ?? undefined,
    },
  });

  return NextResponse.json(result);
}

// .from(STUDENTS).LEFTJOIN(ATTENDANCE,and(eq(STUDENTS.id,ATTENDANCE.studentId),eq(ATTENDANCE.date,month)))
// .where(eq(STUDENTS.grade,grade))
// 
// )