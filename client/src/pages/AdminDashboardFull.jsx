import React from 'react'

export default function AdminDashboardFull(){
  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark font-display text-text-primary-light dark:text-text-primary-dark">
      <aside className="flex w-64 flex-col bg-white dark:bg-[#1a2830] p-4">
        <div className="flex flex-col gap-4">
          <div className="p-2">
            <h1 className="text-xl font-bold">Mindful Health</h1>
            <p className="text-sm text-[#4c809a] dark:text-[#a3b1b9]">Admin Panel</p>
          </div>
          <nav className="flex flex-col gap-2">
            <a className="flex items-center gap-3 rounded-lg bg-primary/10 dark:bg-primary/20 px-3 py-2 text-primary" href="#">
              <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,0-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"/></svg>
              <span className="text-sm font-medium">Dashboard</span>
            </a>
            <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#4c809a] dark:text-[#a3b1b9] hover:bg-primary/5 dark:hover:bg-primary/10 hover:text-[#0d171b] dark:hover:text-white" href="#">
              <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"/></svg>
              <span className="text-sm font-medium">Doctors</span>
            </a>
            <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#4c809a] dark:text-[#a3b1b9] hover:bg-primary/5 dark:hover:bg-primary/10 hover:text-[#0d171b] dark:hover:text-white" href="#">
              <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M216,88H168V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V88H40a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16H88v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V168h48a16,16,0,0,0,16-16V104A16,16,0,0,0,216,88Zm0,64H160a8,8,0,0,0-8,8v56H104V160a8,8,0,0,0-8-8H40V104H96a8,8,0,0,0,8-8V40h48V96a8,8,0,0,0,8,8h56Z"/></svg>
              <span className="text-sm font-medium">Hospitals</span>
            </a>
            <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#4c809a] dark:text-[#a3b1b9] hover:bg-primary/5 dark:hover:bg-primary/10 hover:text-[#0d171b] dark:hover:text-white" href="#">
              <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"/></svg>
              <span className="text-sm font-medium">Content</span>
            </a>
          </nav>
        </div>
        <div className="mt-auto">
          <a className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#4c809a] dark:text-[#a3b1b9] hover:bg-primary/5 dark:hover:bg-primary/10 hover:text-[#0d171b] dark:hover:text-white" href="#">
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"/></svg>
            <span className="text-sm font-medium">Settings</span>
          </a>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          </header>
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-white dark:bg-[#1a2830] p-6 shadow">
              <p className="text-base font-medium text-[#4c809a] dark:text-[#a3b1b9]">Total Users</p>
              <p className="text-3xl font-bold tracking-tight">12,345</p>
            </div>
            <div className="rounded-xl bg-white dark:bg-[#1a2830] p-6 shadow">
              <p className="text-base font-medium text-[#4c809a] dark:text-[#a3b1b9]">Active Doctors</p>
              <p className="text-3xl font-bold tracking-tight">250</p>
            </div>
            <div className="rounded-xl bg-white dark:bg-[#1a2830] p-6 shadow">
              <p className="text-base font-medium text-[#4c809a] dark:text-[#a3b1b9]">Hospitals</p>
              <p className="text-3xl font-bold tracking-tight">50</p>
            </div>
          </section>
          <section className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight">Top Requested Resources</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-[#e7eff3] dark:border-[#2a3b47] bg-white dark:bg-[#1a2830]">
              <table className="w-full">
                <thead className="bg-background-light dark:bg-background-dark">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#4c809a] dark:text-[#a3b1b9]">Resource</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#4c809a] dark:text-[#a3b1b9]">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#4c809a] dark:text-[#a3b1b9]">Requests</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7eff3] dark:divide-[#2a3b47]">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Stress Management Guide</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4c809a] dark:text-[#a3b1b9]">Self-Help</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4c809a] dark:text-[#a3b1b9]">3,200</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Anxiety Relief Techniques</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4c809a] dark:text-[#a3b1b9]">Therapy</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4c809a] dark:text-[#a3b1b9]">2,800</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Mindfulness Meditation</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4c809a] dark:text-[#a3b1b9]">Wellness</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4c809a] dark:text-[#a3b1b9]">2,500</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Sleep Improvement Tips</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4c809a] dark:text-[#a3b1b9]">Self-Help</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4c809a] dark:text-[#a3b1b9]">2,100</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Coping with Depression</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4c809a] dark:text-[#a3b1b9]">Therapy</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4c809a] dark:text-[#a3b1b9]">1,800</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
