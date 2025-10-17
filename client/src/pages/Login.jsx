import React from 'react'

export default function Login(){
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-xl bg-white dark:bg-[#0f1a20] shadow">
        <div className="hidden lg:block bg-cover bg-center" style={{backgroundImage:'url(https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1470&auto=format&fit=crop)'}} aria-hidden/>
        <div className="p-8 sm:p-10">
          <div className="mb-8">
            <div className="flex items-center gap-3 text-slate-900 dark:text-white">
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M24 4H6V30.6667H24V44H42V17.3333H24V4Z" fill="currentColor"/></svg>
              <h1 className="text-2xl font-bold">Mindful Health</h1>
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Welcome back. Please sign in to continue.</p>
          </div>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
              <input type="email" className="mt-1 form-input w-full rounded-lg border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark text-slate-900 dark:text-white focus:ring-primary focus:border-primary" placeholder="you@example.com"/>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                <a href="#" className="text-xs font-medium text-primary hover:underline">Forgot password?</a>
              </div>
              <input type="password" className="mt-1 form-input w-full rounded-lg border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark text-slate-900 dark:text-white focus:ring-primary focus:border-primary" placeholder="••••••••"/>
            </div>
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"><input type="checkbox" className="rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary"/> Remember me</label>
            </div>
            <button type="button" className="w-full rounded-lg bg-primary py-2.5 text-white font-bold shadow hover:bg-primary/90">Sign in</button>
          </form>
          <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">New here? <a href="#" className="font-semibold text-primary hover:underline">Create an account</a></p>
          <div className="mt-8">
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Security</p>
            <ul className="mt-2 space-y-1 text-xs text-slate-500 dark:text-slate-400">
              <li>• End-to-end encrypted video sessions</li>
              <li>• HIPAA-aware data practices</li>
              <li>• Consent-first approach</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
