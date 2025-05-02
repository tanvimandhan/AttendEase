"use client";
import React, { useState, useEffect } from 'react';
import {
  BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip, ResponsiveContainer
} from 'recharts';
import { getUniqueRecord } from '../attendance/_components/AttendanceGrid';

function BarChartcom({ attendanceList, totalPresent }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    formatAttendanceListCount();
  }, [attendanceList, totalPresent]);

  const formatAttendanceListCount = () => {
    const totalStudents = getUniqueRecord(attendanceList);
    const defaultDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

    let result = [];

    if (Array.isArray(totalPresent) && totalPresent.length > 0) {
      result = totalPresent.map(item => ({
        day: item.day,
        presentCount: item.presentCount,
        absentCount: (totalStudents?.length || 0) - Number(item.presentCount)
      }));
    } else {
      // Fallback default empty graph
      result = defaultDays.map(day => ({
        day,
        presentCount: 0,
        absentCount: 0
      }));
    }

    setData(result);
  };

  return (
    <div className='p-5 border rounded-lg shadow-sm'>
      <h2 className='my-2 font-bold text-lg'>Attendance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="presentCount" name="Total Present" fill="#8884d8" />
          <Bar dataKey="absentCount" name="Total Absent" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartcom;
