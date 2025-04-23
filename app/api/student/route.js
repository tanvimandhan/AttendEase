import { PrismaClient } from '@/lib/generated/prisma'
const prisma = new PrismaClient()
import { NextResponse } from 'next/server';

export async function POST(req){
    const datai=await req.json();
    
    const newUser = await prisma.students.create({
        data: {
          name: datai?.name,
          grade:datai?.grade,
          address:datai?.address,
          contact:datai?.contact
        }
    });
    return NextResponse.json(newUser);
}

export async function GET(req){
    const result= await prisma.students.findMany()
    return NextResponse.json(result);
}
// export async function DELETE(req){
//     const searchParams=req.nextURL.searchParams;
//     const id=searchParams.get('id')
//     const result=await db.delete(STUDENTS).where(eq(STUDETS.id,id));

//     return NextResponse.json(result);
// }
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: 'Valid ID is required' }, { status: 400 });
  }

  try {
    const result = await prisma.students.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Student not found or delete failed' }, { status: 500 });
  }
}
