import React from 'react'

function Card({icon,title,value}) {
  return (
    <div className='flex items-center gap-5 p-7  bg-sky-100 rounded-lg shadow'>
        <div className='p-2 w-10 rounded-full bg-white text-primary'>
            {icon}
        </div>
        <div>
            <h2 className='font-bold text-xl'>{title}</h2>
            <h2 className='text-lg'>{value}</h2>
            
        </div>
    </div>
  )
}

export default Card