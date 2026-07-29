# Backend API & Development Guide

## 📑 Table of Contents
1. [API Overview](#api-overview)
2. [Authentication API](#authentication-api)
3. [User API](#user-api)
4. [Order API](#order-api)
5. [Response Formats](#response-formats)
6. [Error Handling](#error-handling)
7. [Backend Development Guide](#backend-development-guide)

---

## 🔗 API Overview

### Base URL
```
Development: http://localhost:5000
Production: https://api.smartagritech.com (example)
```

### Request/Response Format
- **Content-Type**: `application/json`
- **Max Payload**: 10MB (includes base64 image uploads)
- **CORS**: Enabled for all origins

### Global Headers
```javascript
{
  "Content-Type": "application/json",
  "Accept": "application/json"
}
```

---

## 🔐 Authentication API

### 1. Send OTP

**Endpoint**: `POST /auth/send-otp`

**Purpose**: Generate and send OTP to user's phone

**Request**:
```bash
curl -X POST http://localhost:5000/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phone":"9876543210"}'
```

**Request Body**:
```javascript
{
  "phone": "9876543210"  // Required: 10-digit phone number
}
```

**Response** (200 OK):
```javascript
{
  "success": true,
  "message": "OTP sent successfully (fake)"
}
```

**Error Response** (400 Bad Request):
```javascript
{
  "success": false,
  "message": "Phone number is required"
}
```

**Implementation Notes**:
- Currently generates fake 4-digit OTP
- Logs OTP to console (for testing)
- Stores OTP in memory (OTP_STORE object)
- **TODO for Production**: 
  - Integrate SMS service (Twilio, AWS SNS, FastSMS)
  - Store OTP with expiry (5-10 minutes)
  - Rate limiting to prevent spam

---

### 2. Verify OTP

**Endpoint**: `POST /auth/verify-otp`

**Purpose**: Validate OTP and authenticate user

**Request**:
```bash
curl -X POST http://localhost:5000/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "phone":"9876543210",
    "otp":"1234"
  }'
```

**Request Body**:
```javascript
{
  "phone": "9876543210",  // Required
  "otp": "1234"           // Required: 4-digit OTP
}
```

**Response** (200 OK):
```javascript
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Ramesh Patil",
    "phone": "9876543210",
    "location": "Pune",
    "preferredCrops": ["Cotton", "Wheat"],
    "avatar": "/avatar1.jpg",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Error Response** (400 Bad Request):
```javascript
{
  "message": "Invalid OTP"
}
```

**Error Response** (400 Not Found):
```javascript
{
  "message": "User not found, please signup"
}
```

**Frontend Integration**:
```javascript
const verifyOtp = async (phone, otp) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/auth/verify-otp',
      { phone, otp }
    );
    
    if (response.data.success) {
      const user = response.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      // Redirect to Dashboard
    }
  } catch (error) {
    alert(error.response.data.message);
  }
};
```

---

### 3. Register User

**Endpoint**: `POST /auth/register`

**Purpose**: Create new user account (called after OTP verification for new users)

**Request**:
```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Ramesh Patil",
    "phone":"9876543210",
    "location":"Pune",
    "preferredCrops":["Cotton","Wheat"]
  }'
```

**Request Body**:
```javascript
{
  "name": "Ramesh Patil",           // Required
  "phone": "9876543210",             // Required, must be unique
  "location": "Pune",                // Required
  "preferredCrops": ["Cotton"]       // Array of crop names
}
```

**Response** (201 Created):
```javascript
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Ramesh Patil",
    "phone": "9876543210",
    "location": "Pune",
    "preferredCrops": ["Cotton"],
    "avatar": "/avatar1.jpg",
    "createdAt": "2024-01-18T08:00:00Z",
    "updatedAt": "2024-01-18T08:00:00Z"
  }
}
```

**Error Response** (400 Bad Request):
```javascript
{
  "message": "User already exists"
}
```

---

## 👤 User API

### 1. Check Phone Availability

**Endpoint**: `POST /api/users/check-phone`

**Purpose**: Verify if phone number is already registered

**Request**:
```bash
curl -X POST http://localhost:5000/api/users/check-phone \
  -H "Content-Type: application/json" \
  -d '{"phone":"9876543210"}'
```

**Request Body**:
```javascript
{
  "phone": "9876543210"  // Required
}
```

**Response** (200 OK):
```javascript
{
  "exists": false  // true if user exists, false if available
}
```

**Frontend Use Case**:
```javascript
// Validate phone before signup
const checkPhoneAvailable = async (phone) => {
  const response = await axios.post('/api/users/check-phone', { phone });
  if (response.data.exists) {
    return 'Phone already registered. Please login.';
  }
};
```

---

### 2. User Signup

**Endpoint**: `POST /api/users/signup`

**Purpose**: Create new user account (alternative to auth/register)

**Request**:
```bash
curl -X POST http://localhost:5000/api/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Rajesh Kumar",
    "phone":"8765432109",
    "location":"Pune",
    "preferredCrops":["Wheat"]
  }'
