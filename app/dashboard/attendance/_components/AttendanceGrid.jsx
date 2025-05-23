import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import GlobalApi from '@/app/_services/GlobalApi'
import moment from 'moment'
import { toast } from 'react-toastify'  // Assuming you are using react-toastify for toast


// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [10, 25, 50, 100];

export const getUniqueRecord = (attendanceList) => {
    // if (!attendanceList) return []; // Add null check
    // //console.log("Attendance List:", attendanceList);
    // console.log(typeof attendanceList.data);
    // console.log(attendanceList.data);

    // const uniqueRecords = [];
    // const existingUsers = new Set();
    // //  console.log(1);
    // //  console.log(attendanceList);
    // //  console.log(2);
    // const list=attendanceList.data;
    // console.log(list);
    // attendanceList.data.forEach(record => {
    //     if (!existingUsers.has(record.id)) {
    //         existingUsers.add(record.id);
    //         uniqueRecords.push(record);
    //     }
    // });
    
    // return uniqueRecords;
    if (!attendanceList) return [];

  const list = Array.isArray(attendanceList)
    ? attendanceList
    : attendanceList.data;
  
  if (!Array.isArray(list)){console.log('Not an array') ;return [];}

  const uniqueRecords = [];
  const existingUsers = new Set();
  //console.log(list);
  list.forEach(record => {
    if (!existingUsers.has(record.id)) {
      existingUsers.add(record.id);
      uniqueRecords.push({
        ...record,
        studentId: record.id,  // ✅ Explicitly map id to studentId
      });
    }
  });
  
  console.log(2);
  return uniqueRecords;
};

function AttendanceGrid({ attendanceList, selectedMonth} ) {
    
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([
        { field: 'id', headerName: 'Student ID', filter: true },
        { field: 'name', filter: true },
    ]);
    
    // Calculate days in month
    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const numberOfDays = daysInMonth(
        moment(selectedMonth).year(),
        moment(selectedMonth).month()
    );
    
    const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);
   // console.log(1);
    useEffect(() => {
        
        if (attendanceList && Array.isArray(attendanceList)) {
            console.log(1);
            const userList = getUniqueRecord(attendanceList);
            console.log(userList);
            console.log(3);
            setRowData(userList);

            // Dynamically add day columns
            daysArray.forEach((date) => {
                setColDefs(prevData => [
                    ...prevData,
                    {
                        field: date.toString(),
                        width: 50,
                        editable: true,
                    }
                ]);
                userList.forEach(obj => {
                    obj[date] = isPresent(obj.studentId, date);
                });
            });
        }
    }, [attendanceList]);

    const isPresent = (studentId, day) => {
        const result = attendanceList.find(item => item.day == day && item.studentId == studentId);
        return result ? true : false;
    };

    const onMarkAttendance = (day, studentId, presentStatus) => {
        const date = moment(selectedMonth).format('MM/YYYY');
    
        if (presentStatus) {
            const data = {
                day: day,
                studentId: studentId,
                present: presentStatus,
                date: date,
            };
            GlobalApi.MarkAttendance(data)
                .then(resp => {
                    console.log(resp);
                    toast.success(`Student ID: ${studentId} marked as present`);
                })
                .catch(error => {
                    console.error('Error marking present:', error);
                    toast.error(`Failed to mark student ${studentId} as present`);
                });
        } else {
            GlobalApi.MarkAbsent(studentId, day, date)
                .then(resp => {
                    console.log(resp);
                    toast.success(`Student ID: ${studentId} marked as absent`);
                })
                .catch(error => {
                    console.error('Error marking absent:', error);
                    toast.error(`Failed to mark student ${studentId} as absent`);
                });
        }
    };
    return (
        <div className='ag-theme-quartz' style={{ height: 500 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                onCellValueChanged={(e) => onMarkAttendance(e.colDef.field, e.data.studentId, e.newValue)}
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
            />
        </div>
    );
}

export default AttendanceGrid;
