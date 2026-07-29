# System Flows & Visual Diagrams

## 🔄 Complete User Journey

### Journey 1: New User Registration & First Sale

```
┌─────────────────────────────────────────────────────────────────┐
│                      LANDING PAGE (/)                           │
│  "Welcome to SmartAgriTech" → "Get Started" button             │
└─────────────────────┬───────────────────────────────────────────┘
                      │ Click "Get Started"
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                     AUTH PAGE (/auth)                           │
│                                                                 │
│  Step 1: Enter Phone Number                                    │
│  [9876543210]                                                  │
│  ✓ API: POST /auth/send-otp                                    │
│    → OTP Generated (logged in console)                         │
└─────────────────────┬───────────────────────────────────────────┘
                      │ OTP Sent
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│  Step 2: Enter OTP                                              │
│  [1234]                                                         │
│  ✓ API: POST /auth/verify-otp                                  │
│    → Check if user exists in DB                                │
└─────────────────────┬───────────────────────────────────────────┘
                      │
         ┌────────────┴────────────┐
         │                         │
    Existing User?            New User?
         │                         │
         ▼                         ▼
    Auto Login          Show Registration Form
         │              ┌─────────────────────┐
         │              │ Enter:              │
         │              │ • Name              │
         │              │ • Location          │
         │              │ • Preferred Crops   │
         │              │                     │
         │              │ API: POST /auth/reg │
         │              └────────┬────────────┘
         │                       │
         └───────────┬───────────┘
                     │
                     ▼
         ┌─────────────────────────┐
         │  ✅ User Created        │
         │  Store in localStorage  │
         │  {_id, name, phone...}  │
         └────────────┬────────────┘
                      │
                      ▼
      ┌───────────────────────────────┐
      │   DASHBOARD (/dashboard)      │
      │   ├─ Farm Overview            │
      │   ├─ Weather                  │
      │   ├─ Market Prices            │
      │   └─ Smart Insights           │
      └────────────┬────────────────────┘
                   │ Click "Sell Crop"
                   ▼
      ┌───────────────────────────────┐
      │   SELL CROP (/sell-crop)      │
      │                               │
      │   Enter:                      │
      │   • Crop Type: [Cotton]       │
      │   • Quantity: [100]           │
      │   • Unit: [kg]                │
      │   • Photo: [Upload]           │
      │   • Notes: [Optional]         │
      │                               │
      │  ✓ API: POST /api/orders/    │
      │    create                     │
      │    → Generate Tracking#       │
      │    → Save to DB               │
      └────────────┬────────────────────┘
                   │ Order Created
                   ▼
      ┌───────────────────────────────┐
      │  SUCCESS (/success)           │
      │                               │
      │  ✅ Order Placed!             │
      │  Tracking#: JD567890         │
      │  Status: Requested            │
      │                               │
      │  "Share tracking# with agent" │
      └───────────────────────────────┘
```

---

## 📊 Order Lifecycle States

```
                    ┌──────────────┐
                    │   Requested  │ ← Order Created
                    │ (Initial)    │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  Assigned    │ ← Agent Assigned
                    │              │
                    └──────┬───────┘
                           │
                           ▼
                 ┌──────────────────────┐
                 │  Out for Pickup      │ ← Agent en route
                 │                      │
                 └──────┬───────────────┘
                        │
                        ▼
                 ┌──────────────────────┐
                 │   Completed          │ ← Order Done
                 │                      │
                 └──────────────────────┘
                        
    OR at any point:
    
    ┌──────────────────────────────────┐
    │         Cancelled                │ ← User cancelled
    │                                  │
    └──────────────────────────────────┘
```

---