```

**Request Body**:
```javascript
{
  "name": "Rajesh Kumar",
  "phone": "8765432109",
  "location": "Pune",
  "preferredCrops": ["Wheat"]
}
```

**Response** (200 OK):
```javascript
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Rajesh Kumar",
  "phone": "8765432109",
  "location": "Pune",
  "preferredCrops": ["Wheat"],
  "avatar": "/avatar1.jpg"
}
```

**Error Response** (500 Internal Server Error):
```javascript
{
  "error": "User validation failed"
}
```

---

### 3. User Login

**Endpoint**: `POST /api/users/login`

**Purpose**: Authenticate user by phone (password-less login)

**Request**:
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"phone":"9876543210"}'
```

**Request Body**:
```javascript
{
  "phone": "9876543210"  // Required: registered phone
}
```

**Response** (200 OK):
```javascript
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Ramesh Patil",
  "phone": "9876543210",
  "location": "Pune",
  "preferredCrops": ["Cotton"],
  "avatar": "/avatar1.jpg",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Error Response** (404 Not Found):
```javascript
{
  "message": "User not found"
}
```

---

### 4. Update User Profile

**Endpoint**: `PUT /api/users/update/:id`

**Purpose**: Update user information

**Request**:
```bash
curl -X PUT http://localhost:5000/api/users/update/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Ramesh Updated",
    "location":"Pune - Haveli",
    "preferredCrops":["Cotton","Wheat","Corn"],
    "avatar":"/avatar2.jpg"
  }'
```

**Request Body**:
```javascript
{
  "name": "Ramesh Updated",          // Optional
  "location": "Pune - Haveli",       // Optional
  "preferredCrops": [                // Optional array
    "Cotton", "Wheat", "Corn"
  ],
  "avatar": "/avatar2.jpg"           // Optional
}
```

**Response** (200 OK):
```javascript
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Ramesh Updated",
    "phone": "9876543210",
    "location": "Pune - Haveli",
    "preferredCrops": ["Cotton", "Wheat", "Corn"],
    "avatar": "/avatar2.jpg",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-18T15:45:00Z"
  }
}
```

**Error Response** (404 Not Found):
```javascript
{
  "success": false,
  "message": "User not found"
}
```

**Error Response** (500 Error):
```javascript
{
  "success": false,
  "error": "Validation error details"
}
```

**Frontend Integration**:
```javascript
const updateProfile = async (userId, updates) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/users/update/${userId}`,
      updates
    );
    
    if (response.data.success) {
      const updatedUser = response.data.user;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      alert('Profile updated successfully!');
    }
  } catch (error) {
    alert(error.response.data.error);
  }
};
```

---

## 📦 Order API

### 1. Create Order

**Endpoint**: `POST /api/orders/create`

**Purpose**: Create new crop order/listing

**Request**:
```bash
curl -X POST http://localhost:5000/api/orders/create \
  -H "Content-Type: application/json" \
  -d '{
    "user":"Ramesh Patil",
    "phone":"9876543210",
    "location":"Pune - Haveli",
    "crop":"Cotton",
    "qty":100,
    "unit":"kg",
    "photo":"data:image/jpeg;base64,...",
    "notes":"Premium quality cotton"
  }'
```

**Request Body**:
```javascript
{
  "user": "Ramesh Patil",              // Optional, defaults to "Farmer"
  "phone": "9876543210",               // Required
  "location": "Pune - Haveli",         // Required
  "crop": "Cotton",                    // Required
  "qty": 100,                          // Required (number, min: 1)
  "unit": "kg",                        // Required ('kg' or 'quintal')
  "photo": "data:image/jpeg;base64...", // Optional, base64 encoded image
  "notes": "Premium quality cotton"    // Optional
}
```

