"use client"
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import Student from './student/page'
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
    useEffect(() => {
      if (selectedMonth && selectedGrade) {
        GetTotalPresentCountbyDay();
        getStudentAttendance();
      }
    }, [selectedMonth, selectedGrade]); // Fixed dependency array
    
    const getStudentAttendance=()=>{
      GlobalApi.GetAttendanceList(selectedGrade,moment(selectedMonth).format('MM/yyyy'))
      .then(resp=>{
        setAttendanceList(resp)
      })
    }

    const GetTotalPresentCountbyDay = () => {
      if (!selectedMonth || !selectedGrade) {
        console.warn("Month or grade not selected");
        return;
      }
    
      const formattedMonth = moment(selectedMonth).format('MM/yyyy');
    
      GlobalApi.TotalPresentCountbyDay(formattedMonth, selectedGrade)
        .then(resp => {
          if (resp?.data) {
            console.log(resp.data);

            setTotalPresent(resp.data);
          } else {
            console.warn("Empty or unexpected response:", resp);
            setTotalPresent([]);
          }
        })
        .catch(error => {
          console.error("Error fetching present count by day:", error);
          setTotalPresent([]);
        });
    };
    
  return (
    <div className='p-10'>
       {/* <Student/> */}
       <div className='flex items-center justify-between'>
          <h2 className='font-bold text-2xl'>Dashboard</h2>
          <div className="flex flex-col md:flex-row w-full md:w-65">
            <div className="w-48">
              <MonthSelection selectedMonth={setSelectedMonth} />
            </div>
            <div className="w-48">
              <GradeSelect selectedGrade={setSelectedGrade} />
            </div>
          </div>

       </div>
       <StatusList attendanceList={attendanceList}/>
       <div className='grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch'>
        <div className='md:col-span-2 h-full'>
          <div className='bg-white p-4 shadow-md rounded-xl h-full'>
            <BarChartcom attendanceList={attendanceList} totalPresent={totalPresent} />
          </div>
        </div>
        <div className='md:col-span-1 h-full'>
          <div className='bg-white p-4 shadow-md rounded-xl h-full'>
            <PieChartcom attendanceList={attendanceList} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default page