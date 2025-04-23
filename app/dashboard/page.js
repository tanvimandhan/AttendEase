"use client"
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import Student from './Students/page'
import MonthSelection from '../_components/MonthSelection'
import GradeSelect from '../_components/GradeSelect'
import GlobalApi from '../_services/GlobalApi'
import StatusList from './_components/StatusList'
import BarChartcom from './_components/BarChartcom'
import PieChartcom from './_components/PieChartcom'
import moment from 'moment'
import { Button } from '@/components/ui/button'

function page() {

    const [selectedMonth,setSelectedMonth]=useState();
    const [selectedGrade,setSelectedGrade]=useState();
    const [attendanceList,setAttendanceList]=useState();
    const [totalPresent,setTotalPresent]=useState([]);
    // const {setTheme}=useTheme()
    // useEffect(()=>{
    //     setTheme('dark')
    // },[])
    useEffect(()=>{
      GetTotalPresentCountbyDay();
      getStudentAttendance();
      
    },[selectedMonth || selectedGrade])
    
    const getStudentAttendance=()=>{
      GlobalApi.GetAttendanceList(selectedGrade,moment(selectedMonth).format('MM/yyyy'))
      .then(resp=>{
        setAttendanceList(resp)
      })
    }

    const GetTotalPresentCountbyDay=()=>{
      GlobalApi.TotalPresentCountbyDay(moment(selectedMonth).format('MM/yyyy'),selectedGrade)
      .then(resp=>{
         setTotalPresent(resp.data)
      })
    }
  return (
    <div className='p-10'>
       {/* <Student/> */}
       <div className='flex items-center justify-between'>
          <h2 className='font-bold text-2xl'>Dashboard</h2>
          <div className='flex items-center gap-4'>
              <MonthSelection selectedMonth={setSelectedMonth} />
              <GradeSelect selectedGrade={setSelectedGrade}/>
              
          </div>
       </div>
       <StatusList attendanceList={attendanceList}/>
       <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div className='md:col-span-2'>
          <BarChartcom attendanceList={attendanceList} totalPresent={totalPresent}/>
        </div>
        <div>
          <PieChartcom attendanceList={attendanceList}/>
        </div>
        <div>

        </div>
       </div>
    </div>
  )
}

export default page