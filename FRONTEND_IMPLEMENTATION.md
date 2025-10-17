# SoulSync Frontend Implementation

## Overview
Complete frontend implementation for the SoulSync mental health and wellness platform using React, Tailwind CSS, and modern UI/UX practices.

## ✅ Completed Features

### 1. **Core Infrastructure**
- ✅ Authentication Context with JWT support
- ✅ Role-based routing (User, Doctor, Hospital, Admin)
- ✅ Responsive navigation with mobile menu
- ✅ Dark mode support throughout
- ✅ Reusable UI component library

### 2. **Shared Components** (`/src/components`)
- **Layout**
  - `Navbar.jsx` - Responsive navigation with role-based menus
  
- **UI Components**
  - `Button.jsx` - Multiple variants (primary, secondary, outline, danger, ghost, success)
  - `Card.jsx` - Card container with header, content, footer sections
  - `Input.jsx` - Text inputs, TextArea, Select with validation
  - `Modal.jsx` - Reusable modal dialogs
  - `Badge.jsx` - Status badges with color variants

### 3. **Authentication Module** (`/src/pages/auth`)
- ✅ **Login Page** - Email/password authentication with demo credentials
- ✅ **Register Page** - Multi-role registration (User, Doctor, Hospital)
  - Role-specific fields (specialization for doctors, hospital name, etc.)
  - Password validation
  - Terms acceptance

### 4. **User Module** (`/src/pages/user`) - COMPLETE
All features fully implemented with beautiful UI:

#### **User Dashboard** (`UserDashboard.jsx`)
- Quick stats cards (mood, journal entries, appointments, wellness score)
- Upcoming appointments list with video call links
- Recent journal entries preview
- Quick action buttons for all features
- AI-driven mood tracking

#### **AI-Powered Journal** (`Journal.jsx`)
- Create and view journal entries
- Mood selection with emojis
- **7-Day Sentiment Analysis** powered by Gemini AI
  - Mood distribution visualization
  - AI-generated insights
  - Personalized recommendations
- Individual entry AI insights
- Beautiful card-based layout

#### **AI Therapy Buddy** (`Chatbot.jsx`)
- Real-time chat interface with AI
- Typing indicators
- Quick prompt suggestions
- Message history
- Crisis support resources
- Educational content links
- Responsive chat bubbles

#### **Mental Health Assessments** (`Assessment.jsx`)
- **PHQ-9** (Depression screening)
- **GAD-7** (Anxiety assessment)
- **Perceived Stress Scale**
- Progress tracking during assessment
- AI-powered result analysis
- Severity classification
- Personalized recommendations
- Resource suggestions based on results

#### **Find Care** (`FindCare.jsx`)
- Browse verified doctors and therapists
- Advanced filtering:
  - Search by name/specialty
  - Filter by specialization
  - Filter by consultation type (video/in-person)
- Doctor profiles with:
  - Ratings and reviews
  - Experience and education
  - Languages spoken
  - Availability status
  - Consultation fees
- **Book Appointment Modal**:
  - Select consultation type
  - Choose date and time
  - Provide reason for visit
  - Instant booking confirmation

#### **My Appointments** (`UserAppointments.jsx`)
- Tabbed interface (Upcoming, Completed, Cancelled)
- Appointment cards with full details
- **Join Video Call** button (time-based activation)
- Cancel appointment functionality
- Appointment details modal
- Status badges
- Session summaries for completed appointments

