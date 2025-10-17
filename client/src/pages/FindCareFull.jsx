import React from 'react'

export default function FindCareFull(){
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200">
      <div className="flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 px-10 py-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 text-slate-900 dark:text-white">
              <div className="size-6 text-primary">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"/></svg>
              </div>
              <h2 className="text-xl font-bold">Mindful Health</h2>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors" href="#">Home</a>
              <a className="text-sm font-bold text-primary" href="#">Find Care</a>
              <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors" href="#">Resources</a>
              <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors" href="#">Support</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex relative items-center">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 dark:text-slate-500">
                <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/></svg>
              </div>
              <input className="form-input h-10 w-48 rounded-full border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark pl-10 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-primary focus:border-primary" placeholder="Search" type="search"/>
            </div>
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-primary text-white text-sm font-bold shadow-md hover:bg-primary/90 transition-colors"><span className="truncate">Book Now</span></button>
            <div className="size-10 rounded-full bg-cover bg-center" style={{backgroundImage:'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAFSuP4c3pNIf_scHXapFY_cuizDzHT-FOFOfBcST9VbUFTMSaBAZHab1NuEXBXXliUHnhVboQ9YJpue9LjqYEjzcnaPMX2ERQSDXdQ0Kls1As0FkBszgtfWmcj3jPPsMcDazv4fOghG_ngkgYnXWyiSS8qddQHasJsmhrlhd2QqdQiyuPFk8j95ED1LnPkTG1Z7yr8NcMuD_xTUkhH2p8UpM24zM-XkYATzo3zbprLdfpiiiNbJgPR99cNc9Xm-VWn53XUhvCj61I")'}}/>
          </div>
        </header>
        <main className="flex flex-1 justify-center py-8 lg:py-12">
          <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
                  <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/></svg>
                </div>
                <input className="form-input h-14 w-full rounded-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark/50 pl-14 pr-4 text-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary" placeholder="Search for doctors, hospitals, or services"/>
              </div>
            </div>
            <div className="mb-8">
              <div className="border-b border-slate-200 dark:border-slate-800">
                <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                  <a className="border-primary text-primary whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm" href="#">Video Consultations</a>
                  <a className="border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" href="#">In-Person Consultations</a>
                </nav>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white px-4 pb-4">Available Doctors</h2>
            <div className="grid grid-cols-1 gap-6">
              {[1,2,3].map((i)=> (
                <div key={i} className="flex items-center gap-6 rounded-lg bg-white dark:bg-background-dark/50 p-4 shadow-sm border border-slate-100 dark:border-slate-800">
                  <div className="w-32 h-32 rounded-lg bg-cover bg-center flex-shrink-0" style={{backgroundImage:'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCQrn0VyIRLMxAE9n5nxWXfjZKoKDkuy7bt9X524KjXbrpC7oKwIPLRGS2EkjE_XkfsVad0-LhLgd9oan2uQ_Oyx1_gp4nzt-dZJXv_jgvhRtTHjRSc8kVWyqhLW9iVptQy7OMq12Cb9xs_9_MCP2cfnBPAf8ZMsOqdf0u3H9uriaUjTP8BDFGqDv1USgvbCyCKQya3MHWcLBmrat6OHhtyRTXgPaLkb_Y7aEyLKYtQso2WfBEJqh-BWdI0BN6lyKRH3n2loGxxNts")'}}/>
                  <div className="flex flex-col gap-2 flex-grow">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Dr. Example {i}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Specialty | {10+i} years experience</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400"><span className="font-semibold text-green-600 dark:text-green-400">Available Today</span> • Next slot: 2:30 PM</p>
                    <div className="mt-2">
                      <button className="flex items-center justify-center rounded-full h-9 px-5 bg-primary/10 dark:bg-primary/20 text-primary text-sm font-bold hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"><span>View Availability</span></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <nav aria-label="Pagination" className="flex items-center justify-center p-4 mt-8">
              <a className="relative inline-flex items-center rounded-full px-2 py-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:z-20" href="#">
                <span className="sr-only">Previous</span>
                <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"/></svg>
              </a>
              <a aria-current="page" className="relative z-10 inline-flex items-center bg-primary text-white text-sm font-bold px-4 py-2 rounded-full" href="#">1</a>
              <a className="relative inline-flex items-center text-slate-700 dark:text-slate-300 text-sm font-medium px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full" href="#">2</a>
              <a className="relative hidden items-center text-slate-700 dark:text-slate-300 text-sm font-medium px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full md:inline-flex" href="#">3</a>
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300">...</span>
              <a className="relative hidden items-center text-slate-700 dark:text-slate-300 text-sm font-medium px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full md:inline-flex" href="#">10</a>
              <a className="relative inline-flex items-center rounded-full px-2 py-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:z-20" href="#">
                <span className="sr-only">Next</span>
                <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"/></svg>
              </a>
            </nav>
          </div>
        </main>
      </div>
    </div>
  )
}
