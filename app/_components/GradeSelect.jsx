"use client"
import React from 'react'
import GlobalApi from '../_services/GlobalApi';
import { useStackApp } from '@stackframe/stack';
import { useState,useEffect } from 'react';

function GradeSelect() {
  const [grades,setGrades]=useState([])
  useEffect(()=>{
    GetAllGradesList();
  },[])
  const GetAllGradesList=()=>{
    GlobalApi.GetAllGrades().then(resp=>{
      setGrades(resp.data);
    })
  }
  return (
    <div>
        <select className='p-2 border rounded-lg'>
            {grades.map((item,index)=>(
               <option key={index} value={item.grade} >{item.grade}</option>
            ))}
        </select>
    </div>
  )
}

export default GradeSelect