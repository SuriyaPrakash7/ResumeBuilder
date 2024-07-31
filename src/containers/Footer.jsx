import React from 'react'
import logo from '../assets/logo.jpg'; 
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className='w-full flex items-center justify-between border-t border-r-gray-300'>
    
    <div className='flex items-center justify-center gap-3 py-3'>
    <img src={logo}  className="w-8 h-auto object-contain" alt="Logo" />
    <p> Expressume</p>
    </div>
    <div className='flex items-center justify-center gap-6'>
        <Link to= {"/"} className="text-blue-600 text-sm" >
        Home
        </Link><Link to= {"/"} className="text-blue-600 text-sm" >
        Contact
        </Link><Link to= {"/"} className="text-blue-600 text-sm whitespace-nowrap" >
        Privacy
        </Link>
      
    </div>
    </div>
  )
}

export default Footer