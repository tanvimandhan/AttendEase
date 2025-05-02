import React from 'react'
import { Pie,PieChart, ResponsiveContainer } from 'recharts'
import { useEffect,useState } from 'react'
import { getUniqueRecord } from '../attendance/_components/AttendanceGrid'
import moment from 'moment'

function PieChartcom({attendanceList}) {
    const data01=[
        {
            "name":"Group A",
            "value":400
        },
        {
            "name":"Group B",
            "value":300
        }
    ]
    const [data,setData]=useState([])
    useEffect(()=>{
         if(attendanceList){
            const totalstuden=getUniqueRecord(attendanceList.data);
            //setTotalStudent(totalstuden.length);
            const today=moment().format('D');
            const PresentPercentage=(attendanceList.data.length/(totalstuden.length*Number(today))*100);
            setData([
                {
                    name:'Total Present',
                    value:Number(PresentPercentage.toFixed(1)),
                    fill:"#8884d8"
                },{
                    name:'Total Absent',
                    value:Number(100-PresentPercentage.toFixed(1)),
                    fill:"#82ca9d"
                }
            ])
            //console.log(PresentPercentage)
         }
    },[attendanceList])
  return (
    <div className='border p-5 roundede-lg'>
        <h2 className='font-bold text-lg'>Monthly Attendance</h2>
        <ResponsiveContainer width={'100%'} height={300}>
            <PieChart width={730} height={250}>
            
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
            </PieChart>
        </ResponsiveContainer>
        
    </div>
  )
}

export default PieChartcom