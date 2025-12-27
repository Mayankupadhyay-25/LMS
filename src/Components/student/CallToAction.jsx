import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='flex flex-col items centers'>
        <h1>Learn anything, anytime, anywhere</h1>
        <p>Incidiunt sint fugiat pariatur cupidatat consectetur sit cillum anim id
           veniam aliqua proident excepteur commodo do ea.</p>
           <div>
            <button>Get Started</button>
            <button>Learn more <img src={assets.arrow_icon} alt="Arrow Icon" /></button>
           </div>
        </div>
  )
}

export default CallToAction