### 5. **Doctor Module** (`/src/pages/doctor`)
#### **Doctor Dashboard** (`DoctorDashboard.jsx`)
- Practice statistics (today's appointments, pending requests, total patients)
- Today's schedule with patient details
- **Pending Appointment Requests**:
  - Accept/Reject functionality
  - Patient information
  - Requested date/time
- Quick actions (manage availability, view patients, edit profile)
- **Start Video Consultation** button for active sessions

### 6. **Design & UX**
- **Color Scheme**: Calming teal and blue gradients
- **Typography**: Clean, readable fonts
- **Spacing**: Generous whitespace for reduced cognitive load
- **Animations**: Subtle transitions and hover effects
- **Icons**: Inline SVG icons throughout
- **Responsive**: Mobile-first design, works on all screen sizes
- **Accessibility**: Proper contrast ratios, semantic HTML

### 7. **Landing Page** (`Home.jsx`)
- Hero section with gradient background
- Feature showcase (6 key features)
- Call-to-action sections
- Responsive grid layouts
- Dynamic content based on auth status

## 📁 Project Structure

```
client/src/
├── components/
│   ├── Layout/
│   │   └── Navbar.jsx
│   └── UI/
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── Input.jsx
│       ├── Modal.jsx
│       └── Badge.jsx
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── user/
│   │   ├── UserDashboard.jsx
│   │   ├── Journal.jsx
│   │   ├── Chatbot.jsx
│   │   ├── Assessment.jsx
│   │   ├── FindCare.jsx
│   │   └── UserAppointments.jsx
│   ├── doctor/
│   │   └── DoctorDashboard.jsx
│   └── Home.jsx
├── App.jsx
└── main.jsx
```

## 🎨 UI Component Examples

### Button Variants
```jsx
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outlined</Button>
<Button variant="danger">Delete</Button>
<Button variant="ghost">Subtle</Button>
<Button variant="success">Confirm</Button>
```

### Card Usage
```jsx
<Card hover>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
  <CardFooter>
    Footer actions
  </CardFooter>
</Card>
```

## 🔐 Authentication Flow

1. User visits `/login` or `/register`
2. Credentials submitted to backend API
3. JWT token and user data stored in localStorage
4. AuthContext provides user state globally
5. Navbar updates based on user role
6. Protected routes redirect based on role

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation
```bash
cd client
npm install
```

### Development
```bash
npm run dev
```
Access at: `http://localhost:5173`

### Demo Credentials
```
User:     user@demo.com / password123
Doctor:   doctor@demo.com / password123
Hospital: hospital@demo.com / password123
Admin:    admin@demo.com / password123
```

## 🔌 API Integration Points

All pages are ready for backend integration. API calls are structured as:

```javascript
const response = await fetch('/api/endpoint', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  },
  body: JSON.stringify(data)
});
```

### Key Endpoints Expected:
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `POST /api/journal/create` - Create journal entry
- `POST /api/journal/analyze-sentiment` - AI sentiment analysis
- `POST /api/chatbot/message` - AI chatbot interaction
- `POST /api/assessment/analyze` - Assessment result analysis
- `GET /api/doctors` - Fetch doctor listings
- `POST /api/appointments/book` - Book appointment
- `POST /api/appointments/{id}/accept` - Accept appointment (doctor)
- `POST /api/appointments/{id}/reject` - Reject appointment (doctor)

## 🎯 Key Features Highlights

### AI Integration (Google Gemini)
1. **Journal Sentiment Analysis**
   - Analyzes last 7 days of entries
   - Provides mood distribution
   - Generates insights and recommendations

2. **AI Chatbot**
   - Context-aware responses
   - Mental health guidance
   - Crisis detection capabilities

3. **Assessment Analysis**
   - Interprets standardized test results
   - Severity classification
   - Personalized action plans

### Video Conferencing (WebRTC)
- Secure session-based links
- Time-based access control (15 min before to 30 min after)
- Separate "Join" and "Start" buttons for users and doctors
- HIPAA-compliant design ready

### Appointment System
- Real-time availability checking
- Multiple consultation types (video/in-person)
- Automated notifications (ready for implementation)
- Doctor approval workflow
- Cancellation handling

## 🎨 Tailwind Configuration

Custom theme extends:
```javascript
colors: {
  primary: '#13a4ec',
  'background-light': '#f6f7f8',
  'background-dark': '#101c22',
}
```

Gradients used:
- Teal to Blue: Primary actions, hero sections
- Purple to Pink: AI features
- Orange to Red: Video features

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

All components are mobile-first and fully responsive.

## ⚠️ Important Notes

1. **Mock Data**: Currently using mock data for demonstration. Replace with actual API calls.

2. **Authentication**: JWT tokens stored in localStorage. Consider httpOnly cookies for production.

3. **Video Links**: Placeholder links for WebRTC. Integrate with Twilio/Agora/Jitsi.

4. **AI Responses**: Mock responses included. Connect to Google Gemini API.

5. **File Uploads**: Not yet implemented for profile pictures.

## 🔜 Remaining Tasks

### Hospital Module (Not Yet Implemented)
- Hospital Dashboard
- Affiliated Doctors Management
- Service Packages Management
- Profile Management

### Admin Module (Not Yet Implemented)
- System Dashboard with Analytics
- Doctor Management (Approve/Verify)
- Hospital Management
- Content Management System
- Trend Reporting

### Additional Doctor Features
- Availability Management Calendar
- Patient List with AI Summaries
- Video Consultation Interface
- Profile Management

### Enhancements
- Real-time notifications
- Email integration
- File upload for documents
- Payment integration
- Advanced search and filters
- Data export features

## 🛠️ Tech Stack

- **Framework**: React 18.3
- **Routing**: React Router DOM 6.26
- **Styling**: Tailwind CSS 3.4
- **Forms**: @tailwindcss/forms
- **Build Tool**: Vite 5.4
- **Icons**: Inline SVG (Heroicons style)

## 📄 License

This project is part of the SoulSync mental health platform.

---

**Status**: Frontend core implementation complete. Ready for backend integration and remaining modules.
