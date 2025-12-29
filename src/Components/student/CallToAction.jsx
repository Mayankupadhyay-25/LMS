import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='flex flex-col items centers gap-4 pt-10 pb-24 px-8 md:px-0'>
        <h1 className="text-xl md:text-4xl text-gray-800 font-semibold">Learn anything, anytime, anywhere</h1>
        <p className="text-gray-500 sm:text-sm">Incidiunt sint fugiat pariatur cupidatat consectetur sit cillum anim id
           veniam aliqua proident excepteur commodo do ea.</p>
           <div className='flex items-center font-medium gap-6'>
            <button>Get Started</button>
            <button>Learn more <img src={assets.arrow_icon} alt="Arrow Icon" /></button>
           </div>
        </div>
  )
}

export default CallToAction