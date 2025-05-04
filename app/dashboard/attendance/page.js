"use client"
import GradeSelect from '@/app/_components/GradeSelect'
import MonthSelection from '@/app/_components/MonthSelection'
import GlobalApi from '@/app/_services/GlobalApi'
import React from 'react'
import {useState} from 'react'
import AttendanceGrid from './_components/AttendanceGrid'
import { Button } from '@/components/ui/button'
import StatusList from '../_components/StatusList'
import moment from 'moment'

function Attendance() {
  const [selectedMonth,setSelectedMonth]=useState();
  const[selectedGrade,setSelectedGrade]=useState();
  const [attendanceList,setAttendanceList]=useState([]);

  //used to fetch attendance list fro given month and grade
  const onSearchhandler = () => {
    if (!selectedGrade || selectedGrade === 'undefined') {
      console.log("Grade not selected");
      return;
    }
    if (!selectedMonth) {
      console.log("Month not selected");
      return;
    }
  
    const month = moment(selectedMonth).format('MM/YYYY');
    //console.log(2);
    GlobalApi.GetAttendanceList(selectedGrade, month).then(resp => {
      console.log("API Response:", resp);
      console.log(resp.data);
      //console.log(1);
      setAttendanceList(resp.data || []);
    });
    //console.log(3);
  };
  return (
    <div>
        <div className='p-10'>
            <h2 className='text-2xl font-bold'>Attendance</h2>
            <div className='flex gap-5 my-5 p-5 border rounded-lg'>
                <div className='flex gap-2 items-center'>
                  <label>Select month</label>
                  <MonthSelection selectedMonth={(value)=>setSelectedMonth(value)}/>
                </div>
                <div className='flex gap-2 items-center'>
                  <label>Select grade</label>
                  <GradeSelect selectedGrade={(v)=>setSelectedGrade(v)}/>
                </div>
                <Button onClick={()=>onSearchhandler()}>Search</Button>
                
            </div>
        </div>
        <AttendanceGrid attendanceList={attendanceList} selectedMonth={selectedMonth}/>
        {/* <StatusList attendanceList={attendanceList}/> */}
    </div>
   
  )
}

export default Attendance