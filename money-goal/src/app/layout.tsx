"use client"
import { Metadata } from 'next'
import { useState, useEffect } from 'react'

export const metadata: Metadata = {
  title: 'MoneyGoal',
  description: 'An app used to save you progress',
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [day, setDay] = useState<string>('Monday')
  const [time, setTime] = useState<string>("00:00")

  function updateTime() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date();

    setInterval(() => {
      let hour = date.getHours().toString().padStart(2, "0");
      let minutes = date.getMinutes().toString().padStart(2, "0");

      setTime(`${hour}:${minutes}`)
    }, 1000)

    setDay(days[ date.getDay() ]);
  }
  
  useEffect(() => {
    updateTime()
  }, [])
  
  
  return (
    <html lang="en">
      <body>

          <header className="navbar">
              <h2 className="m2 navbar-day">{day}</h2>
              <p className="m3 navbar-time">{time}</p>
          </header>

          {children}
        </body>
    </html>
  )
}
