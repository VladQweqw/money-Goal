"use client"
import React from 'react'
import ModalBg from '../components/modelBg'
import { useRef } from 'react'
import { saveToLocal, retrieveFromLocal } from '../assets/functions'
import { useRouter } from 'next/navigation'

export type dataType = {
  title: string,
  goal: number,
  amount: number,
  id: number,
}


export default function NewGoal() {
  const goal = useRef<HTMLInputElement | null>(null)
  const amount = useRef<HTMLInputElement | null>(null)
  const title = useRef<HTMLInputElement | null>(null)
  const router = useRouter()
  
  function submitForm() {
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

  
    if(retrieveFromLocal("data")) {
      const data: dataType[] = retrieveFromLocal('data');
      data.push(dataObj);

      saveToLocal('data', data);  
    }else {
      saveToLocal('data', [dataObj]);
    }
  
    
  
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
                <input  ref={goal} onFocus={() => {          
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
            onClick={() => submitForm()}
            className="create-modal btn">Create</button>
          </div>
        </div>
    </ModalBg>
  )
}
