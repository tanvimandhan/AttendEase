"use client";
import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

function BarChartCom({ attendanceList, totalPresent }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Process data when either attendanceList or totalPresent changes
    processChartData();
  }, [attendanceList, totalPresent]);

  const processChartData = () => {
    // If we have valid present data, use it
    if (Array.isArray(totalPresent) && totalPresent.length > 0) {
      const processedData = totalPresent.map(item => ({
        name: `Day ${item.day}`,
        Present: item.presentCount,
        Absent: (getUniqueStudentsCount() - item.presentCount) || 0
      }));
      setChartData(processedData);
    } 
    // If no data but we have attendance list, create empty structure
    else if (Array.isArray(attendanceList) && attendanceList.length > 0) {
      const daysInMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ).getDate();
      
      const emptyData = Array.from({ length: daysInMonth }, (_, i) => ({
        name: `Day ${i + 1}`,
        Present: 0,
        Absent: 0
      }));
      setChartData(emptyData);
    }
    // Fallback empty data
    else {
      setChartData([
        { name: 'Mon', Present: 0, Absent: 0 },
        { name: 'Tue', Present: 0, Absent: 0 },
        { name: 'Wed', Present: 0, Absent: 0 },
        { name: 'Thu', Present: 0, Absent: 0 },
        { name: 'Fri', Present: 0, Absent: 0 }
      ]);
    }
  };

  const getUniqueStudentsCount = () => {
    if (!attendanceList) return 0;
    const uniqueStudents = new Set();
    attendanceList.forEach(item => uniqueStudents.add(item.studentId));
    return uniqueStudents.size;
  };

  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Weekly Attendance Overview</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip 
            formatter={(value) => [value, value === 1 ? 'student' : 'students']}
          />
          <Legend />
          <Bar 
            dataKey="Present" 
            name="Present" 
            fill="#4CAF50" 
            radius={[4, 4, 0, 0]} 
          />
          <Bar 
            dataKey="Absent" 
            name="Absent" 
            fill="#F44336" 
            radius={[4, 4, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartCom;