**Response** (201 Created):
```javascript
{
  "success": true,
  "message": "Order placed successfully",
  "order": {
    "_id": "507f1f77bcf86cd799439020",
    "user": "Ramesh Patil",
    "phone": "9876543210",
    "location": "Pune - Haveli",
    "crop": "Cotton",
    "qty": 100,
    "unit": "kg",
    "trackingNo": "JD567890",
    "status": "Requested",
    "assignedTo": "Not Assigned",
    "expectedPickupDate": "Today",
    "photo": "data:image/jpeg;base64...",
    "notes": "Premium quality cotton",
    "createdAt": "2024-01-18T08:00:00Z",
    "updatedAt": "2024-01-18T08:00:00Z"
  }
}
```

**Error Response** (400 Bad Request):
```javascript
{
  "success": false,
  "message": "Missing required fields"
}
```

**Error Response** (500 Error):
```javascript
{
  "success": false,
  "message": "Order creation failed"
}
```

**Frontend Integration**:
```javascript
const createOrder = async (orderData) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/orders/create',
      orderData
    );
    
    if (response.data.success) {
      const { trackingNo } = response.data.order;
      localStorage.setItem('lastTrackingNo', trackingNo);
      // Show success screen with tracking number
      navigate('/success');
    }
  } catch (error) {
    alert(error.response.data.message);
  }
};
```

**Image Upload (Base64 Conversion)**:
```javascript
const handleImageUpload = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  
  reader.onload = (event) => {
    const base64Image = event.target.result;
    // base64Image can now be sent to API
    setFormData({ ...formData, photo: base64Image });
  };
  
  reader.readAsDataURL(file);
};
```

---

### 2. Track Order

**Endpoint**: `GET /api/orders/track/:trackingNo`

**Purpose**: Retrieve order details by tracking number

**Request**:
```bash
curl http://localhost:5000/api/orders/track/JD567890
```

**URL Parameters**:
```
:trackingNo = "JD567890"  // Required: 8-character tracking ID
```

**Response** (200 OK):
```javascript
{
  "success": true,
  "order": {
    "_id": "507f1f77bcf86cd799439020",
    "user": "Ramesh Patil",
    "phone": "9876543210",
    "location": "Pune - Haveli",
    "crop": "Cotton",
    "qty": 100,
    "unit": "kg",
    "trackingNo": "JD567890",
    "status": "Out for Pickup",
    "assignedTo": "Agent Suresh",
    "expectedPickupDate": "2024-01-20",
    "photo": "data:image/jpeg;base64...",
    "notes": "Premium quality cotton",
    "createdAt": "2024-01-18T08:00:00Z",
    "updatedAt": "2024-01-19T14:30:00Z"
  }
}
```

**Error Response** (404 Not Found):
```javascript
{
  "success": false,
  "message": "Order not found"
}
```

**Status Values**:
```
"Requested"        - Order received, awaiting assignment
"Assigned"         - Assigned to pickup agent
"Out for Pickup"   - Agent en route to farm
"Completed"        - Order pickup completed
"Cancelled"        - Order cancelled by farmer
```

**Frontend Integration**:
```javascript
const trackOrder = async (trackingNo) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/orders/track/${trackingNo}`
    );
    
    if (response.data.success) {
      const orderDetails = response.data.order;
      setOrderInfo(orderDetails);
      displayOrderStatus(orderDetails.status);
    }
  } catch (error) {
    alert('Order not found');
  }
};
```

---

### 3. Get All Orders

**Endpoint**: `GET /api/orders/`

**Purpose**: Retrieve all orders (sorted by date, newest first)

**Request**:
```bash
curl http://localhost:5000/api/orders/
```

**Query Parameters**: None

**Response** (200 OK):
```javascript
{
  "success": true,
  "orders": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "trackingNo": "JD567890",
      "user": "Ramesh Patil",
      "crop": "Cotton",
      "qty": 100,
      "status": "Out for Pickup",
      "createdAt": "2024-01-19T00:00:00Z"
    },
    {
      "_id": "507f1f77bcf86cd799439021",
      "trackingNo": "JD678901",
      "user": "Ajay Sharma",
      "crop": "Wheat",
      "qty": 50,
      "status": "Completed",
      "createdAt": "2024-01-18T00:00:00Z"
    }
  ]
}
```

**Frontend Use Case** (Admin/Dashboard):
```javascript
const getAllOrders = async () => {
  try {
    const response = await axios.get(
      'http://localhost:5000/api/orders/'
    );
    
    if (response.data.success) {
      const allOrders = response.data.orders;
      displayOrdersList(allOrders);
    }
  } catch (error) {
    console.error('Failed to fetch orders');
  }
};
```

---

## 📤 Response Formats

### Standard Success Response

```javascript
{
  "success": true,
  "message": "Operation completed",
  "data": { /* ... */ }
}
```

### Standard Error Response

```javascript
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

