import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='text-center bg-neutral-600 bg-opacity-35 text-neutral-400 py-4'>
        <div className='flex items-center justify-center gap-4'>
          <Link to="/about" className='hover:text-white'>About</Link>
          <Link to="/contact" className='hover:text-white'>Contact</Link>
        </div>
        <p className='text-sm mt-2'>Created By Vipeen Kumar</p>
    </footer>
  )
}

export default Footer
