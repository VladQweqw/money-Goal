import React from 'react'
import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'


interface Props {
    children: ReactNode
}

export default function ModalBg({children}: Props) {
  const router = useRouter();

  return (
    <div onClick={(e) => {
      const classList = (e.target as HTMLDivElement).classList;
      
      if(classList.length === 1 && classList[0] === 'modal-background') router.push("/")
      
    }} className='modal-background'>
        {children}
    </div>
  )
}