## 💾 Database Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                    SMARTAGRI DATABASE                       │
│                                                             │
│  ┌──────────────────┐         ┌──────────────────────────┐ │
│  │   USERS          │         │     ORDERS               │ │
│  │  ──────────────  │         │  ────────────────────── │ │
│  │ _id              │◄────────┤ user (ref)               │ │
│  │ name             │     1:N │ phone                    │ │
│  │ phone (unique)   │         │ location                 │ │
│  │ location         │         │ crop                     │ │
│  │ preferredCrops[] │         │ qty                      │ │
│  │ avatar           │         │ unit                     │ │
│  │ createdAt        │         │ trackingNo (unique)      │ │
│  │ updatedAt        │         │ status                   │ │
│  │                  │         │ assignedTo               │ │
│  └──────────────────┘         │ expectedPickupDate       │ │
│                               │ photo                    │ │
│                               │ notes                    │ │
│                               │ createdAt                │ │
│                               │ updatedAt                │ │
│                               └──────────────────────────┘ │
│                                                             │
│  Indexes:                                                  │
│  • users: { phone: 1 }                                    │
│  • orders: { trackingNo: 1 }                              │
│  • orders: { createdAt: -1 }                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🌐 API Request/Response Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (React)                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Component State                                    │   │
│  │  ├─ formData: { phone, otp, name, ... }            │   │
│  │  ├─ loading: boolean                               │   │
│  │  └─ error: string                                  │   │
│  └────────────┬────────────────────────────────────────┘   │
│               │ axios.post(URL, data)                      │
│               │ axios.get(URL)                             │
│               │ axios.put(URL, data)                       │
│               ▼                                             │
└─────────────────────────────────────────────────────────────┘
                       HTTP REQUEST
       ┌──────────────────────────────────────────────┐
       │                                              │
       │  POST /auth/send-otp                         │
       │  Content-Type: application/json              │
       │  Body: { "phone": "9876543210" }             │
       │                                              │
       │  OR                                          │
       │                                              │
       │  GET /api/orders/track/JD567890              │
       │  Content-Type: application/json              │
       │                                              │
       └──────────────────┬───────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              BACKEND (Express.js)                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Request Processing:                                │   │
│  │  ├─ Route Matching: /api/orders/create              │   │
│  │  ├─ Middleware: CORS, bodyParser                   │   │
│  │  ├─ Controller: authController.sendOtp()           │   │
│  │  ├─ Validation: Check required fields              │   │
│  │  └─ Error Handling: Try/catch                      │   │
│  └────────────┬────────────────────────────────────────┘   │
│               │                                             │
│               ▼                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Database Operations (MongoDB)                      │   │
│  │  ├─ Order.create(data)                             │   │
│  │  ├─ User.findOne({ phone })                        │   │
│  │  ├─ Order.findOne({ trackingNo })                  │   │
│  │  └─ Order.updateOne()                              │   │
│  └────────────┬────────────────────────────────────────┘   │
│               │                                             │
│               ▼                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Response Generation:                               │   │
│  │  { success: true, data: {...} }                     │   │
│  │  OR                                                 │   │
│  │  { success: false, message: "Error" }               │   │
│  └────────────┬────────────────────────────────────────┘   │
│               │                                             │
└──────────────┼────────────────────────────────────────────────┘
               │ HTTP RESPONSE (JSON)
               │ Status Code: 200, 201, 400, 404, 500
               │
               ▼
┌─────────────────────────────────────────────────────────────┐
│                   FRONTEND (React)                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Response Handling:                                 │   │
│  │  ├─ Parse JSON                                      │   │
│  │  ├─ Check success status                            │   │
│  │  ├─ Update State                                    │   │
│  │  ├─ localStorage.setItem() if needed                │   │
│  │  └─ Redirect or show message                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  State Updates → Component Re-render → UI Update           │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication & Storage Flow

```
┌────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION FLOW                         │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  FRONTEND STORAGE:                                            │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  localStorage (Browser Storage)                         │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │ user: {                                          │  │ │
│  │  │   _id: "507f1f77bcf86cd799439011",              │  │ │
│  │  │   name: "Ramesh Patil",                         │  │ │
│  │  │   phone: "9876543210",                          │  │ │
│  │  │   location: "Pune",                             │  │ │
│  │  │   preferredCrops: ["Cotton", "Wheat"],          │  │ │
│  │  │   avatar: "/avatar1.jpg"                        │  │ │
│  │  │ }                                                │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │ language: "mr" (or "en")                        │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │ taluka: "Haveli"                                │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │ lastTrackingNo: "JD567890"                       │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                                │
│  BACKEND STORAGE:                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  MongoDB (Persistent Storage)                           │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │ users Collection                                 │  │ │
│  │  │ └─ User documents with all profile data         │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │ orders Collection                                │  │ │
│  │  │ └─ Order documents with tracking info           │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │ In-Memory Storage (Server)                       │  │ │
│  │  │ OTP_STORE = { "9876543210": 1234 }              │  │ │
│  │  │ (NOTE: Implement persistent storage in prod)    │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## 🎭 Component Rendering Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│               <BrowserRouter>                               │
│               App.jsx Routing Layer                         │
└──────────────────────┬──────────────────────────────────────┘
                       │
          ┌────────────┼────────────┬─────────────┐
          │            │            │             │
          ▼            ▼            ▼             ▼
      Landing      Auth Page   Dashboard     Sell Crop
      Page         (/auth)     (/dashboard)   Page
                  │                │          (/sell-crop)
                  │                │
          ┌───────┴────────┐       │
          │                │       │
       OTP Form         Register   ▼
                        Form    ┌──────────────────────────┐
                                │  Navbar (Sticky)         │
                                │  ├─ Language Toggle      │
                                │  ├─ Taluka Dropdown      │
                                │  └─ Navigation Links     │
                                └──────────┬───────────────┘
                                           │
                    ┌──────────────────────┼──────────────────────┐
                    │                      │                      │
                    ▼                      ▼                      ▼
              WeatherSection        TodayPriceSection  PricePrediction
              (Real-time weather)   (Market rates)      (Forecasts)
                    │                      │
                    └──────────┬───────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                    ▼                     ▼
            SmartInsights         FarmOverviewSection
            (AI Recommendations)  (Farm Health Cards)
                                  ├─ CropHealthCard
                                  ├─ IrrigationCard
                                  ├─ PriceCard
                                  └─ ProfitCard

State Management:
┌────────────────────────────────────┐
│      AppContext (Global)           │
│  ├─ language (Marathi/English)     │
│  ├─ loggedIn (Boolean)             │
│  └─ changeLanguage (Function)      │
└────────────────────────────────────┘
         │
         └─── Consumed by all components
              for language & auth state
```

