# Quick Reference Guide & FAQ

## 📌 Quick Reference

### Important Files & Their Purpose

| File | Purpose | Type |
|------|---------|------|
| `server.js` | Express app initialization | Backend Core |
| `db.js` | MongoDB connection handler | Backend Core |
| `authController.js` | Authentication logic | Backend Logic |
| `User.js` | User data schema | Backend Model |
| `Order.js` | Order data schema | Backend Model |
| `authRoutes.js` | Authentication endpoints | Backend Routes |
| `userRoutes.js` | User management endpoints | Backend Routes |
| `orderRoutes.js` | Order operations endpoints | Backend Routes |
| `App.jsx` | Main app component | Frontend Core |
| `AppContext.jsx` | Global state management | Frontend Context |
| `Navbar.jsx` | Navigation component | Frontend UI |
| `LandingPage.jsx` | Home page | Frontend Page |
| `AuthPage.jsx` | Login/signup page | Frontend Page |
| `Dashboard.jsx` | Main dashboard | Frontend Page |
| `SellCrop.jsx` | Crop selling form | Frontend Page |
| `ProfilePage.jsx` | User profile management | Frontend Page |
| `PickupStatusSection.jsx` | Order tracking page | Frontend Page |

---

## 🚀 Quick Start Commands

### Backend
```bash
cd backend
npm install                # Install dependencies
npm start                  # Start server (port 5000)
```

### Frontend
```bash
cd frontend
npm install                # Install dependencies
npm run dev                # Start dev server (port 5173)
npm run build              # Build for production
npm run preview            # Preview production build
```

---

## 🔑 Key Concepts

### Authentication Flow
```
User Phone Entry
→ OTP Generated (console logs it)
→ OTP Verification
→ Existing User? Login : Registration
→ User saved to MongoDB
→ Stored in localStorage
→ Redirect to Dashboard
```

### Crop Selling Flow
```
Form Fill (crop, qty, unit, photo)
→ Validation
→ API: POST /api/orders/create
→ Tracking# Generated (JD + 6 digits)
→ Order saved to MongoDB
→ Success screen with tracking#
```

### Order Tracking Flow
```
Enter Tracking#
→ API: GET /api/orders/track/:trackingNo
→ Status fetched from MongoDB
→ Display status progression
→ Show assigned agent & date
```

---

## 💾 Data Storage Locations

### Frontend (Browser localStorage)
```javascript
// User Data
localStorage.user = {
  _id, name, phone, location, preferredCrops, avatar
}

// Language Preference
localStorage.language = 'mr' or 'en'

// Taluka (District)
localStorage.taluka = 'Pune' or other

// Last Tracking#
localStorage.lastTrackingNo = 'JD567890'
```

### Backend (MongoDB)
```
Database: smartagri

Collections:
  - users
    ├── _id, name, phone, location, preferredCrops
  
  - orders
    ├── _id, user, phone, location, crop, qty, unit
    ├── trackingNo, status, assignedTo, expectedPickupDate
```

---

## 🌐 API Quick Reference

### Most Used Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /auth/send-otp | Send OTP |
| POST | /auth/verify-otp | Verify OTP |
| POST | /auth/register | Register user |
| POST | /api/users/check-phone | Check if phone exists |
| PUT | /api/users/update/:id | Update profile |
| POST | /api/orders/create | Create order |
| GET | /api/orders/track/:trackingNo | Track order |

---

## 📱 Supported Crops

Currently supported in the system:
- Cotton
- Wheat
- Corn
- Sugarcane
- Onion
- Tomato
- Rice

---

## 🗣️ Supported Languages

- **English** (en)
- **Marathi** (mr) - Default language

**How to Add New Language**:
1. Update `translations.js` with new language code
2. Add translations for all keys
3. Update language selector in Navbar

---

## 🏙️ Supported Locations

Currently configured for Pune with these Talukas:
1. Haveli
2. Mulshi
3. Maval
4. Junnar
5. Ambegaon
6. Shirur
7. Purandar
8. Bhor
9. Velhe
10. Daund
11. Baramati
12. Indapur

**How to Add New City**:
1. Update `TALUKA_MAP` in Navbar.jsx
2. Add new city and its talukas

---

## ❓ FAQ

### General Questions

**Q: How do I run the entire project locally?**
```
1. Start MongoDB service
2. Open 2 terminal windows
3. Terminal 1: cd backend && npm start
4. Terminal 2: cd frontend && npm run dev
5. Open http://localhost:5173 in browser
```

**Q: What does "tracking number" mean?**
A: Unique 8-character ID (JD + 6 digits) assigned to each order. Used to track order status.

**Q: How long does OTP stay valid?**
A: Currently no expiry. In production, implement 5-10 minute expiry.

---

### Backend Questions

**Q: How do I see the OTP during testing?**
A: Check browser console or terminal logs. OTP is logged to server console.

**Q: Can I change the tracking number format?**
A: Yes, modify `generateTrackingNo()` in `orderRoutes.js`:
```javascript
const generateTrackingNo = () => {
  return "FARM" + Date.now(); // Custom format
};
```

**Q: How do I add more fields to Order?**
A: 
1. Update schema in `Order.js`
2. Update API endpoints to handle new field
3. Update frontend form

**Q: Can I use PostgreSQL instead of MongoDB?**
A: Yes, replace Mongoose with Sequelize and update models accordingly.

