# JDSolution SmartAgriTech - System Architecture & Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Directory Structure](#directory-structure)
5. [Backend System](#backend-system)
6. [Frontend System](#frontend-system)
7. [Database Schema](#database-schema)
8. [API Endpoints](#api-endpoints)
9. [Component Architecture](#component-architecture)
10. [Data Flow](#data-flow)
11. [Setup Instructions](#setup-instructions)

---

## 🎯 Project Overview

**JDSolution SmartAgriTech** is a comprehensive agricultural technology platform designed to connect farmers with buyers, provide real-time market insights, weather information, and crop management tools.

### Core Features:
- **Authentication**: Phone-based OTP login system
- **Crop Selling**: Farmers can list crops for sale with tracking
- **Price Prediction**: Real-time market price data
- **Weather Insights**: Weather information for farm planning
- **Crop Health Monitoring**: Track irrigation and crop health
- **Pickup Tracking**: Real-time order status tracking
- **Multi-language Support**: Marathi (mr) and English (en) support
- **User Profiles**: Manage user information and preferences

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  React Frontend (Vite)                                 │ │
│  │  ├─ Pages (7 routes)                                   │ │
│  │  ├─ Components (6+ reusable components)                │ │
│  │  ├─ Context API (Global State Management)              │ │
│  │  └─ i18n (Language Management)                         │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────┬──────────────────────────────────────────────┘
                 │ HTTP/REST API (Axios)
┌────────────────▼──────────────────────────────────────────────┐
│                 API Gateway Layer                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Express.js Server                                     │ │
│  │  ├─ CORS Middleware (Cross-origin support)             │ │
│  │  ├─ Body Parser (10MB file upload support)             │ │
│  │  ├─ Error Handling Middleware                          │ │
│  │  └─ Route Dispatcher                                   │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────┬──────────────────────────────────────────────┘
                 │
        ┌────────┼────────┐
        │        │        │
┌───────▼──┐ ┌──▼──────┐ ┌──▼────────┐
│ Auth     │ │User     │ │Order      │
│Routes    │ │Routes   │ │Routes     │
└───────┬──┘ └──┬──────┘ └──┬────────┘
        │       │           │
        └───────┼───────────┘
                │
        ┌───────▼──────────────┐
        │ Business Logic Layer │
        │ Controllers          │
        │ ├─ authController    │
        │ └─ [Order/User logic]│
        └───────┬──────────────┘
                │
        ┌───────▼──────────────┐
        │  Data Layer          │
        │ ├─ User Model        │
        │ ├─ Order Model       │
        │ └─ Mongoose Schema   │
        └───────┬──────────────┘
                │
        ┌───────▼──────────────┐
        │  MongoDB Database    │
        │  ├─ users           │
        │  ├─ orders          │
        │  └─ Collections     │
        └──────────────────────┘
```

---

## 💻 Technology Stack

### Frontend
- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18
- **Routing**: React Router DOM 7.12.0
- **HTTP Client**: Axios 1.13.3
- **Icons**: Lucide React 0.562.0
- **Linting**: ESLint 9.39.1

### Backend
- **Runtime**: Node.js
- **Framework**: Express 4.18.2
- **Database**: MongoDB 7.6.0 + Mongoose ODM
- **Security**: CORS 2.8.5
- **Environment**: dotenv 16.4.5

### Key Dependencies
```json
{
  "Frontend": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.12.0",
    "axios": "^1.13.3",
    "tailwindcss": "^4.1.18",
    "lucide-react": "^0.562.0"
  },
  "Backend": {
    "express": "^4.18.2",
    "mongoose": "^7.6.0",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5"
  }
}
```

---

## 📁 Directory Structure

```
JDSolution-SmartAgriTech-final-project/
│
├── README.md
├── ARCHITECTURE.md (This file)
│
├── backend/
│   ├── package.json
│   ├── server.js                 # Main Express app
│   ├── db.js                     # MongoDB connection
│   │
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   └── authRoutes.js         # Auth routes
│   │
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Order.js              # Order schema
│   │
│   ├── routes/
│   │   ├── authRoutes.js         # /auth endpoints
│   │   ├── userRoutes.js         # /api/users endpoints
│   │   └── orderRoutes.js        # /api/orders endpoints
│   │
│   └── .gitignore
│
└── frontend/
    ├── package.json
    ├── vite.config.js            # Vite config
    ├── eslint.config.js
    ├── index.html                # HTML entry point
    │
    ├── public/
    │   └── crops/                # Crop images
    │
    └── src/
        ├── main.jsx              # React entry point
        ├── App.jsx               # Main app component
        ├── App.css               # Global styles
        ├── index.css             # Global CSS
        │
        ├── assets/               # Images, logos
        │
        ├── components/           # Reusable components
        │   ├── Navbar.jsx
        │   ├── PricePredictionSection.jsx
        │   ├── SmartInsightsSection.jsx
        │   ├── SuccessScreen.jsx
        │   ├── TodayPriceSection.jsx
        │   ├── WeatherSection.jsx
        │   └── FarmOverviewSection/
        │       ├── FarmOverviewSection.jsx
        │       ├── CropHealthCard.jsx
        │       ├── IrrigationInsightsCard.jsx
        │       ├── MarketPricePredictionCard.jsx
        │       └── ProfitEstimatorCard.jsx
        │
        ├── context/
        │   └── AppContext.jsx     # Global state management
        │
        ├── i18n/
        │   └── translations.js    # Multi-language support
        │
        └── pages/                # Page components
            ├── LandingPage.jsx    # Home page
            ├── AuthPage.jsx       # Login/Signup
            ├── Dashboard.jsx      # Main dashboard
            ├── SellCrop.jsx       # Sell crop form
            ├── ProfilePage.jsx    # User profile
            ├── PickupStatusSection.jsx  # Track orders
            └── Support.jsx        # Support page
```

---

## ⚙️ Backend System

### 1. **Server Setup** (`server.js`)

The Express server is the core of the backend:

```javascript
// Key Responsibilities:
1. Initialize Express app
2. Connect to MongoDB
3. Configure CORS middleware
4. Parse JSON/URL-encoded bodies (10MB limit for image uploads)
5. Mount routes
6. Handle 404 errors
7. Global error handling
8. Listen on PORT (default: 5000)
```

### 2. **Database Connection** (`db.js`)

```javascript
// MongoDB Connection Handler
- Connects to MongoDB using Mongoose
- Uses MONGO_URI from environment variables
- Falls back to local MongoDB (127.0.0.1:27017/smartagri)
- Logs connection status
- Exits process on connection failure
```

### 3. **Authentication System** (`controllers/authController.js`)

#### Features:
- **OTP Generation**: 4-digit random OTP
- **OTP Verification**: Validates OTP against in-memory storage
- **User Registration**: Creates new farmer accounts
- **User Lookup**: Retrieves user by phone number

#### Functions:

```javascript
// 1. sendOtp(phone)
   - Generates 4-digit OTP
   - Stores in memory (OTP_STORE)
   - Returns success message
   - NOTE: Currently fake implementation for testing

// 2. verifyOtp(phone, otp)
   - Checks OTP validity
   - Retrieves user from database
   - Returns user data on success

// 3. registerUser(name, phone, location, preferredCrops)
   - Validates phone uniqueness
   - Creates new User document
   - Returns created user object
```

#### Auth Routes: (`routes/authRoutes.js`)

```
POST /auth/send-otp          → Generate OTP
POST /auth/verify-otp        → Verify OTP and get user
POST /auth/register          → Register new user
GET  /auth/test             → Test endpoint
```

### 4. **Data Models**

#### User Model (`models/User.js`)

```javascript
{
  _id: ObjectId,
  name: String (required),
  phone: String (unique, required),
  location: String,
  preferredCrops: [String],
  avatar: String (default: '/avatar1.jpg'),
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

**Purpose**: Stores farmer/user profile information

#### Order Model (`models/Order.js`)

```javascript
{
  _id: ObjectId,
  
  // User Information
  user: String (required),
  phone: String (required),
  location: String (required),
  
  // Crop Information
  crop: String (required),
  qty: Number (required, minimum: 1),
  unit: String (enum: ['kg', 'quintal']),
  
  // Tracking Information
  trackingNo: String (unique, indexed),
  status: String (enum: ['Requested', 'Assigned', 'Out for Pickup', 'Completed', 'Cancelled']),
  assignedTo: String (default: 'Not Assigned'),
  expectedPickupDate: String (default: 'Today'),
  
  // Optional Fields
  photo: String (base64 or image URL),
  notes: String,
  
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

**Purpose**: Tracks crop orders from farmers to pickup/buyers

### 5. **User Routes** (`routes/userRoutes.js`)

```
GET  /api/users/test              → Test endpoint
POST /api/users/check-phone       → Check if phone exists
POST /api/users/signup            → Create new user account
POST /api/users/login             → Authenticate user
PUT  /api/users/update/:id        → Update user profile
```

**Key Functions:**
- **check-phone**: Validates phone uniqueness before signup
- **login**: Phone-based authentication (no password)
- **update**: Allows users to modify profile (name, location, crops, avatar)

### 6. **Order Routes** (`routes/orderRoutes.js`)

```
POST /api/orders/create           → Create new crop order
GET  /api/orders/track/:trackingNo → Track order by tracking number
GET  /api/orders/                 → Get all orders (sorted by date)
```

**Key Functions:**
- **generateTrackingNo()**: Creates unique tracking ID (format: JD + 6 random digits)
- **create**: Saves crop order with validation
- **track**: Retrieves order details by tracking number

---

## 🎨 Frontend System

### 1. **App Structure** (`App.jsx`)

**Routes Defined:**

```javascript
/              → LandingPage    (Home/Welcome page)
/auth          → AuthPage       (Login/Registration)
/dashboard     → Dashboard      (Main dashboard with insights)
/sell-crop     → SellCrop       (Create crop order)
/success       → SuccessScreen  (Order confirmation)
/track         → PickupStatusSection (Track orders)
/profile       → ProfilePage    (User profile management)
/support       → Support        (Help/Support page)
```

### 2. **Global State Management** (`context/AppContext.jsx`)

**Context Values:**
```javascript
{
  language: String,          // Current language ('mr' or 'en')
  changeLanguage: Function,  // Switch language
  loggedIn: Boolean,         // Authentication status
  setLoggedIn: Function      // Update login status
}
```

**Persistence:**
- Language preference saved to localStorage
- Persists across page refreshes

### 3. **Navigation** (`components/Navbar.jsx`)

**Features:**
- Responsive navigation bar
- Language switcher (Marathi/English)
- Taluka (District) selector for Pune city
- Location-based taluka list:
  - Haveli, Mulshi, Maval, Junnar, Ambegaon, Shirur, Purandar, Bhor, Velhe, Daund, Baramati, Indapur
- Conditional nav links based on login status
- Active route highlighting

### 4. **Page Components**

#### LandingPage
- Welcome screen for new visitors
- Feature showcase
- Call-to-action for signup/login

#### AuthPage
- OTP-based login system
- Phone number input
- OTP verification
- User registration with:
  - Name
  - Phone
  - Location
  - Preferred crops (multi-select)

#### Dashboard
- Main hub after login
- Shows multiple insights cards:
  - **FarmOverviewSection**: Farm health metrics
  - **WeatherSection**: Local weather data
  - **TodayPriceSection**: Today's crop prices
  - **PricePredictionSection**: Price forecasts
  - **SmartInsightsSection**: AI-driven recommendations

#### SellCrop
- Form to create crop order
- Fields:
  - Crop type
  - Quantity
  - Unit (kg/quintal)
  - Photo upload (base64)
  - Notes
- Form validation
- Redirects to /success on submission

#### ProfilePage
- Display user information
- Edit profile fields
- Preferred crops management
- Avatar display

#### PickupStatusSection
- Track orders by tracking number
- Display current order status
- Status updates:
  - Requested → Assigned → Out for Pickup → Completed
  - Can be Cancelled anytime
- Show assigned pickup agent
- Expected pickup date

#### Support
- Help and support page
- Contact information
- FAQ section

### 5. **Reusable Components**

#### Navbar
- Header navigation
- Language/region selector
- User menu

#### FarmOverviewSection
- Container component displaying farm metrics

#### CropHealthCard
- Shows crop health status
- Visual indicators

#### IrrigationInsightsCard
- Irrigation schedule recommendations
- Water level indicators

#### MarketPricePredictionCard
- Price trend charts
- Price forecasts

#### ProfitEstimatorCard
- Profit calculation based on crop/quantity
- Cost-benefit analysis

#### WeatherSection
- Current weather
- Forecast
- Alerts

#### TodayPriceSection
- Real-time crop prices
- Market rates

#### PricePredictionSection
- Price trends
- Predictive graphs

#### SuccessScreen
- Order confirmation page
- Tracking number display
- Next steps

### 6. **Multi-language Support** (`i18n/translations.js`)

**Supported Languages:**
- Marathi (mr)
- English (en)

**Translation Keys:** (Common sections)
- Navigation items
- Form labels
- Buttons
- Messages
- Page titles

**Usage:**
```javascript
import TRANSLATIONS from '../i18n/translations';
const { language } = useContext(AppContext);
const t = TRANSLATIONS[language];
console.log(t.buttonLabel);
```

---

## 📊 Database Schema

### Users Collection

```javascript
db.users.insertOne({
  _id: ObjectId("..."),
  name: "Ramesh Patil",
  phone: "9876543210",
  location: "Pune",
  preferredCrops: ["Cotton", "Wheat", "Corn"],
  avatar: "/avatar1.jpg",
  createdAt: ISODate("2024-01-15T10:30:00Z"),
  updatedAt: ISODate("2024-01-15T10:30:00Z")
})

// Indexes
db.users.createIndex({ phone: 1 }, { unique: true })
```

### Orders Collection

```javascript
db.orders.insertOne({
  _id: ObjectId("..."),
  user: "Ramesh Patil",
  phone: "9876543210",
  location: "Pune - Haveli",
  crop: "Cotton",
  qty: 100,
  unit: "kg",
  trackingNo: "JD567890",
  status: "Out for Pickup",
  assignedTo: "Agent Suresh",
  expectedPickupDate: "2024-01-20",
  photo: "data:image/jpeg;base64,...",
  notes: "Premium quality cotton",
  createdAt: ISODate("2024-01-18T08:00:00Z"),
  updatedAt: ISODate("2024-01-19T14:30:00Z")
})

// Indexes
db.orders.createIndex({ trackingNo: 1 }, { unique: true })
db.orders.createIndex({ createdAt: -1 })
```

---

## 🔌 API Endpoints

### Authentication Endpoints

```bash
# Send OTP
POST /auth/send-otp
Body: { phone: "9876543210" }
Response: { success: true, message: "OTP sent successfully (fake)" }

# Verify OTP
POST /auth/verify-otp
Body: { phone: "9876543210", otp: 1234 }
Response: { success: true, user: { _id, name, phone, location, ... } }

# Register User
POST /auth/register
Body: { 
  name: "Ramesh Patil",
  phone: "9876543210",
  location: "Pune",
  preferredCrops: ["Cotton", "Wheat"]
}
Response: { success: true, user: { ... } }
```

### User Endpoints

```bash
# Check Phone Availability
POST /api/users/check-phone
Body: { phone: "9876543210" }
Response: { exists: false }

# User Signup
POST /api/users/signup
Body: { name, phone, location, preferredCrops }
Response: User object

# User Login
POST /api/users/login
Body: { phone: "9876543210" }
Response: User object or 404 error

# Update User Profile
PUT /api/users/update/:id
Body: { name, location, preferredCrops, avatar }
Response: { success: true, user: { ... } }
```

### Order Endpoints

```bash
# Create Order
POST /api/orders/create
Body: {
  user: "Ramesh Patil",
  phone: "9876543210",
  location: "Pune - Haveli",
  crop: "Cotton",
  qty: 100,
  unit: "kg",
  photo: "base64_image_string"
}
Response: {
  success: true,
  message: "Order placed successfully",
  order: { trackingNo: "JD567890", status: "Requested", ... }
}

# Track Order
GET /api/orders/track/:trackingNo
Response: {
  success: true,
  order: { ... order details ... }
}

# Get All Orders
GET /api/orders/
Response: [
  { trackingNo: "JD567890", status: "Out for Pickup", ... },
  { trackingNo: "JD678901", status: "Completed", ... }
]
```

---

## 🔄 Data Flow

### User Registration Flow

```
Frontend (AuthPage)
    ↓
User enters phone → API: POST /auth/send-otp
    ↓ (Fake OTP shown in console)
User enters OTP → API: POST /auth/verify-otp
    ↓
If new user → API: POST /auth/register
    ↓
User saved to MongoDB
    ↓
localStorage.setItem('user', userObject)
    ↓
Redirect to Dashboard
```

### Crop Selling Flow

```
Frontend (SellCrop Page)
    ↓
User fills form (crop, qty, unit, photo)
    ↓
Submit → API: POST /api/orders/create
    ↓
Backend validates all fields
    ↓
Generates trackingNo (JD + random)
    ↓
Creates Order document in MongoDB
    ↓
Response with trackingNo
    ↓
Frontend stores in localStorage
    ↓
Redirect to SuccessScreen
    ↓
User can copy/share trackingNo
```

### Order Tracking Flow

```
Frontend (PickupStatusSection)
    ↓
User enters trackingNo
    ↓
API: GET /api/orders/track/:trackingNo
    ↓
Backend queries MongoDB by trackingNo
    ↓
Returns order details (status, assignedTo, etc.)
    ↓
Frontend displays real-time status updates
    ↓
Status stages shown: Requested → Assigned → Out for Pickup → Completed
```

### Profile Update Flow

```
Frontend (ProfilePage)
    ↓
User modifies profile fields
    ↓
Submit → API: PUT /api/users/update/:id
    ↓
Backend updates MongoDB user document
    ↓
Returns updated user object
    ↓
Frontend updates localStorage
    ↓
Display confirmation message
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas connection)
- npm or yarn

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/smartagri
EOF

# Start server
npm start
# Server runs on http://localhost:5000
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
# Frontend runs on http://localhost:5173 (Vite default)

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

**Backend (.env):**
```
PORT=5000
MONGO_URI=mongodb://username:password@cluster.mongodb.net/smartagri
NODE_ENV=development
```

**Frontend (.env.local):** (if needed)
```
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=SmartAgriTech
```

### MongoDB Setup

**Option 1: Local MongoDB**
```bash
# Start MongoDB service
mongod

# Connect with Mongoose
mongodb://127.0.0.1:27017/smartagri
```

**Option 2: MongoDB Atlas (Cloud)**
```
mongodb+srv://username:password@cluster.mongodb.net/smartagri
```

### Verify Installation

**Backend Health Check:**
```bash
curl http://localhost:5000/
# Expected: "🚜 Smart Agriculture Backend Running"
```

**API Test:**
```bash
curl -X POST http://localhost:5000/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phone":"9876543210"}'
```

---

## 🔐 Security Notes

1. **OTP System**: Currently fake implementation for testing
   - In production: Integrate SMS service (Twilio, AWS SNS)
   - Store OTPs with expiry time (usually 5-10 minutes)

2. **Password**: Currently uses phone-only authentication
   - Consider adding password for additional security
   - Hash passwords with bcrypt

3. **CORS**: Currently allows all origins (`"*"`)
   - In production: Whitelist specific frontend URL
   - Example: `origin: "https://yourdomain.com"`

4. **Image Upload**: Currently base64 in database
   - Consider AWS S3/CloudStorage for larger scale
   - Validate file types and sizes

5. **Environment Variables**: 
   - Never commit .env files
   - Use .env.example for reference
   - Rotate keys periodically

---

## 📈 Future Enhancements

1. **Payment Integration**: Add payment gateway (Stripe, Razorpay)
2. **Real-time Notifications**: WebSocket for live updates
3. **Analytics Dashboard**: Admin panel for business metrics
4. **AI/ML Integration**: Better price prediction
5. **Mobile App**: React Native version
6. **Blockchain**: Transparent supply chain tracking
7. **Advanced Search**: Elasticsearch for order filtering
8. **Batch Operations**: Bulk order creation

---

## 📞 Support

For issues or questions:
- Check the project README.md
- Review API endpoint documentation
- Check browser console for errors
- Verify MongoDB connection
- Check server logs for backend errors

---

**Last Updated**: April 2024
**Version**: 1.0.0
**Maintained By**: JDSolution SmartAgriTech Team
