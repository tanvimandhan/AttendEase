"use client"
import React, { useEffect, useState } from 'react'
import AddnewStudent from './_components/AddnewStudent'
import GlobalApi from '@/app/_services/GlobalApi'
import StudentListTable from './_components/StudentListTable';

function Student() {

  const [studentList,setStudentList]=useState([]);

  useEffect(()=>{
    GetAllStudents()
  },[])
  const GetAllStudents=()=>{
    GlobalApi.GetAllStudents().then(resp=>{
      setStudentList(resp.data);
    })
  }
  return (
    <div className='p-7'>
        <h2 className='font-bold text-2xl flex justify-between items-center'>Students
            <AddnewStudent refreshData={GetAllStudents}/>
        </h2>
        <StudentListTable studentList={studentList} refreshData={GetAllStudents}/>
        
    </div>
  )
}

export default Student