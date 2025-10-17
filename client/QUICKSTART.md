# SoulSync Frontend - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
cd client
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Visit: **http://localhost:5173**

### 3. Test the Application

#### Login with Demo Accounts:
- **User**: `user@demo.com` / `password123`
- **Doctor**: `doctor@demo.com` / `password123`
- **Admin**: `admin@demo.com` / `password123`

## 📍 Available Routes

### Public Routes
- `/` - Landing page
- `/login` - Login page
- `/register` - Registration page

### User Routes (Login as user@demo.com)
- `/user/dashboard` - User dashboard with stats
- `/user/journal` - AI-powered journaling
- `/user/chatbot` - 24/7 AI therapy buddy
- `/user/assessment` - Mental health assessments
- `/user/find-care` - Browse and book doctors
- `/user/appointments` - Manage appointments

### Doctor Routes (Login as doctor@demo.com)
- `/doctor/dashboard` - Doctor dashboard

## 🎨 Component Library

### Import Components
```jsx
import Button from './components/UI/Button'
import Card from './components/UI/Card'
import Input from './components/UI/Input'
import Modal from './components/UI/Modal'
import Badge from './components/UI/Badge'
```

### Usage Examples

#### Button
```jsx
<Button variant="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>
```

#### Card
```jsx
<Card hover>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Your content here
  </CardContent>
</Card>
```

#### Input
```jsx
<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>
```

## 🔧 Key Features to Test

### 1. User Dashboard
- View mood tracking
- See upcoming appointments
- Check recent journal entries

### 2. AI Journal
- Create a new journal entry
- Click "Analyze Now" for AI sentiment analysis
- View mood distribution and insights

### 3. AI Chatbot
- Start a conversation
- Try quick prompts
- See typing indicators

### 4. Assessments
- Take PHQ-9 or GAD-7 assessment
- Complete all questions
- View AI-powered results

### 5. Find Care
- Browse doctor listings
- Use filters (search, specialization, type)
- Book an appointment

### 6. Appointments
- View upcoming appointments
- Switch between tabs (Upcoming/Completed/Cancelled)
- Try "Join Video Call" button

## 🎯 Next Steps for Development

### Connect to Backend API
Replace mock data with real API calls in:
- `src/context/AuthContext.jsx`
- `src/pages/user/*.jsx`
- `src/pages/doctor/*.jsx`

### Add Environment Variables
Create `.env` file:
```env
VITE_API_URL=http://localhost:4000/api
VITE_GEMINI_API_KEY=your_key_here
```

### Implement Remaining Modules
- Hospital Module
- Admin Module
- Doctor Availability Management
- Video Consultation Integration

## 📦 Build for Production

```bash
npm run build
```

Output will be in `dist/` folder.

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
```

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Tailwind Not Working
```bash
# Rebuild Tailwind
npm run dev
```

## 📚 Documentation

- Full implementation details: `../FRONTEND_IMPLEMENTATION.md`
- Tailwind CSS: https://tailwindcss.com/docs
- React Router: https://reactrouter.com/

## 💡 Tips

1. **Dark Mode**: Toggle in browser DevTools or system preferences
2. **Responsive**: Test on mobile by resizing browser
3. **Components**: All reusable components are in `src/components/UI`
4. **Mock Data**: Currently using mock data - replace with API calls
5. **Authentication**: Stored in localStorage - check Application tab in DevTools

## 🎨 Color Palette

- **Primary**: Teal (#13a4ec) to Blue gradient
- **Success**: Green
- **Warning**: Yellow
- **Danger**: Red
- **Info**: Blue

## 📞 Support

For issues or questions, check:
1. Console for errors (F12)
2. Network tab for API calls
3. React DevTools for component state

---

Happy coding! 🚀
