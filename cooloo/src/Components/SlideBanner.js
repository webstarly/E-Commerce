import React, { useEffect, useState } from 'react'
import image1 from '../assest/assest/banner/img1.webp'
import image2 from '../assest/assest/banner/img2.webp'
import image3 from '../assest/assest/banner/img3.jpg'
import image4 from '../assest/assest/banner/img4.jpg'
import image5 from '../assest/assest/banner/img5.webp'

import image1Mobile from '../assest/assest/banner/img1_mobile.jpg'
import image2Mobile from '../assest/assest/banner/img2_mobile.webp'
import image3Mobile from '../assest/assest/banner/img3_mobile.jpg'
import image4Mobile from '../assest/assest/banner/img4_mobile.jpg'
import image5Mobile from '../assest/assest/banner/img5_mobile.png'

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";


const SlideBanner = () => {

    const [currentBanner, setCurrentBanner] = useState(0)

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ]

    const nextBanner = () =>{
        if(desktopImages.length - 1 > currentBanner){
            setCurrentBanner(preve => preve + 1)
        }
        
    }
   
    const preveBanner = () =>{
        if(currentBanner != 0){
            setCurrentBanner(preve => preve - 1)
        }
    }


    useEffect(()=>{
        const interval = setInterval(()=>{
            if(desktopImages.length - 1 > currentBanner){
                nextBanner()
            }else{
                setCurrentBanner(0)
            }
        },5000)

        return ()=> clearInterval(interval)
    },[currentBanner])

  return (
    <div className='cointainer mx-auto px-8 rounded '>
        <div className='h-56 md:h-72 w-full bg-slate-200 relative' >

            <div className='absolute z-10 w-full h-full md:flex items-center  hidden'>
                <div className=' flex justify-between w-full text-2xl p-1'>
                    <button onClick={preveBanner} className='bg-white rounded-full shadow-md p-1'><IoIosArrowBack/> </button>
                    <button onClick={nextBanner} className='bg-white rounded-full shadow-md p-1'><IoIosArrowForward/> </button>
                </div>
            </div>


        {/** for desktop */}
           <div className='hidden md:flex w-full h-full overflow-hidden'>
                {
                    desktopImages.map((imageURI, index) => {
                        return (
                        <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURI} style={{transform : `translateX(-${currentBanner * 100}%)`}}>
                            <img src={imageURI} className='w-full h-full' />
                        </div>
                        )
                    }) 
                }
           </div>

        {/** for mobile */}
            <div className='flex w-full h-full md:hidden overflow-hidden'>
                {
                    mobileImages.map((imageURI, index) => {
                        return (
                        <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURI} style={{transform : `translateX(-${currentBanner * 100}%)`}}>
                            <img src={imageURI} className='w-full h-full object-cover' />
                        </div>
                        )
                    }) 
                }
           </div> 
            
        </div>
    </div>
  )
}

export default SlideBanner