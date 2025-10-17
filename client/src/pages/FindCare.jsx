import React from 'react'

export default function FindCare(){
  return (
    <div className="flex justify-center py-8 lg:py-12">
      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
              <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
            </div>
            <input className="form-input h-14 w-full rounded-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark/50 pl-14 pr-4 text-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary" placeholder="Search for doctors, hospitals, or services"/>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white px-4 pb-4">Available Doctors</h2>
        <div className="grid grid-cols-1 gap-6">
          {[1,2,3].map(i=> (
            <div key={i} className="flex items-center gap-6 rounded-lg bg-white dark:bg-background-dark/50 p-4 shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="w-32 h-32 rounded-lg bg-cover bg-center flex-shrink-0" style={{backgroundImage:'url(https://lh3.googleusercontent.com/aida-public/AB6AXuCQrn0VyIRLMxAE9n5nxWXfjZKoKDkuy7bt9X524KjXbrpC7oKwIPLRGS2EkjE_XkfsVad0-LhLgd9oan2uQ_Oyx1_gp4nzt-dZJXv_jgvhRtTHjRSc8kVWyqhLW9iVptQy7OMq12Cb9xs_9_MCP2cfnBPAf8ZMsOqdf0u3H9uriaUjTP8BDFGqDv1USgvbCyCKQya3MHWcLBmrat6OHhtyRTXgPaLkb_Y7aEyLKYtQso2WfBEJqh-BWdI0BN6lyKRH3n2loGxxNts)'}}/>
              <div className="flex flex-col gap-2 flex-grow">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Dr. Example {i}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Specialty | {10+i} years experience</p>
                <p className="text-sm text-slate-500 dark:text-slate-400"><span className="font-semibold text-green-600 dark:text-green-400">Available Today</span> • Next slot: 2:30 PM</p>
                <div className="mt-2">
                  <button className="rounded-full h-9 px-5 bg-primary/10 dark:bg-primary/20 text-primary text-sm font-bold hover:bg-primary/20 dark:hover:bg-primary/30">View Availability</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
