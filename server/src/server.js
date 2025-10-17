import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRouter from './routes/auth.js'
import availabilityRouter from './routes/availability.js'
import appointmentsRouter from './routes/appointments.js'
import doctorsRouter from './routes/doctors.js'

dotenv.config()

const app = express()
app.use(helmet())
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*' }))
app.use(express.json({ limit: '1mb' }))
app.use(morgan('dev'))

// Mongo connection
const uri = process.env.MONGODB_URI
if (uri) {
  mongoose.connect(uri)
    .then(()=> console.log('MongoDB connected'))
    .catch((err)=> console.error('Mongo connection error:', err.message))
} else {
  console.warn('MONGODB_URI not set; API will run but DB calls will fail')
}

// Health route
app.get('/api/health', (req,res)=>{
  res.json({ ok: true, service: 'soulsync-api', ts: new Date().toISOString() })
})

// Routes
app.use('/api/auth', authRouter)
app.use('/api/availability', availabilityRouter)
app.use('/api/appointments', appointmentsRouter)
app.use('/api/doctors', doctorsRouter)

// Placeholder auth route (for later)
// (auth routes mounted above)

const port = process.env.PORT || 4000
app.listen(port, ()=> console.log(`API running on http://localhost:${port}`))
