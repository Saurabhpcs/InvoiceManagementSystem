
# Invoice Management System

## Overview
This project is a full-stack application that helps users manage their invoices efficiently. It features a **Node.js backend** and a React frontend...

## Features

### Backend (Node.js Microservice)

1. **User Authentication:**
   - Users can log in securely using Google OAuth.

2. **Invoice Details:**
   - Provides endpoints to fetch invoice data, including:
     - Invoice id
     - RecipientEmail
     - Amount
     - Customer name
     - Customer id
     - Purchase date
     - Due date
     - Status

3. **MongoDB Database**
   - JSON of created invoices is stored in MongoDB Atlas...

4. **Zapier Integration:**
   - Endpoints to trigger automation for past-due invoices...

### Frontend (React)

1. **Google OAuth Integration**
2. **Invoice Management**
3. **Trigger Automation**

## Installation and Setup

### Prerequisites
- Node.js
- npm
- MongoDB
- Zapier account
- Google Cloud account

### Backend Setup
```bash
git clone https://github.com/Saurabhpcs/InvoiceManagementSystem.git
cd backend
npm install
```
Create a `.env` file and add:
```env
PORT=5000
MONGO_URI=your_mongo_uri
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
ZAPIER_WEBHOOK_URL=your_webhook_url
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Zapier Workflow Setup
- Log in to Zapier
- Create a Zap with Webhook trigger
- Actions: Email reminders, follow-ups

## API Endpoints

**Authentication**
- `POST /auth/google` – Google OAuth

**Invoices**
- `GET /invoices` – Retrieve due invoices

**Automation**
- `POST /zapier/trigger` – Trigger Zapier actions

## Tech Stack

**Backend:** Node.js, Express.js, MongoDB, Google OAuth  
**Frontend:** React.js, React Router, Axios  
**Integrations:** Google OAuth, Zapier Webhooks
