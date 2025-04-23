import React from 'react'
import { useState,useEffect } from 'react'
import { getUniqueRecord } from '../attendance/_components/AttendanceGrid';
import Card from './Card';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';
function StatusList({attendanceList}) {

  const [totalstudent,setTotalStudent]=useState(0);
  const [PresentPercentage,setPresentPercentage]=useState(0);
  
  useEffect(()=>{
     if(attendanceList){
        const totalstuden=getUniqueRecord(attendanceList);
        setTotalStudent(totalstuden.length);
        const today=moment().format('D');
        const PresentPercentage=(attendanceList.length/(totalstuden.length*Number(today))*100);
        console.log(PresentPercentage)
     }
  },[attendanceList])
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6'>
        <Card icon={<GraduationCap/>} title={'Total student'} value={totalstudent}/>
        <Card icon={<TrendingUp/>} title={'Total present'} value={PresentPercentage.toFixed(1)+'%'}/>
        <Card icon={<TrendingDown/>} title={'Total absent'} value={100-PresentPercentage.toFixed(1)+'%'}/>
    </div>
  )
}

export default StatusList