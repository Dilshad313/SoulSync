import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Layout/Navbar'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
