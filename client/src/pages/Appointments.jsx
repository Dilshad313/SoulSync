import React from 'react'

export default function Appointments(){
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">My Appointments</h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Today</h3>
            <div className="bg-white dark:bg-background-dark/50 rounded-lg shadow-sm p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">📹</div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-white">Video Consultation</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Dr. Emily Carter · 10:00 AM - 11:00 AM</p>
                </div>
              </div>
              <button className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary/90 text-sm">Join</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