---

## 📲 Multi-Language Support Architecture

```
┌────────────────────────────────────────────────────────────┐
│         TRANSLATIONS.JS                                    │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  TRANSLATIONS = {                                    │ │
│  │                                                      │ │
│  │    'en': {                                           │ │
│  │      navbar: {                                       │ │
│  │        home: "Home",                                │ │
│  │        dashboard: "Dashboard",                      │ │
│  │        ...                                          │ │
│  │      },                                             │ │
│  │      dashboard: {                                   │ │
│  │        title: "Welcome to Dashboard",               │ │
│  │        ...                                          │ │
│  │      },                                             │ │
│  │      sellCrop: {                                    │ │
│  │        ...                                          │ │
│  │      }                                              │ │
│  │    },                                               │ │
│  │                                                      │ │
│  │    'mr': {                                           │ │
│  │      navbar: {                                       │ │
│  │        home: "होम",                                  │ │
│  │        dashboard: "डॅशबोर्ड",                         │ │
│  │        ...                                          │ │
│  │      },                                             │ │
│  │      ...                                            │ │
│  │    }                                                │ │
│  │  }                                                  │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  Usage in Components:                                     │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  import { AppContext } from context                 │ │
│  │  import TRANSLATIONS from i18n/translations         │ │
│  │                                                      │ │
│  │  const MyComponent = () => {                        │ │
│  │    const { language } = useContext(AppContext)     │ │
│  │    const t = TRANSLATIONS[language]                │ │
│  │                                                      │ │
│  │    return <h1>{t.dashboard.title}</h1>              │ │
│  │  }                                                  │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  Language Switching:                                      │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  const { changeLanguage } = useContext(AppContext)  │ │
│  │                                                      │ │
│  │  <button onClick={() => changeLanguage('en')}>      │ │
│  │    English                                          │ │
│  │  </button>                                          │ │
│  │                                                      │ │
│  │  <button onClick={() => changeLanguage('mr')}>      │ │
│  │    मराठी                                             │ │
│  │  </button>                                          │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 🎯 Form Validation Flow

```
┌──────────────────────────────────────────────────────────┐
│              FORM SUBMISSION                             │
└──────────────────────┬───────────────────────────────────┘
                       │
                       ▼
            ┌─────────────────────┐
            │  Collect Form Data  │
            └─────────┬───────────┘
                      │
                      ▼
         ┌────────────────────────┐
         │  Client-Side Validation│
         │  • Required fields?    │
         │  • Email format?       │
         │  • Phone format?       │
         │  • Length checks?      │
         └────────────┬───────────┘
                      │
         ┌────────────▼──────────────┐
         │                           │
    Invalid              ✓ Valid
    │                    │
    ▼                    ▼
Show Error        ┌──────────────────┐
Message           │  Send to Backend  │
                  │  (API Request)    │
                  └────────┬──────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │ Backend Validation   │
                │ • Check duplicates?  │
                │ • Verify inputs?     │
                │ • Business logic?    │
                └────────┬─────────────┘
                         │
            ┌────────────▼──────────────┐
            │                           │
        Invalid            ✓ Valid
        │                  │
        ▼                  ▼
    Return Error      Save to DB
    Message
                           │
                           ▼
                    ┌─────────────────┐
                    │  Return Success │
                    │  Response       │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Update State    │
                    │ localStorage    │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  Redirect User  │
                    │  Show Success   │
                    │  Message        │
                    └─────────────────┘