### Pagination Response (For List Endpoints)

```javascript
{
  "success": true,
  "data": [ /* items */ ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

---

## ⚠️ Error Handling

### HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK - Request successful | GET order |
| 201 | Created - Resource created | POST create order |
| 400 | Bad Request - Invalid input | Missing fields |
| 404 | Not Found - Resource not found | Order not found |
| 500 | Server Error - Internal error | Database error |

### Error Response Example

```javascript
// 400 Bad Request
{
  "success": false,
  "message": "Missing required fields"
}

// 404 Not Found
{
  "success": false,
  "message": "Order not found"
}

// 500 Server Error
{
  "success": false,
  "message": "Internal server error"
}
```

### Frontend Error Handling

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000'
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    
    if (response?.status === 404) {
      console.error('Resource not found');
    } else if (response?.status === 500) {
      console.error('Server error');
    } else {
      console.error('Network error');
    }
    
    return Promise.reject(error);
  }
);
```

---

## 🛠️ Backend Development Guide

### Project Structure

```
backend/
├── server.js           # Main Express app
├── db.js              # Database connection
├── package.json       # Dependencies
├── .env              # Environment variables
├── controllers/
│   └── authController.js
├── models/
│   ├── User.js
│   └── Order.js
└── routes/
    ├── authRoutes.js
    ├── userRoutes.js
    └── orderRoutes.js
```

### Adding a New Route

**Step 1**: Create new route file `backend/routes/newRoutes.js`

```javascript
import express from "express";
import Model from "../models/Model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Model.find();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
```

**Step 2**: Import in `server.js`

```javascript
import newRoutes from "./routes/newRoutes.js";
app.use("/api/newroute", newRoutes);
```

### Adding a New Model

**Create** `backend/models/NewModel.js`:

```javascript
import mongoose from "mongoose";

const schema = new mongoose.Schema({
  field1: { type: String, required: true },
  field2: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("NewModel", schema);
```

### Middleware Development

```javascript
// Authentication middleware (to be implemented)
export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
```

### Environment Variables

**Create** `.env` file in backend:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/smartagri
NODE_ENV=development
JWT_SECRET=your_secret_key_here
TWILIO_ACCOUNT_SID=xxxxx
TWILIO_AUTH_TOKEN=xxxxx
SMS_FROM_NUMBER=+1234567890
```

### Database Connection Testing

```bash
# Test MongoDB connection
mongosh  # Opens MongoDB shell

# In shell:
use smartagri
db.users.find()
db.orders.find()
```

### Running Backend Server

```bash
cd backend
npm install
npm start

# Output should show:
# ✅ MongoDB Connected
# 🚀 Server running on port 5000
```

### Debugging

```javascript
// Add console logs
console.log("ORDER BODY:", req.body);
console.log("UPDATE ID:", req.params.id);

// Use Node debugger
node --inspect server.js

// Then open: chrome://inspect
```

---

## 🧪 Testing API Endpoints

### Using cURL

```bash
# Test endpoint
curl http://localhost:5000/

# POST with data
curl -X POST http://localhost:5000/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phone":"9876543210"}'
```

### Using Postman

1. Import API endpoints
2. Set Base URL: `http://localhost:5000`
3. Create requests for each endpoint
4. Test with different data

### Using Thunder Client (VS Code)

1. Install Thunder Client extension
2. Create HTTP requests
3. Test and save responses

---

**Last Updated**: April 2024
**Backend Framework**: Express.js
**Database**: MongoDB with Mongoose
