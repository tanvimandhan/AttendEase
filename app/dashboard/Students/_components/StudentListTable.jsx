import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { Button } from '@/components/ui/button'
import { ModuleRegistry } from 'ag-grid-community'
import { ClientSideRowModelModule } from 'ag-grid-community'
 
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
// Register the required modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { Trash } from 'lucide-react'
import GlobalApi from '@/app/_services/GlobalApi'

const pagination=true;
const paginationPageSize=10;
const paginationPageSizeSelector=[25,50,100];

function StudentListTable({ studentList,refreshData }) {
  
  const CustomButtons = (props) => {
    return (<AlertDialog>
      <AlertDialogTrigger><Button variant={destructive}><Trash/></Button></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={()=>DeleteRecord(props?.data?.id)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    )
  }

  const [colDefs, setColDefs] = useState([
    { field: 'id', filter: true },
    { field: 'name', filter: true },
    { field: 'address', filter: true },
    { field: 'contact', filter: true },
    { field: 'action', cellRenderer: CustomButtons }
  ])
  
  const [rowData, setRowData] = useState([])
  const [searchInput,setSearchInput]=useState();
  useEffect(() => {
    if (studentList && studentList.length) {
      setRowData(studentList)
    }
  }, [studentList])

  const DeleteRecordid=(id)=>{
    GlobalApi.DeleteStudentRecord(id).then(res=>{
      if(res){
        toast('record deleted successfully');
        refreshData()
      }
      
    })
  }
    
  

  return (
    <div className='my-7'>
      <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
      <div className='p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm'>
        <Search/>
        <input type="text" placeholder='Search..' className='outline-none w-full'
        onChange={(e)=>setSearchInput(e.target.value)}/>
      </div>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        // Add these default column settings for better visibility
        quickFilterText={searchInput}
        defaultColDef={{
          sortable: true,
          resizable: true,
          flex: 1,
          minWidth: 100
        }}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
      />
    </div>
    </div>
    
  )
}

export default StudentListTable