```

---

## 🔗 Data Integration Points

```
┌──────────────────────────────────────────────────────────────┐
│                   FULL SYSTEM INTEGRATION                    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  FRONTEND                  API GATEWAY              BACKEND  │
│  (React + Vite)            (Express)                (Node)   │
│                                                              │
│  ┌─────────────┐           ┌──────────┐           ┌─────┐  │
│  │ Components  │──REQ──────▶│ Routes   │──AUTH────▶│ Ctrl│  │
│  │ (Forms)     │           │ Handler  │           │lers │  │
│  │             │           │          │           │     │  │
│  │ AppContext  │           ├──────────┤           └──┬──┘  │
│  │ (State)     │           │CORS      │              │      │
│  │             │           │Parser    │              ▼      │
│  │ localStorage│           │Middleware           ┌──────┐   │
│  │ (Storage)   │◀──RES─────│          │◀────────▶│Models│   │
│  └─────────────┘           │          │          │Schema│   │
│         │                   │          │          └──┬───┘   │
│         │                   └──────────┘             │       │
│         │                        ▲                   │       │
│         │                        │                   ▼       │
│         │                        │            ┌───────────┐ │
│         │                        └────────────│ MongoDB   │ │
│         │                                     │ Database  │ │
│         └──────────────────────────────────────│           │ │
│              (Reads/Writes)                    └───────────┘ │
│                                                              │
└──────────────────────────────────────────────────────────────┘

DATA FLOW CYCLE:
1. User inputs data in React component
2. Component validates and calls API
3. API Gateway (Express) receives request
4. Routes dispatcher directs to controller
5. Controller validates with business logic
6. Model (MongoDB) performs DB operation
7. Response sent back to frontend
8. Frontend updates state & localStorage
9. Component re-renders with new data
10. User sees updated UI
```

---

## 🎯 Tracking Number Lifecycle

```
ORDER CREATED
     │
     │  ┌─────────────────────────────────┐
     │  │ Generate Tracking Number        │
     │  │ Format: JD + 6 random digits    │
     │  │ Example: JD567890               │
     │  │ Uniqueness: Indexed in DB       │
     │  └────────────┬────────────────────┘
     │               │
     ▼               ▼
┌────────────────────────────────┐
│  Tracking# Stored in:          │
│  1. Database (orders.trackingNo)│
│  2. Frontend localStorage      │
│  3. Displayed on success screen│
│  4. Email to user (future)     │
└────────────────────────────────┘
     │
     ▼
USER SHARES TRACKING#
     │
     │  ┌────────────────────────────────┐
     │  │ Farmer sends to:               │
     │  │ • Buyer/Agent via WhatsApp     │
     │  │ • SMS/Email                    │
     │  │ • Print/Write down             │
     │  └────────────┬───────────────────┘
     │               │
     ▼               ▼
TRACKING QUERY
     │
     │  ┌────────────────────────────────┐
     │  │ User enters JD567890 in track  │
     │  │ page (/track)                  │
     │  │ API: GET /orders/track/:trackNo│
     │  └────────────┬───────────────────┘
     │               │
     ▼               ▼
┌────────────────────────────────┐
│  Database Query:               │
│  Find order by trackingNo      │
│  Return complete order data    │
│  ├─ Status                     │
│  ├─ Assigned Agent             │
│  ├─ Expected Pickup Date       │
│  └─ etc.                       │
└────────────────────────────────┘
     │
     ▼
DISPLAY TRACKING INFO
     │
     │  ┌────────────────────────────────┐
     │  │ Show on PickupStatusSection    │
     │  │ • Status progression bar       │
     │  │ • Current status highlighted   │
     │  │ • Agent details                │
     │  │ • Timeline                     │
     │  └────────────┬───────────────────┘
     │               │
     ▼               ▼
STATUS UPDATES (Real-time)
     │
     │  ┌────────────────────────────────┐
     │  │ Statuses:                      │
     │  │ Requested → Assigned →         │
     │  │ Out for Pickup → Completed     │
     │  │                                │
     │  │ (In future: WebSocket for      │
     │  │  real-time updates)            │
     │  └────────────┬───────────────────┘
     │               │
     ▼               ▼
ORDER COMPLETED
     │
     └──→ Status = "Completed"
          User can provide feedback
          End of lifecycle
```

---

**Last Updated**: April 2024
**Diagram Version**: 1.0

