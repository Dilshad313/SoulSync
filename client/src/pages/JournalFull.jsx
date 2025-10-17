import React from 'react'

export default function JournalFull(){
  return (
    <div className="flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200">
      <header className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 px-10 py-4">
        <div className="flex items-center gap-3 text-slate-900 dark:text-white">
          <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" opacity="0.3"></path><path d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819Z" fill="currentColor"></path><path d="M9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487Z" fill="currentColor"></path><path d="M27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263Z" fill="currentColor"></path></svg>
          <h1 className="text-xl font-bold">MindfulMe</h1>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors" href="#">Home</a>
          <a className="text-sm font-medium text-primary" href="#">Journal</a>
          <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors" href="#">Community</a>
          <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors" href="#">Resources</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center rounded-full h-10 w-10 bg-slate-200/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-primary/20 dark:hover:bg-primary/30 hover:text-primary transition-colors">🔔</button>
          <div className="h-10 w-10 rounded-full bg-cover bg-center" style={{backgroundImage:'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAnasW1EufRmEkdWuzo-T97ez-Is2SwHxf3n5ZvUaL6Q5Yl-FAo8QcPnJEvjBk99NfbiH5bFKokTXAsGFcXBOMgzc5nkAho9_84HiuLAOIdJT3BltbqHHi_njPIDW4Kd2FPpoPC9V_8ILHcQ_52qVuhv_M1lXer-pGPNhxCegdPd2SS1VwLELjPYOPMT9Yuv6WoJELSpTQOk8arqNzi8O28LFWC4BveczOogR8zI-mxHOYB0otIhgSWRC66IaCw1icr8ORUFl9NFX4")'}}/>
        </div>
      </header>
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Daily Journal</h2>
              <p className="mt-2 text-base text-slate-500 dark:text-slate-400">Reflect on your day and track your emotional well-being.</p>
            </div>
            <div className="space-y-6">
              <textarea className="w-full min-h-[140px] resize-y rounded-lg border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark focus:border-primary focus:ring-primary placeholder:text-slate-400 dark:placeholder:text-slate-500 p-4 text-base" placeholder="How are you feeling today?"></textarea>
              <div className="flex justify-end">
                <button className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark">Save Entry</button>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Recent Sentiment Analysis</h3>
              <div className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Mood Trend (Last 7 Days)</p>
                    <p className="text-4xl font-bold text-slate-800 dark:text-slate-100 mt-1">Neutral</p>
                    <div className="mt-2 flex items-center gap-2">
                      <p className="text-sm text-slate-500 dark:text-slate-400">vs. Previous Week</p>
                      <p className="text-sm font-medium text-green-500">+2%</p>
                    </div>
                  </div>
                  <div className="w-full flex-1 md:max-w-md">
                    <div className="relative h-40">
                      <svg fill="none" height="100%" preserveAspectRatio="none" viewBox="0 0 472 150" width="100%" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="var(--tw-stroke-primary)" strokeLinecap="round" strokeWidth="2"></path>
                        <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V150H0V109Z" fill="url(#paint0_linear_chart)"></path>
                        <defs>
                          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_chart" x1="236" x2="236" y1="1" y2="149">
                            <stop stopColor="var(--tw-stop-color-primary)" stopOpacity="0.2"></stop>
                            <stop offset="1" stopColor="var(--tw-stop-color-primary)" stopOpacity="0"></stop>
                          </linearGradient>
                        </defs>
                        <style>{`:root { --tw-stroke-primary: #13a4ec; --tw-stop-color-primary: #13a4ec; }`}</style>
                      </svg>
                    </div>
                    <div className="mt-2 flex justify-between text-xs font-semibold text-slate-400 dark:text-slate-500">
                      <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Personalized Recommendations</h3>
              <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-1">
                {[{
                  title:'Practice Mindfulness', body:'Engage in a 5-minute guided meditation to reduce stress and improve focus.', img:'https://lh3.googleusercontent.com/aida-public/AB6AXuCGiaUmlvTFWzo5xW0OSgOhvjZzRb995-4AUZxwl5vqX-gl3HbeqWa02_dn4LVLk8BmlaUokzzKFy-DUE7ImvknQF2ih-Df0Zsaq9cKPkFxf_O0VpTTgLF03RZyZNBaeZl1rOYw62lraVXWbXD0Rtokj9XKKBI1QG2k2tkPBPJZhWRvyIfOBh8IonFlgtBuufpG4JYdjmWQ_M4JxW5wKcCmLNSNGNc48jQ-AXo0uMRDRohFZrKPRdtRPbvHBVYEjXKRX5fv8Y5YYAs'},
                  {title:'Connect with Others', body:'Join a support group focused on managing daily stress and building resilience.', img:'https://lh3.googleusercontent.com/aida-public/AB6AXuB0YzsZkinF7lbhBnmBqiku9HQPu795lf2BGYgj59DyikWMVDboyt425SHajVntAsj5bmgcQ0pnfEBLJ36cW0P96-uQuLSv_3f8JFN2dY9huYfG0lJ7nen1iRH0SrB_N96tRjtXiR0X_zVEX0cONUu_BZ09DrgsvEwjAy4g2rXaWaM09iOvkh4r2G_Y463aY6FlCgWy8aFbdgLFSm-9aGwoEAUshoVJ7djkMoZ-be5zvZ4l8_hGwNZyC3ggH-W6P7boTuBTWuAl9lc'},
                  {title:'Learn Coping Strategies', body:'Explore articles and resources on effective techniques for managing anxiety.', img:'https://lh3.googleusercontent.com/aida-public/AB6AXuB_zP9md2mvZS84jJiiGMdyWNlO8TG49uT8NjgBFYRqhk6Sl4rL1Yl9n4eaVsxnAsfEJ6oXvdXazFCRL5ytZIU82ffu07wN08zqiuCAjnU80RhFbkAM1XBCJ8tUHTKQDQfq8htthmeKY1Je8ioPatkjVNnsOOPNbO-dU7urUSeCshq3u707Bb-5M13TUG_XU73YduTV3_AiKEsfdIQ8n10D5SlrMX_Udme23B8vfnaTq1Cqm2NXuaST4phLrGFKcnOJTEXjZEGZIr0'}
                ].map((r,i)=> (
                  <div key={i} className="flex flex-col sm:flex-row items-stretch gap-6 rounded-lg bg-white/50 dark:bg-slate-900/50 p-4 border border-slate-200/80 dark:border-slate-800/80">
                    <div className="flex-shrink-0 sm:w-48">
                      <div className="aspect-video w-full h-full bg-cover bg-center rounded" style={{backgroundImage:`url(${r.img})`}}/>
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <h4 className="font-bold text-slate-800 dark:text-slate-100">{r.title}</h4>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{r.body}</p>
                      <button className="mt-4 w-fit rounded bg-primary/20 dark:bg-primary/30 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/30 dark:hover:bg-primary/40 transition-colors">{i===0? 'Start Now': i===1? 'Find a Group':'Explore Resources'}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
