"use client"
import './assets/main.css' // css main file
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { retrieveFromLocal } from './assets/functions'
import { dataType } from './new/page'

import { motion } from 'framer-motion'

export default function Home() {
  const [data, setData] = useState<dataType[]>([])

  useEffect(() => {
      setData(
        retrieveFromLocal('data') || []
      )
  }, [])
  
  let ok = false;
  let initial = 0;
  return (
    <main id="main">
      
      <div className="content-wrapper">
            <div className="content-slideshow" onScroll={(e) => {
              let addElement = document.getElementById('add-content');

              if(!ok) {
                initial = addElement?.getBoundingClientRect().x || 0;
                ok = true;
              }

              let CONTENT_WIDTH = addElement?.getBoundingClientRect().width || 0;
              let currentX = addElement?.getBoundingClientRect().x || 0;              
              let currentIndex = Math.floor(initial / ( 32 + currentX + CONTENT_WIDTH))
              
              console.log(currentIndex);

              document.querySelectorAll(".tab")?.[currentIndex + 1]?.classList.remove("active-tab")
              document.querySelectorAll(".tab")?.[currentIndex - 1]?.classList.remove("active-tab")

              document.querySelectorAll(".tab")[currentIndex].classList.add("active-tab")
            }}>
              
              {data.length && <>
                {data.map((item: dataType, index: number) => {
                  return <ContentItem {...item}  key={index}/>
                })}

                  <AddContent />      
              </>}
            </div>

            <div className="tabs">              
            <span className="tab active-tab"></span>
              {new Array(data.length).fill(0).map((item: number, index:number) => {
                return <span className="tab" key={index}></span>
              })}
            </div>
      </div>
            
    </main>
  )
}

function AddContent() {
  const router = useRouter()

  
  return(
    <motion.div
      initial={{scale: 0}}
      animate={{scale: 1}}

    onClick={() => {
        router.push('/new')
    }} className="content" id='add-content'>
    <h1 className="content-title m1">Add goal</h1>

    <div className="money-wrapper">
        <div className="background-radial background-radial-add"></div>
        
        <div className="money-circle money-circle-add">
          <h1 className='money-add m1'>+</h1>
        </div>
    </div>

  </motion.div>
  )


}

function ContentItem(data: dataType) {
  const router = useRouter()
  const procent = (100 * data.amount) / data.goal;;
  let isComplete = false;

  if(data.amount >= data.goal) isComplete = true;

  return(
    <div 
    
    className={`content-goal content ${isComplete && 'complete'}`} onClick={() => {
      router.push(`/edit?edit=true&goal=${data.goal}&amount=${data.amount}&title=${data.title}`)
    }}>
    <h1 className="content-title m1">{data.title}</h1>

    <div className="money-wrapper">
        <motion.div
          initial={{scale: 0}}
          animate={{scale: 1}}
        className="svg-gradient">
        </motion.div>
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1, transition: {
          delay: 1.25
        }}}
        className="background-radial"></motion.div>
        
        <div className="progress">
          <div className="progress-bar"></div>
          <div className="progress-value"></div>
        </div>
        
        <div className="money-circle">
          <motion.p
          initial={{scale: 0}}
          animate={{scale: 1, transition: {
            delay: .25,
          }}}            className="money-goal m3">/{data.goal}</motion.p>

          <motion.div
            initial={{scale: 0}}
            animate={{scale: 1, transition: {
              delay: .5,
            }}}          className='money-container'>
            <h1 className="m1 money-current">{data.amount}</h1>
            <p className="label m3">left</p>
          </motion.div>

          <motion.p 
          initial={{scale: 0}}
          animate={{scale: 1, transition: {
            delay: .75,
          }}}
          className="money-procent m3">{procent.toFixed(0)}%</motion.p>
        </div>
    </div>

    </div>
  )

}