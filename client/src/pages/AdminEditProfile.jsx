import React from 'react'

export default function AdminEditProfile(){
  return (
    <div className="flex h-full min-h-screen w-full bg-background-light dark:bg-background-dark font-display text-neutral-800 dark:text-neutral-200">
      <aside className="w-64 flex-col bg-background-light dark:bg-background-dark p-4 border-r border-neutral-200 dark:border-neutral-800 hidden lg:flex">
        <div className="flex items-center gap-3 p-4">
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12" style={{backgroundImage:'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAdfg3ZzT4XymS0EC7WFsVCC0L6VGR5Qh1TwRD1TJZpJQ0lZO-ci7VbqfVSNunNmg4dPqOWN3yoGXlOQCZt-FMZW8ZKzkq-yJn_9wOcnxAAPDAVZHVBVLa9Mf4fad6LlbVljAQYUFO59aZ8ueySFzsq3VFhAYNtzohG4wiYV1Jz6L-_bbwjjpujG7zBs8lklJen3UIioAyQ3NfM-kMjtF1pworKMmzWhB7St7jCSisYJyD6b4zvULcMAscpZrKzw_QD2r17hQPfeyU")'}}/>
          <div className="flex flex-col">
            <h1 className="text-base font-bold text-neutral-900 dark:text-white">Wellness Center</h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Admin</p>
          </div>
        </div>
        <nav className="mt-8 flex flex-col gap-2">
          <a className="flex items-center gap-3 px-4 py-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary" href="#">
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"/></svg>
            <span className="text-sm font-medium">Dashboard</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary" href="#">
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"/></svg>
            <span className="text-sm font-medium">Patients</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary" href="#">
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z"/></svg>
            <span className="text-sm font-medium">Appointments</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary" href="#">
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M230.93,220a8,8,0,0,1-6.93,4H32a8,8,0,0,1-6.92-12c15.23-26.33,38.7-45.21,66.09-54.16a72,72,0,1,1,73.66,0c27.39,8.95,50.86,27.83,66.09,54.16A8,8,0,0,1,230.93,220Z"/></svg>
            <span className="text-sm font-bold">Profile</span>
          </a>
        </nav>
      </aside>
      <main className="flex-1 p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Edit Profile</h1>
          <div className="mt-8 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2"><span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Center Name</span><input className="form-input w-full rounded-lg border-neutral-300 dark:border-neutral-700 bg-background-light dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-primary focus:border-primary placeholder:text-neutral-400 dark:placeholder:text-neutral-500" placeholder="e.g. Serenity Wellness" type="text"/></label>
                <label className="flex flex-col gap-2"><span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Contact Email</span><input className="form-input w-full rounded-lg border-neutral-300 dark:border-neutral-700 bg-background-light dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-primary focus:border-primary placeholder:text-neutral-400 dark:placeholder:text-neutral-500" placeholder="contact@serenity.com" type="email"/></label>
                <label className="flex flex-col gap-2"><span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Phone Number</span><input className="form-input w-full rounded-lg border-neutral-300 dark:border-neutral-700 bg-background-light dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-primary focus:border-primary placeholder:text-neutral-400 dark:placeholder:text-neutral-500" placeholder="(123) 456-7890" type="tel"/></label>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Location</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2 md:col-span-2"><span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Address</span><input className="form-input w-full rounded-lg border-neutral-300 dark:border-neutral-700 bg-background-light dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-primary focus:border-primary placeholder:text-neutral-400 dark:placeholder:text-neutral-500" placeholder="123 Tranquil Lane" type="text"/></label>
                <label className="flex flex-col gap-2"><span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">City</span><input className="form-input w-full rounded-lg border-neutral-300 dark:border-neutral-700 bg-background-light dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-primary focus:border-primary placeholder:text-neutral-400 dark:placeholder:text-neutral-500" placeholder="Mindful City" type="text"/></label>
                <label className="flex flex-col gap-2"><span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">State</span><input className="form-input w-full rounded-lg border-neutral-300 dark:border-neutral-700 bg-background-light dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-primary focus:border-primary placeholder:text-neutral-400 dark:placeholder:text-neutral-500" placeholder="Calmfornia" type="text"/></label>
                <label className="flex flex-col gap-2"><span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Zip Code</span><input className="form-input w-full rounded-lg border-neutral-300 dark:border-neutral-700 bg-background-light dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-primary focus:border-primary placeholder:text-neutral-400 dark:placeholder:text-neutral-500" placeholder="98765" type="text"/></label>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Services Offered</h2>
              <label className="flex flex-col gap-2"><span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Description of Services</span><textarea className="form-textarea w-full rounded-lg border-neutral-300 dark:border-neutral-700 bg-background-light dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-primary focus:border-primary placeholder:text-neutral-400 dark:placeholder:text-neutral-500" rows="4" placeholder="Describe the wellness services your center provides..."></textarea></label>
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Affiliated Doctors</h2>
              <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-neutral-100 dark:bg-neutral-800">
                      <tr>
                        <th className="p-4 text-sm font-bold text-neutral-700 dark:text-neutral-200">Name</th>
                        <th className="p-4 text-sm font-bold text-neutral-700 dark:text-neutral-200">Specialty</th>
                        <th className="p-4 text-sm font-bold text-neutral-700 dark:text-neutral-200">License Number</th>
                        <th className="p-4 text-sm font-bold text-neutral-700 dark:text-neutral-200 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                      <tr className="bg-background-light dark:bg-background-dark">
                        <td className="p-4 text-sm font-medium text-neutral-800 dark:text-neutral-100">Dr. Amelia Hayes</td>
                        <td className="p-4 text-sm text-neutral-600 dark:text-neutral-300">Psychiatry</td>
                        <td className="p-4 text-sm text-neutral-600 dark:text-neutral-300">123456</td>
                        <td className="p-4 text-right"><button className="font-medium text-primary hover:underline">Edit</button></td>
                      </tr>
                      <tr className="bg-background-light dark:bg-background-dark">
                        <td className="p-4 text-sm font-medium text-neutral-800 dark:text-neutral-100">Dr. Ethan Carter</td>
                        <td className="p-4 text-sm text-neutral-600 dark:text-neutral-300">Clinical Psychology</td>
                        <td className="p-4 text-sm text-neutral-600 dark:text-neutral-300">789012</td>
                        <td className="p-4 text-right"><button className="font-medium text-primary hover:underline">Edit</button></td>
                      </tr>
                      <tr className="bg-background-light dark:bg-background-dark">
                        <td className="p-4 text-sm font-medium text-neutral-800 dark:text-neutral-100">Dr. Olivia Bennett</td>
                        <td className="p-4 text-sm text-neutral-600 dark:text-neutral-300">Counseling</td>
                        <td className="p-4 text-sm text-neutral-600 dark:text-neutral-300">345678</td>
                        <td className="p-4 text-right"><button className="font-medium text-primary hover:underline">Edit</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-4"><button className="px-4 py-2 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary font-bold text-sm hover:bg-primary/20 dark:hover:bg-primary/30">Add Doctor</button></div>
            </div>
            <div className="flex justify-end pt-8 border-t border-neutral-200 dark:border-neutral-700">
              <button className="px-6 py-3 rounded-lg bg-primary text-white font-bold text-sm shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background-light dark:focus:ring-offset-background-dark">Save Changes</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
