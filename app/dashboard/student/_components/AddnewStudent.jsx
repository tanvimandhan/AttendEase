"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import GlobalApi from '@/app/_services/GlobalApi'
import { LoaderIcon } from 'lucide-react'
import { toast } from "sonner"

const pagination=true;
const paginationPageSize=10;
const paginationPageSizeSelector=[25,50,100];

function AddnewStudent({refreshData}) {
  const [open,setOpen]=useState(false);
  const [grades,setGrades]=useState([]);
  const [loading,setLoading]=useState(false);

    const {
      register,
      handleSubmit,
      watch,reset,
      formState: { errors },
    } = useForm()

    useEffect(()=>{
       GetAllGradesList();
    },[])

    const GetAllGradesList=()=>{
         GlobalApi.GetAllGrades().then(resp=>{
         // console.log(2)
         // console.log(resp.data);
          setGrades(resp.data)
         })
    }
    const onSubmit=(data)=>{
      setLoading(true);
      //console.log("formdata",data);
      GlobalApi.createNewStudent(data).then(resp=>{
        console.log(3)
        console.log("--",resp); 
        if(resp.data){
          reset();
          refreshData();
          setOpen(false);
        
          toast('New student added')
        }
        setLoading(false);
      })
    }
  return (
    <div>
        <Button onClick={()=>setOpen(true)}>Add new student</Button>
        <Dialog open={open}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new Student</DialogTitle>
              <DialogDescription>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className='py-2'>
                  <label>Full Name</label>
                  
                  <Input placeholder='Ex. katty pery'
                  {...register('name',{required:true})}/>
                </div>
                <div className='flex flex-col py-2'>
                  <label >Select grade</label>
                  <select className='p-3 border rounded-lg '
                  {...register('grade',{required:true})}>
                    {grades.map((item,index)=>(
                        <option key={item.id} value={item.grade}>{item.grade}</option>
                    ))}
                    {/* <option value='5'>5</option>
                    <option value='6'>6</option> */}
                    
                  </select>
                  
                </div>
                <div className='py-2'>
                  <label>Contact No.</label>
                  <Input type="number" placeholder='Ex. 1234567890'
                  {...register('contact')}/>
                </div>
                <div className='py-2'>
                  <label>Address</label>
                  <Input placeholder='Ex. 525 N street'
                  {...register('address')}/>
                </div>
                <div className='flex gap-3 items-center justify-end mt-5'>
                  <Button type="submit" onClick={()=>setOpen(false)} variant='ghost'>Cancel</Button>
                  <Button type="submit" disable={loading} >{loading?<LoaderIcon className='animate-spin'/>: 'Save'}</Button>
                </div>
              </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddnewStudent