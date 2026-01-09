# CashCue Website - API Contracts & Integration Plan

## Current Mock Data in mock.js

### Services Data
- `mockServices`: Array of 4 service objects with title, description, features
- Used in: Home.jsx (preview), Services.jsx (full list)

### Projects/Portfolio Data
- `mockProjects`: Array of 6 project objects with title, description, image, category, tech stack
- Used in: Portfolio.jsx with category filtering

### Testimonials Data
- `mockTestimonials`: Array of 3 testimonials with name, company, role, content, rating
- Used in: Home.jsx testimonials section

### Company Information
- `mockCompanyInfo`: Static company data, contact info, AI waitlist info
- Used across all pages for consistent branding

## Backend API Endpoints to Implement

### 1. Contact Form Submission
**Endpoint**: `POST /api/contact`
**Purpose**: Handle contact form submissions and integrate with Formspree
**Frontend Integration**: Contact.jsx form submission
**Current Mock**: Direct Formspree integration in frontend
**Backend Tasks**:
- Validate form data
- Forward to Formspree endpoint: `https://formspree.io/f/mvgrekqd`
- Store submission in database for backup
- Return success/error response

### 2. AI Waitlist Submission
**Endpoint**: `POST /api/ai-waitlist`
**Purpose**: Handle AI waitlist form submissions
**Frontend Integration**: AIWaitlist.jsx form submission
**Current Mock**: Direct Formspree integration in frontend
**Backend Tasks**:
- Validate waitlist data
- Forward to Formspree endpoint: `https://formspree.io/f/mvgrekqd`
- Store in database with form_type: 'AI Waitlist'
- Return success/error response

### 3. Services Data (Optional - Content Management)
**Endpoint**: `GET /api/services`
**Purpose**: Serve services data dynamically
**Frontend Integration**: Replace mockServices import
**Current Mock**: Static data in mock.js
**Backend Tasks**:
- Store services in MongoDB
- Return formatted services array
- Allow for future admin panel updates

### 4. Portfolio/Projects Data (Optional)
**Endpoint**: `GET /api/projects`
**Purpose**: Serve portfolio projects with filtering
**Frontend Integration**: Replace mockProjects import
**Query Parameters**: `?category=Landing Page` for filtering
**Backend Tasks**:
- Store projects in MongoDB
- Support category filtering
- Return formatted projects array

## Database Models

### ContactSubmission
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  company: String,
  projectType: String,
  budget: String,
  message: String (required),
  submittedAt: Date,
  formspreeStatus: String, // 'sent', 'failed'
  ipAddress: String
}
```

### WaitlistSubmission
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  interests: String,
  submittedAt: Date,
  formspreeStatus: String, // 'sent', 'failed'
  ipAddress: String
}
```

### Service (Optional)
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  features: [String],
  order: Number,
  isActive: Boolean,
  createdAt: Date
}
```

### Project (Optional)
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  image: String, // URL
  category: String,
  tech: [String],
  isActive: Boolean,
  order: Number,
  createdAt: Date
}
```

## Frontend-Backend Integration Steps

### Phase 1: Form Handling (Priority)
1. Create contact submission endpoint
2. Create waitlist submission endpoint
3. Update Contact.jsx to use backend endpoint
4. Update AIWaitlist.jsx to use backend endpoint
5. Test form submissions and Formspree integration

### Phase 2: Dynamic Content (Optional)
1. Create services CRUD endpoints
2. Create projects CRUD endpoints
3. Update Home.jsx and Services.jsx to fetch from API
4. Update Portfolio.jsx to fetch from API with filtering
5. Remove mock.js dependencies

## Current Frontend Routes
- `/` - Home page (Hero with 3D robot, services preview, testimonials, CTA)
- `/services` - Services page (All services, process, additional expertise)
- `/portfolio` - Portfolio page (Projects grid with filtering)
- `/about` - About page (Team, values, company info)
- `/contact` - Contact page (Form + contact info)
- `/ai-waitlist` - AI Waitlist page (Waitlist form + 3D background)

## External Integrations
1. **Formspree**: `https://formspree.io/f/mvgrekqd` for both contact and waitlist forms
2. **Spline 3D**: `https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode` for robot/orb effects

## Design Guidelines Adherence
- ✅ Dark theme with black backgrounds
- ✅ Brand color #00FFD1 for buttons/accents only  
- ✅ Sharp-edged buttons (border-radius: 0px)
- ✅ JetBrains Mono font family
- ✅ No large colored areas (90/10 rule followed)
- ✅ Proper typography hierarchy
- ✅ Floating "Hire Me" button
- ✅ Spline 3D integration for futuristic feel

## Notes for Backend Implementation
- All form data should be validated server-side
- Store all submissions as backup even when forwarding to Formspree
- Use proper error handling and return appropriate HTTP status codes
- Implement rate limiting on form endpoints to prevent spam
- The current frontend works entirely with mock data, so backend integration will be seamless