"use client"
import React from 'react'
import ModalBg from '../components/modelBg'
import { useRef, useEffect, useState } from 'react'
import { saveToLocal, retrieveFromLocal } from '../assets/functions'
import { useRouter } from 'next/navigation'
import { dataType } from '../new/page'

export default function EditGoal() {
  const goal = useRef<HTMLInputElement | null>(null)
  const amount = useRef<HTMLInputElement | null>(null)
  const title = useRef<HTMLInputElement | null>(null)
  const router = useRouter()
  
  useEffect(() => {
    setTimeout(() => {
        const queryParameters = new URLSearchParams(window.location.search)

        let goalParam = queryParameters.get('goal') || '',
            amountParam = queryParameters.get('amount') || '',
            titleParam = queryParameters.get('title') || '';

        goal.current!.value = goalParam;
        amount.current!.value = amountParam;
        title.current!.value = titleParam;
        
        (document.getElementById('goal-label')   as HTMLLabelElement).classList.add("active-label");
        (document.getElementById('amount-label') as HTMLLabelElement).classList.add("active-label")
        
      }, 1);
      () => {return}
  }, [])
  
  

  function submitForm() {
    const queryParameters = new URLSearchParams(window.location.search)
    const goalVal = goal.current!.value;
    const amountVal = amount.current!.value;
    const titleVal = title.current!.value;
    

    if(!goalVal || !amount || !titleVal) {
      return alert("fill gaps")
    }

    const dataObj: dataType = {
      title: titleVal,
      goal: parseInt(goalVal),
      amount: parseInt(amountVal),
      id: new Date().getTime()
    }

    const arr = retrieveFromLocal('data') || [] as dataType[] | [];

    let idx = 0;
    for(let i = 0; i < arr.length; i++) {
      if(arr[i].title === queryParameters.get('title')) {
        idx = i;
        break;
      }
    }

    arr[idx] = dataObj;    
    saveToLocal('data', arr);

    router.push("/")
  }

  function remove() {
    const queryParameters = new URLSearchParams(window.location.search)
    const arr = retrieveFromLocal('data') || [] as dataType[] | [];
    let newArr = arr.filter((item: dataType) => item.title !== queryParameters.get('title'));
        
    saveToLocal('data', newArr)  
    router.push("/")
  }    


  return (
    <ModalBg>
        <div className="modal create-modal">
          <header className="modal-header">
            <input ref={title} placeholder='Title' className="modal-title m2"></input>
          </header>

          <form className="modal-form">
              <div className="input">
                <label className='label' id='goal-label' htmlFor={'goal'}>Set goal</label>
                <input ref={goal} onFocus={() => {          
                  (document.getElementById('goal-label') as HTMLLabelElement).classList.add("active-label");
                }} 
                onBlur={(e) => {
                  const label = document.getElementById('goal-label') as HTMLLabelElement;
                  
                  if((e.target as HTMLInputElement).value.trim() === '') {
                    label.classList.remove("active-label");
                    (e.target as HTMLInputElement).value = ''
                  }
                } }
                type="text" id={"goal"} className='input-field' />
              </div>

              <div className="input">
                <label className='label' id='amount-label' htmlFor="amount">Set amount</label>
                <input ref={amount} onFocus={() => {          
                  (document.getElementById('amount-label') as HTMLLabelElement).classList.add("active-label");
                }} 
                onBlur={(e) => {
                  const label = (document.getElementById('amount-label') as HTMLLabelElement);

                  if((e.target as HTMLInputElement).value.trim() === '') {
                    label.classList.remove("active-label");
                    (e.target as HTMLInputElement).value = ''
                  }
                } }
                type="text" id="amount" className='input-field' />
              </div>
          </form>

          <div className="button-wrapper">
            <button
            onClick={(e) => {
              submitForm()
            }}
            className="create-modal btn">Save</button>

            <button
            onClick={(e) => {
              remove()
            }}
            className="remove-modal btn">Delete</button>
          </div>
        </div>
    </ModalBg>
  )
}
