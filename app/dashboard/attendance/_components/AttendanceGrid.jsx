import React, { useEffect } from 'react'
import {AgGridReact} from 'ag-grid-react'
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import GlobalApi from '@/app/_services/GlobalApi';
import { useState } from 'react';
import moment from 'moment';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const pagination=true;
const paginationPageSize=10;
const paginationPageSizeSelector=[25,50,100];
export const getUniqueRecord = (attendanceList) => {
    const uniqueRecord = [];
    const existingUser = new Set();
    attendanceList?.forEach(record => {
        if (!existingUser.has(record.studentId)) {
            existingUser.add(record.studentId);
            uniqueRecord.push(record);
        }
    });
    return uniqueRecord;
};
function AttendanceGrid({attendanceList,selectedMonth}) {
    const [rowData,setRowdata]=useState();
    const [colDefs,setColDefs]=useState([
        {field:'studentId',filter:true},
        {field:'name',filter:true},

        
    ])
    useEffect(()=>{
        if(attendanceList){
            const userList=getUniqueRecord();
            //console.log(userList);
            setRowdata(userList);
            daysArrays.forEach((date)=>{
                setColDefs(prevData=>[...prevData,{
                    field:date.toString(),width:50,editable:true
                }])
                userList.forEach(obj=>{
                    obj[date]=isPresent(obj.studentId,date)
                })
            })
        }
        
    },[attendanceList])
    
    const isPresent=(studentId,day)=>{
        const result=attendanceList.find(item=>item.day==day&&item.studentId==studentId)
        return result?true:false
    }
    
    const onMarkAttendance=(day,studentId,presentStatus)=>{
        const date=moment(selectedMonth).format('MM/yyyy')

        if(presentStatus){
            const data={
                day:day,
                studentId:studentId,
                presnt:presentStatus,
                date:date
            }
            GlobalApi.onMarkAttendance(data).then(resp=>{
                console.log(resp)
                toast("student id: "+studentId+"Marked as present")
            })
        }else{
            GlobalApi.MarkAbsent(studentId,day,date).then(resp=>{
                toast("Student Id:"+studentId+"marked as absent")
            })
        }
    }
    const daysInMonth=(year,month)=>new Date(year,month+1,0).getDate()
    const numberOfDays=daysInMonth(moment(selectedMonth).format('yyyy'),moment(selectedMonth).format('MM'))
    //console.log(numberOfDays);
    const daysArrays=Array.from({length:numberOfDays},(_,i)=>i+1)
    return (
    <div className='ag-theme-quartz' style={{height:500}}>
        <AgGridReact rowData={rowData} columnDefs={colDefs}
        onCellValueChanged={(e)=>onMarkAttendance(e.colDef.field,e.data.studentId,e.newValue)}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
        />
         
    </div>
  )
}

export default AttendanceGrid