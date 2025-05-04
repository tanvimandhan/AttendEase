'use client'
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
} from '@/components/ui/alert-dialog'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { Trash } from 'lucide-react'
import GlobalApi from '@/app/_services/GlobalApi'
import { toast } from 'sonner'

// Register the required modules
ModuleRegistry.registerModules([ClientSideRowModelModule])

const pagination = true
const paginationPageSize = 10
const paginationPageSizeSelector = [25, 50, 100]

function StudentListTable({ studentList, refreshData }) {
  const [searchInput, setSearchInput] = useState('')

  const DeleteRecordid = (id) => {
    GlobalApi.DeleteStudentRecord(id).then((res) => {
      if (res) {
        toast('Record deleted successfully')
        refreshData()
      }
    })
  }

  const CustomButtons = (props) => (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this student record.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => DeleteRecordid(props?.data?.id)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  const [colDefs] = useState([
    { field: 'id', filter: true },
    { field: 'name', filter: true },
    { field: 'address', filter: true },
    { field: 'contact', filter: true },
    {
      field: 'action',
      headerName: 'Action',
      cellRenderer: CustomButtons,
      cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' }
    },
  ])

  const [rowData, setRowData] = useState([])

  useEffect(() => {
    if (studentList && studentList.length) {
      setRowData(studentList)
    }
  }, [studentList])

  return (
    <div className="my-7">
      <div className="p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm">
        <input
          type="text"
          placeholder="Search.."
          className="outline-none w-full"
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          quickFilterText={searchInput}
          defaultColDef={{
            sortable: true,
            resizable: true,
            flex: 1,
            minWidth: 100,
          }}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          getRowHeight={() => 50} // Makes room for icon
        />
      </div>
    </div>
  )
}

export default StudentListTable
