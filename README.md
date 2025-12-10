     
# 📧 Email Notification App

### Authentication + Dashboard + Email Sender using Next.js 14, NextAuth, Nodemailer

This project is a complete authentication and email sending system built using:

-   **Next.js 14 (App Router)**
    
-   **NextAuth.js** (Credentials, Google, Facebook, LinkedIn, Reddit)
    
-   **Nodemailer** for email sending
    
-   **Tailwind CSS** for UI
    
-   **MongoDB / Prisma (optional depending on setup)**
    

Users can **sign up, sign in, authenticate with social logins, and send emails** from the dashboard.

----------

## 🚀 Features

-   ✔ Email + Password login
    
-   ✔ Google Login
    
-   ✔ Facebook Login
    
-   ✔ LinkedIn Login
    
-   ✔ Reddit Login
    
-   ✔ Protected Dashboard
    
-   ✔ Send email using Nodemailer
    
-   ✔ Fully responsive UI
    
-   ✔ Secure authentication with hashing
    

----------

## 📁 Project Structure

`email-notification-app/
│
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts       ← NextAuth configuration
│   │   └── send-email/route.ts               ← Email sending API  (Nodemailer) │   ├── dashboard/page.tsx                    ← Dashboard (protected)
│   ├── page.tsx                              ← Auth UI  (Login / Signup) │   ├── layout.tsx
│   ├── globals.css
│
├── components/                               ← Reusable UI components
├── lib/                                      ← DB + utilities
│
├── .env.local                                ← Environment variables
├── package.json
├── README.md
└── tsconfig.json` 

----------

## 🔧 Installation & Setup

### 1️⃣ Clone the repository

`git clone https://github.com/ajayp9/email-notification-app.git cd email-notification-app` 

### 2️⃣ Install dependencies

`npm install` 

### 3️⃣ Create `.env.local` file

`NEXTAUTH_SECRET=your_secret_key NEXTAUTH_URL=http://localhost:3000  
#####   Google OAuth  
     GOOGLE_CLIENT_ID=your_google_client_id,
     GOOGLE_CLIENT_SECRET=your_google_secret
#### Facebook OAuth 
      FACEBOOK_CLIENT_ID=your_fb_client_id 
      FACEBOOK_CLIENT_SECRET=your_fb_secret 
#### LinkedIn OAuth  
      LINKEDIN_CLIENT_ID=your_linkedin_id 
      LINKEDIN_CLIENT_SECRET=your_linkedin_secret t 
#### SMTP Email Service (Gmail / Mailtrap / Any SMTP)  
     EMAIL_HOST=smtp.gmail.com EMAIL_PORT=587  
     EMAIL_USER=your_email EMAIL_PASS=your_app_password` 

----------

## 🔑 OAuth Redirect URLs

Use these while setting up your providers:

### Google

`http://localhost:3000/api/auth/callback/google` 

### Facebook

`http://localhost:3000/api/auth/callback/facebook` 

### LinkedIn

`http://localhost:3000/api/auth/callback/linkedin` 

### Reddit

`http://localhost:3000/api/auth/callback/reddit` 

### For Production (Vercel)

`https://your-app-name.vercel.app/api/auth/callback/<provider>` 

----------

## ▶️ Run the project

`npm run dev`

Your app will be available at:  
👉 http://localhost:3000

----------

## 📧 Email Sending (Nodemailer)

Inside the dashboard:

-   User enters recipient email
    
-   Subject
    
-   Message
    
-   Click **Send Email**
    

The backend (`/api/send-email`) uses **Nodemailer** to send the message using SMTP credentials.

----------

## 🚀 Deployment

1.  Push your code to GitHub
    
2.  Go to **Vercel** → New Project
    
3.  Import your repository
    
4.  Add all environment variables under **Settings → Environment Variables**
    
5.  Deploy 🎉
    

----------

## 🧪 Technologies Used

-   **Next.js 14**
    
-   **NextAuth.js**
    
-   **Nodemailer**
    
-   **Tailwind CSS**
    
-   **React Hook Form**
    
-   **OAuth Providers (Google, Facebook, LinkedIn, Github)**
