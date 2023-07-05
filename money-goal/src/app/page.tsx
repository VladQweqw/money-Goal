"use client"
import './assets/main.css' // css main file
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { retrieveFromLocal } from './assets/functions'
import { dataType } from './new/page'

export default function Home() {
  const [data, setData] = useState<dataType[]>([])

  useEffect(() => {
      setData(
        retrieveFromLocal('data') || []
      )
  }, [])
  

  return (
    <main id="main">
      
      <div className="content-wrapper">
            <div className="content-slideshow">
              
              {data.map((item: dataType, index: number) => {
                if(index === data.length - 1) {
                  return <>
                    <ContentItem {...item}  key={index}/>
                    <AddContent />
                  </>
                }

                return <ContentItem {...item}  key={index}/>
              })}
              
            </div>

            <div className="tabs">              
              {new Array(data.length + 1).fill(0).map((a, index:number) => {
                if(index === 0) return <span className="tab active-tab" key={index}></span>

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
    <div onClick={() => {
        router.push('/new')
    }} className="content">
    <h1 className="content-title m1">Add goal</h1>

    <div className="money-wrapper">
        <div className="background-radial background-radial-add"></div>
        
        <div className="money-circle money-circle-add">
          <h1 className='money-add m1'>+</h1>
        </div>
    </div>

  </div>
  )


}

function ContentItem(data: dataType) {
  const router = useRouter()
  const procent = (100 * data.amount) / data.goal;;

  return(
    <div className="content" onClick={() => {
      router.push(`/new?edit=true?goal=${data.goal}?amount=${data.amount}?title=${data.title}`)
    }}>
    <h1 className="content-title m1">{data.title}</h1>

    <div className="money-wrapper">
        <div className="svg-gradient">
        </div>
        <div className="background-radial"></div>
        
        <div className="progress">
          <div className="progress-bar"></div>
          <div className="progress-value"></div>
        </div>
        
        <div className="money-circle">
          <p className="money-goal m3">/{data.goal}</p>

          <div className='money-container'>
            <h1 className="m1 money-current">{data.amount}</h1>
            <p className="label m3">left</p>
          </div>

          <p className="money-procent m3">{procent}%</p>
        </div>
    </div>

  </div>
  )

}