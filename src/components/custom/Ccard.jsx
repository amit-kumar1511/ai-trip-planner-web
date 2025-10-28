import React from 'react'


const Ccard = ({icon, title, description}) => {
 return (
   <div>
   
   <div className="p-2 sm:p-4 border cursor-pointer rounded-lg hover:shadow-lg border-black shadow-lg'">
    <h1>{icon}</h1>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p>{description}</p>
   </div>
   
   </div>
    
    
  );
}

export default Ccard