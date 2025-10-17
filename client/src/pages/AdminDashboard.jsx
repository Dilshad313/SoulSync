import React from 'react'

export default function AdminDashboard(){
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        <div className="rounded-xl bg-white dark:bg-slate-900 p-6 shadow">
          <p className="text-base font-medium text-slate-500">Total Users</p>
          <p className="text-3xl font-bold">12,345</p>
        </div>
        <div className="rounded-xl bg-white dark:bg-slate-900 p-6 shadow">
          <p className="text-base font-medium text-slate-500">Active Doctors</p>
          <p className="text-3xl font-bold">250</p>
        </div>
        <div className="rounded-xl bg-white dark:bg-slate-900 p-6 shadow">
          <p className="text-base font-medium text-slate-500">Hospitals</p>
          <p className="text-3xl font-bold">50</p>
        </div>
      </div>
    </div>
  )
}
