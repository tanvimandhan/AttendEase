import { NextResponse } from "next/server";
import { PrismaClient } from '@/lib/generated/prisma'
const prisma = new PrismaClient()

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
    const date = searchParams.get('date');
    const grade = searchParams.get('grade');
  
    const result = await prisma.attendance.groupBy({
      by: ['day'],
      where: {
        date: date,
        student: {
          grade: grade
        }
      },
      _count: {
        day: true
      },
      orderBy: {
        day: 'desc'
      },
      take: 7
    });
  
    const formattedResult = result.map(item => ({
      day: item.day,
      presentCount: item._count.day
    }));
  
    return NextResponse.json(formattedResult);
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