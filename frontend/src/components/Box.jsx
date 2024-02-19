/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import axios from 'axios'

const Box = (props) => {

  return (
    <div className="relative rounded bg-slate-900 p-[16px] flex items-center cursor-pointer mb-[16px] hover:opacity-[0.8]" onClick={() => props.toggleComplete(props.id, event)}>
      <div className={`w-[20px] h-[20px] mr-[16px] rounded-[50%] bg-slate-700 ${props.complete && 'bg-[green]'}`}></div>
      <div className={props.complete ? 'line-through' : 'undefined'}>{props.text}</div>
      <div className="absolute top:[50%] right-[20px] rounded-[50%] bg-red-600 w-[25px] flex justify-center items-center hover:scale-110 hover:text-[1.1rem]" onClick={() => props.deleteTodo(props.id)}>x</div>
    </div>
  )
}

export default Box