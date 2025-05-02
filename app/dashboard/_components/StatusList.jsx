import React from 'react'
import { useState,useEffect } from 'react'
import { getUniqueRecord } from '../attendance/_components/AttendanceGrid';
import Card from './Card';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';
import moment from 'moment';

function StatusList({attendanceList}) {

  const [totalstudent,setTotalStudent]=useState(0);
  const [PresentPercentage,setPresentPercentage]=useState(0);
  
  useEffect(()=>{
     if(attendanceList){
        const totalstuden=getUniqueRecord(attendanceList);
        console.log(attendanceList);
        setTotalStudent(totalstuden.length);
        const today=moment().format('D');
        // console.log(1);
        // console.log(attendanceList.data.length);
        // console.log(2);
        // console.log(totalstuden.length);
        // console.log(3);
        // console.log(Number(today));
        const PresentPercentage=(attendanceList.length/((totalstuden.length)*Number(today)));
        console.log(PresentPercentage)
     }
  },[attendanceList])
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6'>
        <Card 
  icon={<div className="w-6 h-6"><GraduationCap /></div>}
  title={'Total student'} 
  value={PresentPercentage}
/>
        <Card icon={<TrendingUp/>} title={'Total present'} value={PresentPercentage.toFixed(1)+'%'}/>
        <Card icon={<TrendingDown/>} title={'Total absent'} value={100-PresentPercentage.toFixed(1)+'%'}/>
    </div>
  )
}

export default StatusList