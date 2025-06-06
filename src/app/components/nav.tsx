import "../../css/fonts.css"
import React from 'react'

const Nav = () => {
  return (
    <>
    <nav className='w-full z-10 top-0 sticky h-20 flex flex-row items-center justify-between'>
        <h1 className='font-bold ml-16 text-3xl text-[#EDA200] montserrat tracking-widest'>Weforge.</h1>
        <div className='font-light mr-16 flex gap-24 flex-row justify-evenly text-2xl text-white'>
            <a href="/"><p className="font-bold tracking-widest border-2 backdrop-blur-3xl border-[#EDA200]/70 p-2 min-w-50 text-center rounded-md shadow-md montserrat hover:bg-[#EDA200] hover:text-black duration-300">Home</p></a>
            <a href="/editor"><p className="font-bold tracking-widest border-2 backdrop-blur-3xl border-[#EDA200]/70 p-2 min-w-50 text-center rounded-md shadow-md montserrat hover:bg-[#EDA200] hover:text-black duration-300">Editor</p></a>
            <a href="/account"><p className="font-bold tracking-widest border-2 backdrop-blur-3xl border-[#EDA200]/70 p-2 min-w-50 text-center rounded-md shadow-md montserrat hover:bg-[#EDA200] hover:text-black duration-300">Account</p></a>
        </div>
    </nav>
    </>
  )
}

export default Nav