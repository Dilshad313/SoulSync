export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

export async function apiGet(path){
  const res = await fetch(`${API_BASE}${path}`)
  if(!res.ok) throw new Error('Request failed')
  return res.json()
}
