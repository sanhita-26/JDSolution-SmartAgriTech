# Frontend Components Documentation

## 📑 Table of Contents
1. [Component Overview](#component-overview)
2. [Page Components](#page-components)
3. [Reusable Components](#reusable-components)
4. [Component Props & Usage](#component-props--usage)

---

## 🎨 Component Overview

The frontend is structured using React's component-based architecture with the following patterns:

- **Page Components**: Full-page layouts (in `/pages`)
- **Feature Components**: Reusable UI blocks (in `/components`)
- **Section Components**: Grouped feature components (in `/components/FarmOverviewSection/`)
- **Context**: Global state management via AppContext

### Component Hierarchy

```
App.jsx (Router)
├── LandingPage
├── AuthPage
│   └── Auth Logic (OTP, Registration)
├── Dashboard
│   ├── Navbar
│   ├── WeatherSection
│   ├── TodayPriceSection
│   ├── PricePredictionSection
│   ├── SmartInsightsSection
│   └── FarmOverviewSection
│       ├── CropHealthCard
│       ├── IrrigationInsightsCard
│       ├── MarketPricePredictionCard
│       └── ProfitEstimatorCard
├── SellCrop
│   └── Form Component
├── PickupStatusSection
│   └── Order Tracking
├── ProfilePage
│   └── User Profile Management
└── Support
    └── Support Information
```

---

## 📄 Page Components

### 1. **LandingPage** (`pages/LandingPage.jsx`)

**Purpose**: Welcome screen for unauthenticated users

**Key Features**:
- Hero section with app branding
- Feature highlights
- Call-to-action buttons (Sign In / Sign Up)
- Responsive design
- Language support via AppContext

**Key Props**: None (uses AppContext for language)

**Usage Flow**:
```
User visits "/" → LandingPage loads
→ Can click "Get Started" to go to /auth
→ Or login existing users
```

---

### 2. **AuthPage** (`pages/AuthPage.jsx`)

**Purpose**: Handles user authentication (Login/Registration)

**Key Features**:
- **Two Modes**:
  1. **Phone Number Entry**: User enters phone to send OTP
  2. **OTP Verification**: User enters received OTP
  3. **Registration**: New user form (name, location, preferred crops)

**State Management**:
```javascript
{
  phone: String,           // User's phone number
  otp: String,            // 4-digit OTP
  mode: 'phone'|'otp'|'register',
  isLoading: Boolean,
  error: String,
  formData: {
    name: String,
    phone: String,
    location: String,
    preferredCrops: [String]
  }
}
```

**API Calls**:
```javascript
POST /auth/send-otp
  → Generates OTP (console logs it for testing)
  
POST /auth/verify-otp
  → Validates OTP and returns user
  
POST /auth/register
  → Creates new user account
```

**Data Persistence**:
```javascript
localStorage.setItem('user', JSON.stringify(userData))
// Stores: { _id, name, phone, location, preferredCrops, avatar }
```

**Success Flow**:
```
Phone Entry → OTP Sent → OTP Verified → 
Existing User? → Dashboard : Registration Form → 
User Created → Dashboard
```

---

### 3. **Dashboard** (`pages/Dashboard.jsx`)

**Purpose**: Main hub after login showing farm insights

**Key Features**:
- Navbar with navigation
- Multiple insight sections
- Real-time data display
- Responsive grid layout

**Child Components**:
1. **Navbar**: Navigation & language switcher
2. **WeatherSection**: Current weather & forecast
3. **TodayPriceSection**: Current crop market prices
4. **PricePredictionSection**: Price trend forecasts
5. **SmartInsightsSection**: AI recommendations
6. **FarmOverviewSection**: 
   - CropHealthCard
   - IrrigationInsightsCard
   - MarketPricePredictionCard
   - ProfitEstimatorCard

**Layout Structure**:
```
┌─────────────────────────────────────┐
│          Navbar                     │
├─────────────────────────────────────┤
│  Weather     │  Today Price         │
├──────────────┼──────────────────────┤
│ Price        │  Smart Insights      │
│ Prediction   │                      │
├─────────────────────────────────────┤
│        Farm Overview Section        │
│  ┌──────────┬──────────┬──────────┐ │
│  │ Crop     │Irrigation│ Market   │ │
│  │ Health   │Insights  │ Price    │ │
│  └──────────┴──────────┴──────────┘ │
│  ┌──────────┐                        │
│  │ Profit   │                        │
│  │ Estimator│                        │
│  └──────────┘                        │
└─────────────────────────────────────┘
```

**Data Source**:
- Fetches from localStorage (cached user data)
- Could integrate real APIs for live data

---

### 4. **SellCrop** (`pages/SellCrop.jsx`)

**Purpose**: Form to create and submit crop orders

**Form Fields**:
```javascript
{
  crop: String,        // Dropdown: Cotton, Wheat, Corn, etc.
  quantity: Number,    // Amount to sell
  unit: String,        // 'kg' or 'quintal'
  photo: File,         // Image upload (converted to base64)
  notes: String        // Optional remarks
}
```

**Key Features**:
- Dropdown selection for crop types
- Photo upload with preview
- Real-time form validation
- Loading state during submission

**API Call**:
```javascript
POST /api/orders/create
Body: {
  user: String,
  phone: String,
  location: String,
  crop: String,
  qty: Number,
  unit: String,
  photo: String (base64)
}

Response: {
  success: true,
  order: {
    _id: ObjectId,
    trackingNo: "JD567890",
    status: "Requested",
    ...
  }
}
```

**Success Flow**:
```
Form Submission 
→ Validation 
→ API Call 
→ Order Created 
→ Store trackingNo in localStorage
→ Redirect to /success
```

**Error Handling**:
- Field validation errors
- API error messages
- Network error handling

---

### 5. **PickupStatusSection** (`pages/PickupStatusSection.jsx`)

**Purpose**: Track crop orders by tracking number

**Key Features**:
- Tracking number input
- Real-time order status display
- Status progression visualization
- Assigned agent information

**Status Stages**:
```
┌──────────┐    ┌──────────┐    ┌────────────────┐    ┌───────────┐
│Requested │ → │ Assigned │ → │ Out for Pickup │ → │ Completed │
└──────────┘    └──────────┘    └────────────────┘    └───────────┘
                                        ↓
                                  └──────────────┘
                                  (Can Cancel)
```

**API Call**:
```javascript
GET /api/orders/track/:trackingNo
Response: {
  success: true,
  order: {
    trackingNo: "JD567890",
    status: "Out for Pickup",
    assignedTo: "Agent Suresh",
    expectedPickupDate: "2024-01-20",
    crop: "Cotton",
    qty: 100,
    ...
  }
}
```

**Display Information**:
- Order details (crop, quantity, date)
- Current status with progress indicator
- Assigned pickup agent name
- Expected pickup date/time
- Order creation date

---

### 6. **ProfilePage** (`pages/ProfilePage.jsx`)

**Purpose**: User profile management and editing

**Features**:
- Display user information
- Edit profile sections
- Preferred crops management
- Avatar display/change
- Save changes

**Editable Fields**:
```javascript
{
  name: String,
  location: String,
  preferredCrops: [String],
  avatar: String (image URL)
}
```

**API Call**:
```javascript
PUT /api/users/update/:id
Body: {
  name: String,
  location: String,
  preferredCrops: [String],
  avatar: String
}

Response: {
  success: true,
  user: { ...updated user... }
}
```

**Update Flow**:
```
Edit Form → Validation → API Call → 
localStorage Update → Success Message → 
Profile Refresh
```

---

### 7. **Support** (`pages/Support.jsx`)

**Purpose**: Help and customer support information

**Key Features**:
- FAQ section
- Contact information
- Support categories
- Responsive design

---

## 🧩 Reusable Components

### 1. **Navbar** (`components/Navbar.jsx`)

**Purpose**: Navigation header with language & location support

**Key Props**:
```javascript
// No direct props (uses AppContext)
```

**Features**:
- Sticky positioned header
- Language switcher (Marathi/English)
- Taluka (District) selector
- Conditional nav links based on login
- Active route highlighting
- Mobile-responsive menu

**State**:
```javascript
{
  menuOpen: Boolean,      // Mobile menu toggle
  talukaOpen: Boolean,    // District dropdown toggle
  selectedTaluka: String  // Currently selected district
}
```

**Location Data**:
```javascript
TALUKA_MAP = {
  Pune: [
    "Haveli", "Mulshi", "Maval", "Junnar",
    "Ambegaon", "Shirur", "Purandar", "Bhor",
    "Velhe", "Daund", "Baramati", "Indapur"
  ]
}
```

**Data Persistence**:
```javascript
localStorage.setItem('taluka', selectedTaluka)
```

---

### 2. **WeatherSection** (`components/WeatherSection.jsx`)

**Purpose**: Display current weather and forecast

**Features**:
- Current temperature
- Weather condition with icon
- Humidity & wind speed
- Forecast for next days
- Location-based data

**Data Source**: (Currently mock data, can integrate with)
- OpenWeatherMap API
- Weather.com API
- Local weather service

---

### 3. **TodayPriceSection** (`components/TodayPriceSection.jsx`)

**Purpose**: Show current market prices of crops

**Features**:
- List of major crops
- Current market rates
- Price per unit
- Market trend indicators

**Crop Types**: (Common crops in Maharashtra)
- Cotton
- Wheat
- Corn
- Sugarcane
- Onion
- Tomato

---

### 4. **PricePredictionSection** (`components/PricePredictionSection.jsx`)

**Purpose**: Show predicted future crop prices

**Features**:
- Price trend charts
- Forecast for next 7-30 days
- Trend indicators (up/down)
- Confidence level

**Data Integration Options**:
- Machine Learning model predictions
- Historical price analysis
- Market trend analysis

---

### 5. **SmartInsightsSection** (`components/SmartInsightsSection.jsx`)

**Purpose**: AI-driven recommendations and insights

**Features**:
- Crop recommendation suggestions
- Planting tips
- Market opportunities
- Risk alerts

**Example Insights**:
- "Cotton prices rising, good time to sell"
- "Upcoming heavy rains, increase irrigation"
- "Market demand for corn is high this month"

---

### 6. **SuccessScreen** (`components/SuccessScreen.jsx`)

**Purpose**: Order confirmation screen after successful crop sale

**Features**:
- Success message
- Tracking number display
- Copy to clipboard button
- Order summary
- Next steps information

**Display Information**:
```javascript
{
  trackingNo: "JD567890",
  cropName: "Cotton",
  quantity: 100,
  unit: "kg",
  status: "Requested",
  orderDate: "2024-01-18"
}
```

---

### 7. **FarmOverviewSection** (`components/FarmOverviewSection/FarmOverviewSection.jsx`)

**Purpose**: Container component grouping farm health metrics

**Child Components**:
1. **CropHealthCard**
2. **IrrigationInsightsCard**
3. **MarketPricePredictionCard**
4. **ProfitEstimatorCard**

**Layout**:
```
┌─ Farm Overview Section ──────────────┐
│ ┌──────────┬──────────┬──────────┐   │
│ │ Crop     │Irrigation│ Market   │   │
│ │ Health   │Insights  │ Price    │   │
│ └──────────┴──────────┴──────────┘   │
│ ┌──────────┐                          │
│ │ Profit   │                          │
│ │ Estimator│                          │
│ └──────────┘                          │
└─────────────────────────────────────┘
```

---

### 8. **CropHealthCard** (`components/FarmOverviewSection/CropHealthCard.jsx`)

**Purpose**: Display crop health metrics

**Metrics Shown**:
- Overall health status (Excellent/Good/Fair/Poor)
- Moisture level
- Nutrient status
- Disease indicators
- Visual health bar

**Data Fields**:
```javascript
{
  cropName: String,
  health: "Good" | "Fair" | "Poor" | "Excellent",
  moistureLevel: Number (0-100),
  nutrientStatus: String,
  diseaseRisk: String
}
```

---

### 9. **IrrigationInsightsCard** (`components/FarmOverviewSection/IrrigationInsightsCard.jsx`)

**Purpose**: Show irrigation schedule and water management

**Features**:
- Recommended watering frequency
- Next watering date/time
- Water level in soil
- Irrigation schedule
- Alert for dry conditions

**Data**:
```javascript
{
  cropName: String,
  nextWateringDate: String,
  soilMoisture: Number (0-100),
  waterNeeded: String,
  schedule: "Daily" | "Alternate" | "Weekly"
}
```

---

### 10. **MarketPricePredictionCard** (`components/FarmOverviewSection/MarketPricePredictionCard.jsx`)

**Purpose**: Market price trends and predictions

**Features**:
- Current price display
- Predicted price
- Price trend (up/down/stable)
- Best selling time recommendation
- Historical price graph

**Data**:
```javascript
{
  cropName: String,
  currentPrice: Number,
  predictedPrice: Number,
  trend: "up" | "down" | "stable",
  confidence: Number (0-100),
  bestTimeToSell: String
}
```

---

### 11. **ProfitEstimatorCard** (`components/FarmOverviewSection/ProfitEstimatorCard.jsx`)

**Purpose**: Calculate expected profit from crop sale

**Calculation**:
```
Profit = (Predicted Price × Quantity) - Production Cost
```

**Features**:
- Estimated revenue
- Production cost breakdown
- Net profit estimate
- ROI percentage
- Break-even analysis

**Data**:
```javascript
{
  cropName: String,
  quantity: Number,
  productionCost: Number,
  estimatedPrice: Number,
  estimatedRevenue: Number,
  estimatedProfit: Number,
  roi: Number (percentage)
}
```

---

## 🔧 Component Props & Usage

### Context Hook Usage

```javascript
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function MyComponent() {
  const { language, changeLanguage, loggedIn, setLoggedIn } = 
    useContext(AppContext);
  
  // Use language
  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
  };
  
  return (
    <div>
      <button onClick={() => handleLanguageChange('en')}>
        English
      </button>
    </div>
  );
}
```

### API Integration Pattern

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/orders/create`,
      orderData,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'API Error');
  }
};
```

### Form Handling Pattern

```javascript
const [formData, setFormData] = useState({
  crop: '',
  quantity: '',
  unit: 'kg',
  notes: ''
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validation
  if (!formData.crop || !formData.quantity) {
    setError('Please fill all fields');
    return;
  }
  
  // API Call
  try {
    const result = await createOrder(formData);
    localStorage.setItem('lastOrder', JSON.stringify(result.order));
    navigate('/success');
  } catch (err) {
    setError(err.message);
  }
};
```

### Navigation Pattern

```javascript
import { useNavigate } from 'react-router-dom';

export default function MyComponent() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };
  
  return <button onClick={handleLogout}>Logout</button>;
}
```

---

## 📱 Styling & Responsive Design

### Tailwind CSS Usage

All components use **Tailwind CSS** utility classes:

```javascript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="p-4 rounded-lg shadow-md bg-white">
    {/* Card content */}
  </div>
</div>
```

### Responsive Breakpoints
- **Mobile**: Default (< 640px)
- **Tablet**: `md:` (640px - 1024px)
- **Desktop**: `lg:` (> 1024px)

---

## 🌐 Multi-language Support

### Translation Usage

```javascript
import TRANSLATIONS from '../i18n/translations';

const MyComponent = () => {
  const { language } = useContext(AppContext);
  const t = TRANSLATIONS[language];
  
  return <h1>{t.dashboard.title}</h1>;
};
```

### Translation Structure

```javascript
TRANSLATIONS = {
  'en': {
    navbar: { ... },
    dashboard: { ... },
    sellCrop: { ... },
    ...
  },
  'mr': {
    navbar: { ... },
    dashboard: { ... },
    sellCrop: { ... },
    ...
  }
}
```

---

## 🔒 Data Security in Frontend

### localStorage Best Practices

```javascript
// Store only non-sensitive user data
const userObject = {
  _id: '...',
  name: 'User Name',
  phone: '9876543210',
  location: 'Pune'
};

localStorage.setItem('user', JSON.stringify(userObject));

// Retrieve
const user = JSON.parse(localStorage.getItem('user'));

// Clear on logout
localStorage.removeItem('user');
localStorage.clear(); // Clear all
```

### Never Store Sensitive Data
❌ Don't store: passwords, credit cards, OTPs, API keys

---

**Last Updated**: April 2024
**Component Count**: 11+
**Total Pages**: 7
