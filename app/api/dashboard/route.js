import { NextResponse } from "next/server";
// import { PrismaClient } from '@/lib/generated/prisma'
// const prisma = new PrismaClient()
import { prisma } from '@/lib/prisma'; 

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const date = searchParams.get('date');
  const grade = searchParams.get('grade') || "5";

  const records = await prisma.attendance.findMany({
    where: {
      date,
      student: {
        grade
      }
    },
    include: {
      student: true
    }
  });

  // Group by day and count present
  const grouped = {};
  records.forEach(record => {
    if (!grouped[record.day]) {
      grouped[record.day] = { present: 0, total: 0 };
    }
    grouped[record.day].total++;
    if (record.present) grouped[record.day].present++;
  });

  const result = Object.entries(grouped)
    .map(([day, counts]) => ({
      day: parseInt(day),
      presentCount: counts.present,
      absentCount: counts.total - counts.present
    }))
    .sort((a, b) => a.day - b.day); // Sort ascending for chronological order

  return NextResponse.json(result);
}



  //convert it according to prisma schema:export async function GET(req){
//     const searchParams=req.nextUrl.searchParams;
//     const date=searchParams.get('date');
//     const grade=searchParams.get('grade')

//     const result=await db.select({
//         day:Attendance.day,
//         presentCount:sql`count(${ATTENDNACE.day})`
//     }).from(ATTENDANCE)
//     .leftJoin(Students,and(eq(ATTENDANCE.studentId,STUDENTS.id),eq(ATTENDANCE.date,date)))
//     .groupBy(ATTENDNACE.day)
//     .where(eq(STUDENTS.grade,grade))
//     .orderBy(desc(ATTENDANCE.day))
//     .limit(7)

//     return NextResponse.json(result)
// }