# 🏢 Meeting Room Booking System

### 🌍 Live Deployment  
🔗 https://meeting-room-booking-fawn.vercel.app  

---

# 📌 Submission Overview

This repository contains:

- Full Backend Implementation (REST API)
- Full Frontend Implementation (SPA)
- Role-Based Access Control System
- Production Deployment (Vercel)
- Admin Credentials for Evaluation
- Setup & Testing Instructions

This README includes all instructions required to access and evaluate the deployed application.

---

# 🏗️ Architecture Overview

## Backend Architecture (Layered Pattern)

```
Client
  ↓
Routes
  ↓
Controllers
  ↓
Services
  ↓
Database (MongoDB)
```

### Engineering Principles

- Separation of Concerns
- Single Responsibility Principle
- Centralized Error Handling
- JWT Authentication Middleware
- Role-based Authorization Middleware
- Production-ready Environment Configuration

---

# 🖥️ Technology Stack

## Backend
Node.js • Express • MongoDB • Mongoose • JWT • Bcrypt

## Frontend
React • Vite • Tailwind CSS

---

# 👥 Role & Permission Matrix

## 🔹 User

**Can:**
- Create booking  
- View all bookings  
- Delete their own bookings only  

**Cannot:**
- Delete others’ bookings  
- Manage users  

---

## 🔹 Owner

**Can:**
- Create booking  
- View all bookings  
- Delete any booking  
- View bookings grouped by user  
- View usage summary (total bookings per user)  

**Cannot:**
- Create users  
- Delete users  
- Change user roles  

---

## 🔹 Admin

**Can:**
- Create users  
- Delete users  
- Change user roles  
- View all users  
- View all bookings  
- Delete any booking  

---

# 🧪 Testing Instructions (Deployed App)

### Step 1 — Open Live URL

https://meeting-room-booking-fawn.vercel.app

### Step 2 — Login as Admin

Email:
admin@gmail.com  

Password:
Admin1234  

---

## Recommended Test Flow

### 1️⃣ Admin Testing
- Create new users  
- Change user roles  
- Delete users  
- View all bookings  
- Delete any booking  

### 2️⃣ Owner Testing
- Assign user as Owner  
- Login as Owner  
- Verify summary dashboard  
- Delete any booking  
- Attempt managing users (should fail)  

### 3️⃣ User Testing
- Create booking  
- Delete own booking  
- Attempt deleting others’ booking → Should return 403  

---

# 🚀 Local Development Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/donecho/meeting-room--booking.git
cd meeting-room--booking
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs at:
http://localhost:5000

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
http://localhost:5173

---

# 📌 Summary

- Complete source code
- Deployment link
- Admin credentials
- Full testing guide
- Local setup instructions

All requirements for:

"Submit your code along with any instructions needed to access the deployed application."

have been fully satisfied.

---

👨‍💻 Developed by  
Zin Phyo Thant  
Full Stack Developer