**Q: How do I increase file upload size?**
A: In `server.js`, change:
```javascript
app.use(express.json({ limit: "50mb" })); // Was 10mb
```

---

### Frontend Questions

**Q: How do I add a new page?**
A: 
1. Create file in `pages/` folder
2. Import in `App.jsx`
3. Add new `<Route>` in router

**Q: How do I add a new component?**
A:
1. Create file in `components/` folder
2. Create React component
3. Import where needed

**Q: How do I change the theme colors?**
A: All colors use Tailwind CSS utility classes. Change in component files or update `tailwind.config.js`.

**Q: How do I add new language translations?**
A:
```javascript
// In i18n/translations.js
export default {
  'en': { /* English translations */ },
  'mr': { /* Marathi translations */ },
  'hi': { /* Add Hindi */ }
}
```

**Q: Can I store images in database instead of localStorage?**
A: Yes, currently images are stored as base64. For production:
1. Use AWS S3 or Firebase Storage
2. Store URL in database
3. Display from cloud

---

### Authentication Questions

**Q: How do I add password-based authentication?**
A: 
1. Add `password` field to User model
2. Hash password using bcrypt
3. Update login to verify password
4. Remove OTP requirement

**Q: How do I add JWT tokens?**
A:
```javascript
import jwt from 'jsonwebtoken';

const token = jwt.sign(
  { userId: user._id, phone: user.phone },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// Send token to frontend
res.json({ success: true, token, user });
```

**Q: Is the OTP system real?**
A: No, it's fake for testing. In production:
1. Use Twilio or FastSMS for real SMS
2. Store OTP with expiry
3. Rate limit OTP requests

---

### Database Questions

**Q: How do I backup my MongoDB data?**
```bash
mongodump --db smartagri --out ./backup

# Restore from backup
mongorestore --db smartagri ./backup/smartagri
```

**Q: How do I add database indexes?**
```javascript
// In model file
userSchema.index({ phone: 1 });
orderSchema.index({ trackingNo: 1 });
orderSchema.index({ createdAt: -1 });
```

**Q: Can I use MongoDB Atlas (cloud)?**
A: Yes, update `.env`:
```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/smartagri
```

---

### Deployment Questions

**Q: How do I deploy the backend?**
Options:
- **Heroku**: `git push heroku main`
- **Railway**: Connect GitHub repo
- **AWS EC2**: SSH and deploy manually
- **DigitalOcean**: Similar to AWS

**Q: How do I deploy the frontend?**
Options:
- **Vercel**: `vercel deploy`
- **Netlify**: Connect GitHub repo
- **AWS S3 + CloudFront**: `npm run build` → upload to S3

**Q: Do I need SSL certificate?**
A: Yes, for production use HTTPS. Get free certificate from Let's Encrypt.

---

### Performance Questions

**Q: How do I optimize database queries?**
A:
1. Add indexes to frequently queried fields
2. Use `lean()` for read-only queries
3. Implement pagination for large lists
4. Use database projections

**Q: How do I reduce frontend bundle size?**
A:
```bash
npm run build  # Shows bundle size
npm install -D vite-plugin-visualizer

# Analyze
npm run build -- --mode analyze
```

**Q: Can I cache API responses?**
A: Yes, use axios-cache-adapter or implement local caching:
```javascript
const cache = {};

async function cachedFetch(url) {
  if (cache[url]) return cache[url];
  const data = await axios.get(url);
  cache[url] = data;
  return data;
}
```

---

### Security Questions

**Q: How do I secure API endpoints?**
A:
1. Add authentication middleware
2. Use JWT tokens
3. Validate all inputs
4. Rate limit requests
5. Use HTTPS only

**Q: Should I expose MongoDB directly?**
A: **NO**. Always use API endpoints. Never expose database connection string to frontend.

**Q: How do I prevent SQL/NoSQL injection?**
A: 
- Use Mongoose (prevents SQL injection)
- Validate all inputs
- Use parameterized queries
- Sanitize user inputs

**Q: Should I store sensitive data in localStorage?**
A: **NO**. Never store passwords, OTPs, API keys, or credit cards. Only store user ID and profile info.

---

### Common Issues & Solutions

**Issue**: "MongoDB Connection Error"
```
Solution: 
1. Check MongoDB service is running
2. Verify MONGO_URI in .env
3. Check network connectivity
```

**Issue**: "CORS error"
```
Solution:
1. Backend CORS is enabled (origin: "*")
2. Check API URL in frontend
3. Verify request headers
```

**Issue**: "Image not uploading"
```
Solution:
1. Check file size < 10MB
2. Convert to base64 properly
3. Check Content-Type header
```

**Issue**: "Port already in use"
```
Solution:
# Kill process on port
lsof -i :5000
kill -9 <PID>

# Or use different port
PORT=5001 npm start
```

---

## 📞 Support Contacts

- **GitHub Issues**: Create issue in repository
- **Email**: support@smartagritech.com
- **Phone**: +91-XXXXXXXXXX
- **Chat**: Discord/Slack community

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Express.js Docs](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Axios Documentation](https://axios-http.com)

---

## 🔄 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Jan 2024 | Initial release |
| 1.1.0 | Feb 2024 | Added price prediction |
| 1.2.0 | Mar 2024 | Multi-language support |
| 1.3.0 | Apr 2024 | Weather integration |

---

**Last Updated**: April 2024
**Maintained By**: JDSolution SmartAgriTech Team
**Documentation Version**: 1.0
