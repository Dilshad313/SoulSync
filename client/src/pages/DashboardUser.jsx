import React from 'react'

export default function DashboardUser(){
  return (
    <div className="flex h-screen">
      <aside className="flex h-full w-72 flex-col bg-background-light dark:bg-background-dark p-4">
        <div className="flex items-center gap-3 p-2">
          <div className="h-12 w-12 rounded-full bg-cover bg-center" style={{backgroundImage:'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAXe7kNR6n4GvVhQUGCNmXf7Gj_hDoR6GGpWTvyNAxF_Wh3Egfd9DucH2mSsOShDB5ZrSFx7pnvcQPUZkT1QynNbKnwp3mXeHNBboSn7bAv8d2_n-ejN8-JK-cT9k9ynqfqu7FUUFIn-DY1cfbwG_3PRtKuJY8ND6hxCtLOI0TnHZfk90Obhhiyf9yODZnEeAEH3J1-7SyknJ6pVVaYVy2iTC-MH1x8hhMYl7PjigdC77QUzv2Cfrs4Innnrd25USb1IwPIL1Wp-e0")'}}/>
          <div>
            <h1 className="font-bold text-gray-900 dark:text-white">Sophia Carter</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Personalized Wellness</p>
          </div>
        </div>
        <nav className="mt-8 flex flex-col gap-2">
          <a className="flex items-center gap-3 rounded-lg bg-primary/10 px-4 py-3 text-primary dark:bg-primary/20" href="#">
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,0-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"/></svg>
            <span className="font-medium">Home</span>
          </a>
          <a className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800" href="#">
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"/></svg>
            <span className="font-medium">Journal</span>
          </a>
          <a className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800" href="#">
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"/></svg>
            <span className="font-medium">Chat</span>
          </a>
          <a className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800" href="#">
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z"/></svg>
            <span className="font-medium">Appointments</span>
          </a>
          <a className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800" href="#">
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,16V161.57l-51.77-32.35a8,8,0,0,0-8.48,0L72,161.56V48ZM132.23,177.22a8,8,0,0,0-8.48,0L72,209.57V180.43l56-35,56,35v29.14Z"/></svg>
            <span className="font-medium">Resources</span>
          </a>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Welcome, Sophia</h1>
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Today's Focus</h2>
          <div className="mt-4 flex items-center gap-8 rounded-xl bg-white p-6 dark:bg-gray-800">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">AI-Powered Journaling</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-300">Reflect on your day with guided prompts and AI insights.</p>
              <button className="mt-4 rounded-lg bg-primary/20 px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary/30 dark:bg-primary/30 dark:hover:bg-primary/40">Start Journaling</button>
            </div>
            <div className="h-40 w-64 flex-shrink-0 rounded-lg bg-cover bg-center" style={{backgroundImage:'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBCV5e8ot_bGQbKfZixT1FO1ZEKBOiEB2za9Twzeg6fV3456Gws8FYK41sFNYwaloEceP1-Ct-LoAZ1civGTva4_12BkzXscDrLxe1OgXrdKMc8eNSmKtM2UYB0AgButd8uigW-TscYsR_YBIJqcCi3q0rcDwK3tBNKd2KbjKrL4QRpmmFqYeQ38GJ8jwgdZqyJdakFahBHl8Qsg3WOxXzIzwPXDJNstgt4cooQlXGMwBjSuppu3XFGh-5BC9PW43uC9HzVUaG-xmU")'}}/>
          </div>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Quick Actions</h2>
          <div className="mt-4 flex gap-4">
            <button className="flex-1 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-primary/90">Chat with AI</button>
            <button className="flex-1 rounded-lg bg-white px-5 py-3 text-sm font-bold text-gray-800 shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">Book Appointment</button>
          </div>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Resources</h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[{
              title:'Mental Health Tips',img:'https://lh3.googleusercontent.com/aida-public/AB6AXuDmyNL3q3RD-cDrJw0vIHjz1bV_gGydiLdbv5gt1ocVEyj95R_3yMqIr86BB4nzKoF17JkMd418k2EffpilszusTvKqDPQL34zRLdGm4MANxwc6gN5WZgJ48Su621KO_eyuxAQPTwvWumJCtUfiuqzDCKX0ufnjkuWgHa1Z-8ZrbHEP2vrUb4Z8riCxmeF9ZVvJBdQdpMgdHnMNzv5TqUWDi8bprUZr-5IY_M7K4IXZcTJzZLpUbze8xwM2vAa1-HpR1_2SzTF4YO4'},
              {title:'Mindfulness Exercises',img:'https://lh3.googleusercontent.com/aida-public/AB6AXuDX65i8sv3nyed2v81FVrVhJiYKJYNj3Gak-drXuXxo1GEZoHZnMm4jY3n27qmD6yBYt_2wc8YCEKsExFlmm_3s9aiV08xD_aULxRml6ESj8mBDVswhb9u4se8LjxfBW3aajQFcO77CguqCuSMu6IPps7rL0pRoBE25VCn_4eYieqlNXsnQspLI2OUBhNlRadsQPE4Cx64DupuL4VWtSdJYRWXuSu3_kNZqfsHsDo0IJVRPOzi_ylperXaYV1Le_s9fb-x4o0SF710'},
              {title:'Stress Management Techniques',img:'https://lh3.googleusercontent.com/aida-public/AB6AXuBKOAJ5SK98kjeUxcNuGR1_y8AyY2704_9ksQkrdx_ypf9IIrLogP0FfdOarpXkkR5Ry0DjxaQLEUjOzGbw_-RET0b_zXV1QB_CmNiKtL5GtaPoCGFw1WGVjdoKGrhiw7EgAUidLuN89fvQOGGFBP5uszKefkhcGcGd53RFmXgaAJNHv9rPafbT-wlM2aUB5AxwnjjQn7YwDH9Ix8Z8Eu8fFEm6xzaP-Kg8ShomygyZUieo540nei8QF4HHkfyM8dHQFwKsNdcT4F4'}
            ].map((c,i)=> (
              <div key={i} className="rounded-lg bg-white p-4 dark:bg-gray-800">
                <div className="aspect-square w-full rounded-lg bg-cover bg-center" style={{backgroundImage:`url(${c.img})`}}/>
                <h3 className="mt-4 font-bold text-gray-900 dark:text-white">{c.title}</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{i===0? 'Explore tips for improving your mental well-being.': i===1? 'Practice mindfulness with guided exercises.' : 'Learn effective techniques to manage stress.'}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
