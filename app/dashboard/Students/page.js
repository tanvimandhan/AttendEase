"use client"
import React, { useEffect, useState } from 'react'
import AddnewStudent from './_components/AddnewStudent'
import GlobalApi from '@/app/_services/GlobalApi'
import StudentListTable from './_components/StudentListTable';

function Student() {

  const [studentsList,setStudentsList]=useState([]);

  useEffect(()=>{
    GetAllStudents()
  },[])
  const GetAllStudents=()=>{
    GlobalApi.GetAllStudents().then(resp=>{
      setStudentsList(resp.data);
    })
  }
  return (
    <div className='p-7'>
        <h2 className='font-bold text-2xl flex justify-between items-center'>Students
            <AddnewStudent refreshData={GetAllStudents}/>
        </h2>
        <StudentListTable studentList={studentsList} refreshData={GetAllStudents}/>
        
    </div>
  )
}

export default Student