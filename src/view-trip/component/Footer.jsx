import React from 'react'
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <>
    
    <div className='my-7 flex flex-col items-center'>
        <h2 className='mt-7 text-center text-gray-400'>Created by @Amit Kumar - AI Trip Planner</h2>
        <div className='flex items-center gap-3 mt-2 text-gray-400'>
          <p >Conect Me : </p>  
          <a href="https://linkedin.com/in/amit-kumar-a43279321" target="_blank" title="LinkedIn">
<TiSocialLinkedinCircular size={32} />
</a>

<a href="https://github.com/amit-kumar1511" target="_blank" title="Github">
<FaGithub size={25}/>
</a>
        </div>
    </div>
    </>
  )
}

export default Footer