"use client"
import React, { useState } from 'react'
import { BarChart,CartesianGrid,XAxis,YAxis,Legend,Bar,Tooltip, ResponsiveContainer } from 'recharts'
import { getUniqueRecord } from '../attendance/_components/AttendanceGrid'
import { useEffect } from 'react'

function BarChartcom({attendanceList,totalPresent}) {
    const [data,setData]=useState([])
    useEffect(()=>{
        formatAttendanceListCount();

    },[attendanceList || totalPresent])
    const formatAttendanceListCount=()=>{
        const totalStudent=getUniqueRecord(attendanceList);
        const result=totalPresent.map((item=>({
            day:item.day,
            presentCount:item.presentCount,
            absentCounnt:Number(totalStudent?.length)-Number(item.presentCount)
        })));
        console.log(result);
        setData(result);
    }
  return (
    
    
    <div className='p-5 border rounded-lg shadow-sm'>
        <h2 className='my-2 font-bold text-lg'>Attendance</h2>
        <ResponsiveContainer width={'100%'} height={300}>
        <BarChart  data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="DAY" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="PresentCount" name="Total Present" fill="#8884d8" />
            <Bar dataKey="AbsentCount" name="Total Absent" fill="#82ca9d" />
        </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default BarChartcom