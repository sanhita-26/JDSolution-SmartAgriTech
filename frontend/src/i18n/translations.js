const TRANSLATIONS = {
  en: {
    title: "Smart Agriculture",

    // Landing page
    landingTitle: "Smart Farmer, Smart Decisions.",
    landingSubtitle: "Prices, weather and pickup info for every farmer.",
    getStarted: "Get Started",
    weather: "Weather Forecast",
    benefits: "Farmer Benefits",
    login: "Login",
    signup: "Sign Up",

    // Navbar
    sell: "Sell Crop",
    track: "Track Order",
    profile: "Profile",
    support: "Support",
    logout: "Logout",

    // Dashboard
    location: "Location",
    todayPrice: "Today’s Crop Price",
    prediction: "Price Prediction",
    insights: "Smart Insights",

    cards: {
      today: "Today’s Price",
      future: "Future Price",
      weather: "Weather",
      pickup: "Pickup Status",
    },

    // Success screen
    successTitle: "Request Submitted!",
    successLine1: "Your sell request for",
    successLine2: "of",
    successLine3: "has been sent to JD Solution.",
    redirecting: "Redirecting to pickup status...",

    // Crops
    rice: "Rice",
    wheat: "Wheat",
    soybean: "Soybean",
    sugarcane: "Sugarcane",
    cotton: "Cotton",
    maize: "Maize",
    jowar: "Jowar",
    bajra: "Bajra",
    tur: "Tur (Pigeon Pea)",
    chana: "Chana (Chickpea)",
    onion: "Onion",
    tomato: "Tomato",

    // Sell crop page
    sellYourCrop: "Sell Your Crop",
    bestPriceLine: "Get best prices from JD Solution",
    selectCrop: "Select Crop",
    jdPrice: "JD Solution Price",
    mandiPrice: "Mandi Price",
    youSave: "You save",
    per: "per",
    back: "Back",
    enterQty: "Enter Quantity",
    qtyPlaceholder: "Enter quantity",
    kg: "kg",
    quintal: "quintal",
    addPhotos: "Add Photos (Optional)",
    addPhotoTap: "Tap to add crop photos",
    notes: "Notes (Optional)",
    submit: "Submit Request",
    // AUTH PAGE
    auth_instruction: "Enter your mobile number to continue",
    auth_phone: "Mobile Number",
    auth_send_otp: "Get OTP",
    auth_enter_otp: "Enter OTP",
    auth_verify_otp: "Verify OTP",
    auth_name: "Full Name",
    auth_location: "Farm Location",
    auth_create_account: "Create Account",
    auth_new_user: "New user?",
    auth_have_account: "Already have an account?",
    auth_select_crop: "Select Preferred Crop",

    // DASHBOARD GREETING
    hi: "Hi",
    farmer: "Farmer",

    locationNotDetected: "Not detected",
    geoNotSupported: "Geolocation not supported",
    permissionDenied: "Permission denied",
    puneMandi: "Pune Market Yard",
    mainMandi: "Main Mandi",

    autoDetected: "Auto-detected location",
    manualSelect: "Manual location selection",
    detect: "Detect",
    apply: "Apply",

    selectState: "Select State",
    selectCity: "Select City",
    nearestMandi: "Nearest Mandi",

    pricePredictionTitle: "Crop Price Prediction",
    rising: "Rising",
    falling: "Falling",

    advice_good_sell: "Good time to sell",
    advice_hold: "Hold for now",
    advice_tmr_high: "Expect higher prices tomorrow",

    maize: "Maize",
    greenPeas: "Green Peas",
    apple: "Apple",
    banana: "Banana",
    grapes: "Grapes",
    orange: "Orange",

    mandiPriceLabel: "Mandi Price",
    jdPriceLabel: "JD Solution",

    weatherForecast: "Weather & Forecast",
    field1: "Farm Field 1",
    field2: "Farm Field 2",
    field3: "Farm Field 3",

    lightRain: "Light Rain",
    sunny: "Sunny",
    cloudy: "Cloudy",

    irrigationAdvice: "Carry irrigation if needed",
    harvestAdvice: "Perfect weather for harvesting",
    moistureAdvice: "Monitor soil moisture",

    smartInsights: "Smart Insights",

    insight_rain: "Rain Alert",
    insight_important: "Important",
    insight_rain_desc:
      "Heavy rain expected in 2 days. Consider selling perishables early.",

    insight_wheat: "Wheat Prices Rising",
    insight_wheat_desc: "Wheat prices up 3.2% this week. Good time to sell.",

    insight_tomato: "High Tomato Demand",
    insight_tomato_desc:
      "Festival season ahead. Tomato demand expected to increase.",

    insight_tip: "Storage Tip",
    insight_tip_desc:
      "Reduce moisture in wheat before storing to prevent spoilage.",

    support_desc: "Need help? We are here for you.",
    support_phone: "Phone",
    support_email: "Email",
    support_time: "Working Hours",

    pickupTitle: "Pickup Status",
    pickupSubtitle: "Track your sell requests",
    pickupRequestNo: "Request Number",
    pickupPlaceholder: "Enter Request Number",
    pickupTrack: "Track Pickup",
    pickupActive: "Active Request",
    pickupInProgress: "In Progress",
    pickupRequestSent: "Request Sent",
    pickupAssigned: "Pickup Assigned",
    pickupOutForPickup: "Out for Pickup",
    pickupCompleted: "Completed",
    pickupAssignedTo: "Assigned to",
    pickupExpected: "Expected",
    pickupCall: "Call Support",
    pickupNotFound: "No request found for this number",

    profileTitle: "My Profile",
    profileUpdated: "Profile updated successfully!",
    profileName: "Full Name",
    profilePhone: "Mobile Number",
    profileAddress: "Address",
    profileSelectCity: "Select Your City",
    profileLanguage: "English", // shows current language
    profileEdit: "Edit Profile",
    profileSave: "Save Changes",
    profileCancel: "Cancel",

    dashboardOverview: "Farm Overview",
    overviewSubtitle: "Quick summary to help you decide today",
    yourCrops: "Your Crops",
    checkPrices: "Check Prices",
    checkWeather: "Check Weather",
    overview: "Overview",

    trendingCrops: "Trending Crops",

    myRequests: "My Requests",

    farmerBenefitsTitle: "Farmer Benefits",
    farmerBenefitsSubtitle: "Smart farming made simple and powerful",

    dashboardOverview: "Farm Overview",
    overviewSubtitle: "Quick insights about your farm and crops",
    yourCrops: "Your Crops",
    checkPrices: "See Market Rates",
    checkWeather: "See Weather",

    cropHealthTitle: "Crop Health",
    cropHealthStatus: "Overall Status",
    cropHealthHealthy: "Healthy & Stable",
    cropHealthIssues: "2 minor nutrient issues detected",

    irrigationTitle: "Irrigation Insights",
    irrigationRecommended: "Recommended today",
    irrigationPerPlant: "per plant",
    soilMoisture: "Soil Moisture",
    soilMoistureLevel: "Moderate",
    waterSavingTip: "Save around 18% water by irrigating in the evening",

    marketPredictionTitle: "Market Price Prediction",
    marketTrendNote: "Based on recent market trends",

    profitEstimatorTitle: "Expense vs Profit",
    expensesLabel: "Expenses",
    expectedProfitLabel: "Expected Profit",
    projectedProfit: "Projected profit",
    regionalComparison: "Lower spending than 72% farmers in xxxxxxxxx region",
    dashboard: "Dashboard",
sell: "Sell Crop",
track: "Track Order",
support: "Support",
logout: "Logout",
selectTaluka: "Select Taluka",
selectTalukaLabel: "Select your taluka",
dashboardOverview: "Farm Overview",

    farmerBenefits: [
      {
        title: "Accurate Crop Planning",
        desc: "Weather-based predictions help choose the right crop at the right time.",
        img: "/benefit1.jpg",
      },
      {
        title: "Reduced Crop Loss",
        desc: "Early alerts for pests, soil issues, and diseases save your yield.",
        img: "/benefit2.jpg",
      },
      {
        title: "Better Market Prices",
        desc: "Live mandi prices and demand insights help you sell smarter.",
        img: "/benefit3.jpg",
      },
    ],
  },

  hi: {
    title: "स्मार्ट कृषि",

    landingTitle: "स्मार्ट किसान, स्मार्ट फैसले।",
    landingSubtitle: "कीमत, मौसम और पिकअप की पूरी जानकारी एक जगह।",
    getStarted: "शुरू करें",
    weather: "मौसम अनुमान",
    benefits: "किसान लाभ",
    login: "लॉगिन",
    signup: "साइन अप",

    sell: "फसल बेचें",
    track: "ऑर्डर ट्रैक करें",
    profile: "प्रोफ़ाइल",
    support: "सहायता",
    logout: "लॉगआउट",

    location: "स्थान",
    todayPrice: "आज का फसल मूल्य",
    prediction: "मूल्य पूर्वानुमान",
    insights: "स्मार्ट जानकारी",

    cards: {
      today: "आज का मूल्य",
      future: "भविष्य का मूल्य",
      weather: "मौसम",
      pickup: "पिकअप स्थिति",
    },

    successTitle: "अनुरोध भेजा गया!",
    successLine1: "आपका बिक्री अनुरोध",
    successLine2: "का",
    successLine3: "JD सॉल्यूशन को भेज दिया गया है।",
    redirecting: "पिकअप स्थिति पर भेजा जा रहा है...",
    rice: "चावल",
    wheat: "गेहूँ",
    soybean: "सोयाबीन",
    sugarcane: "गन्ना",
    cotton: "कपास",
    maize: "मक्का",
    jowar: "ज्वार",
    bajra: "बाजरा",
    tur: "अरहर (तूर)",
    chana: "चना",
    onion: "प्याज़",
    tomato: "टमाटर",

    sellYourCrop: "अपनी फसल बेचें",
    bestPriceLine: "JD सॉल्यूशन से सबसे अच्छा रेट पाएं",
    selectCrop: "फसल चुनें",
    jdPrice: "JD सॉल्यूशन रेट",
    mandiPrice: "मंडी रेट",
    youSave: "आप बचाएंगे",
    per: "प्रति",
    back: "वापस",
    enterQty: "मात्रा दर्ज करें",
    qtyPlaceholder: "मात्रा दर्ज करें",
    kg: "कि.ग्रा",
    quintal: "क्विंटल",
    addPhotos: "फोटो जोड़ें (वैकल्पिक)",
    addPhotoTap: "फसल फोटो जोड़ने के लिए टैप करें",
    notes: "नोट्स (वैकल्पिक)",
    submit: "अनुरोध भेजें",

    // AUTH PAGE
    auth_instruction: "जारी रखने के लिए मोबाइल नंबर दर्ज करें",
    auth_phone: "मोबाइल नंबर",
    auth_send_otp: "OTP प्राप्त करें",
    auth_enter_otp: "OTP दर्ज करें",
    auth_verify_otp: "OTP सत्यापित करें",
    auth_name: "पूरा नाम",
    auth_location: "खेत का स्थान",
    auth_create_account: "खाता बनाएं",
    auth_new_user: "नए उपयोगकर्ता?",
    auth_have_account: "पहले से खाता है?",
    auth_select_crop: "पसंदीदा फसल चुनें",

    // DASHBOARD GREETING
    hi: "नमस्ते",
    farmer: "किसान",

    locationNotDetected: "पता नहीं चला",
    geoNotSupported: "लोकेशन सपोर्ट उपलब्ध नहीं",
    permissionDenied: "अनुमति नहीं मिली",
    puneMandi: "पुणे मार्केट यार्ड",
    mainMandi: "मुख्य मंडी",

    autoDetected: "स्वचालित लोकेशन",
    manualSelect: "मैन्युअल लोकेशन चयन",
    detect: "पता लगाएं",
    apply: "लागू करें",

    selectState: "राज्य चुनें",
    selectCity: "शहर चुनें",
    nearestMandi: "नजदीकी मंडी",

    pricePredictionTitle: "फसल मूल्य पूर्वानुमान",
    rising: "बढ़त",
    falling: "गिरावट",

    advice_good_sell: "बेचने का अच्छा समय",
    advice_hold: "अभी रोककर रखें",
    advice_tmr_high: "कल अधिक दाम की उम्मीद",

    maize: "मक्का",
    greenPeas: "हरी मटर",
    apple: "सेब",
    banana: "केला",
    grapes: "अंगूर",
    orange: "संतरा",

    mandiPriceLabel: "मंडी मूल्य",
    jdPriceLabel: "JD समाधान",

    weatherForecast: "मौसम और पूर्वानुमान",
    field1: "फार्म क्षेत्र 1",
    field2: "फार्म क्षेत्र 2",
    field3: "फार्म क्षेत्र 3",

    lightRain: "हल्की बारिश",
    sunny: "धूप",
    cloudy: "बादल",

    irrigationAdvice: "ज़रूरत हो तो सिंचाई करें",
    harvestAdvice: "कटाई के लिए उत्तम मौसम",
    moistureAdvice: "मिट्टी की नमी की जाँच करें",

    smartInsights: "स्मार्ट जानकारी",

    insight_rain: "बारिश अलर्ट",
    insight_important: "महत्वपूर्ण",
    insight_rain_desc:
      "2 दिनों में भारी बारिश होने की संभावना। जल्दी खराब होने वाली फसल बेचें।",

    insight_wheat: "गेहूं के भाव बढ़ रहे हैं",
    insight_wheat_desc:
      "इस हफ्ते गेहूं के भाव 3.2% बढ़े हैं। बेचने के लिए अच्छा समय।",

    insight_tomato: "टमाटर की मांग अधिक",
    insight_tomato_desc: "त्योहारों के कारण टमाटर की मांग बढ़ने की संभावना।",

    insight_tip: "स्टोरेज टिप",
    insight_tip_desc: "गेहूं भंडारण से पहले उसमें से नमी कम करें।",

    support_desc: "मदद चाहिए? हम आपकी सहायता के लिए हैं।",
    support_phone: "फोन",
    support_email: "ईमेल",
    support_time: "समय",

    pickupTitle: "पिकअप स्थिति",
    pickupSubtitle: "अपनी बिक्री अनुरोध ट्रैक करें",
    pickupRequestNo: "अनुरोध संख्या",
    pickupPlaceholder: "अनुरोध संख्या दर्ज करें",
    pickupTrack: "पिकअप ट्रैक करें",
    pickupActive: "सक्रिय अनुरोध",
    pickupInProgress: "प्रक्रिया में",
    pickupRequestSent: "अनुरोध भेजा गया",
    pickupAssigned: "पिकअप सौंपा गया",
    pickupOutForPickup: "पिकअप के लिए निकला",
    pickupCompleted: "पूरा हुआ",
    pickupAssignedTo: "सौंपा गया",
    pickupExpected: "अपेक्षित",
    pickupCall: "सपोर्ट कॉल करें",
    pickupNotFound: "इस संख्या के लिए कोई अनुरोध नहीं मिला",

    profileTitle: "मेरा प्रोफ़ाइल",
    profileUpdated: "प्रोफ़ाइल सफलतापूर्वक अपडेट हुई!",
    profileName: "पूरा नाम",
    profilePhone: "मोबाइल नंबर",
    profileAddress: "पता",
    profileSelectCity: "अपने शहर का चयन करें",
    profileLanguage: "हिंदी", // shows current language
    profileEdit: "प्रोफ़ाइल संपादित करें",
    profileSave: "परिवर्तन सहेजें",
    profileCancel: "रद्द करें",

    trendingCrops: "लोकप्रिय फसलें",
    myRequests: "मेरी रिक्वेस्ट",

    farmerBenefitsTitle: "किसानों के लिए लाभ",
    farmerBenefitsSubtitle: "स्मार्ट खेती अब आसान और अधिक फायदेमंद",

    dashboardOverview: "खेत का सारांश",
    overviewSubtitle: "आपके खेत और फसलों की जल्दी जानकारी",
    yourCrops: "आपकी फसलें",
    checkPrices: "बाज़ार भाव देखें",
    checkWeather: "मौसम देखें",

    cropHealthTitle: "फसल की सेहत",
    cropHealthStatus: "कुल स्थिति",
    cropHealthHealthy: "स्वस्थ और स्थिर",
    cropHealthIssues: "2 छोटे पोषक तत्वों की समस्याएँ मिलीं",

    irrigationTitle: "सिंचाई सुझाव",
    irrigationRecommended: "आज की सिफ़ारिश",
    irrigationPerPlant: "प्रति पौधा",
    soilMoisture: "मिट्टी में नमी",
    soilMoistureLevel: "मध्यम",
    waterSavingTip: "शाम को सिंचाई करने से लगभग 18% पानी बच सकता है",

    marketPredictionTitle: "बाज़ार मूल्य अनुमान",
    marketTrendNote: "हाल ही के बाज़ार रुझानों पर आधारित",

    profitEstimatorTitle: "खर्च बनाम मुनाफ़ा",
    expensesLabel: "खर्च",
    expectedProfitLabel: "अनुमानित मुनाफ़ा",
    projectedProfit: "अनुमानित मुनाफ़ा",
    regionalComparison: "आपका खर्च xxxxxxxxx क्षेत्र के 72% किसानों से कम है",

    dashboard: "डैशबोर्ड",
sell: "फसल बेचें",
track: "ऑर्डर ट्रैक करें",
support: "सहायता",
logout: "लॉगआउट",
selectTaluka: "तालुका चुनें",
selectTalukaLabel: "अपना तालुका चुनें",
dashboardOverview: "खेत का विवरण",

    farmerBenefits: [
      {
        title: "सही फसल योजना",
        desc: "मौसम और मिट्टी आधारित सुझाव आपको सही समय पर सही फसल चुनने में मदद करते हैं।",
        img: "/benefit1.jpg",
      },
      {
        title: "फसल नुकसान में कमी",
        desc: "कीट, रोग और मौसम अलर्ट समय पर चेतावनी देकर उपज बचाते हैं।",
        img: "/benefit2.jpg",
      },
      {
        title: "बेहतर बाजार भाव",
        desc: "मंडी के लाइव भाव और मांग के डेटा से किसान अच्छी कीमत प्राप्त कर सकते हैं।",
        img: "/benefit3.jpg",
      },
    ],
  },

  mr: {
    title: "स्मार्ट शेती",

    landingTitle: "स्मार्ट शेतकरी, स्मार्ट निर्णय.",
    landingSubtitle: "भाव, हवामान आणि पिकअपची संपूर्ण माहिती एका ठिकाणी.",
    getStarted: "सुरवात करा",
    weather: "हवामान अंदाज",
    benefits: "शेतकरी फायदे",
    login: "लॉगिन",
    signup: "साइन अप",

    sell: "पीक विक्री",
    track: "ऑर्डर ट्रॅक",
    profile: "प्रोफाइल",
    support: "मदत",
    logout: "लॉगआउट",

    location: "स्थान",
    todayPrice: "आजचा पिकाचा दर",
    prediction: "दर अंदाज",
    insights: "स्मार्ट माहिती",

    cards: {
      today: "आजचा दर",
      future: "भविष्यातील दर",
      weather: "हवामान",
      pickup: "पिकअप स्थिती",
    },

    successTitle: "विनंती सबमिट झाली!",
    successLine1: "आपली विक्री विनंती",
    successLine2: "चे",
    successLine3: "JD सोल्यूशनकडे पाठवली आहे.",
    redirecting: "पिकअप स्थितीकडे वळवित आहे...",
    rice: "तांदूळ",
    wheat: "गहू",
    soybean: "सोयाबीन",
    sugarcane: "ऊस",
    cotton: "कापूस",
    maize: "मका",
    jowar: "ज्वारी",
    bajra: "बाजरी",
    tur: "तूर",
    chana: "हरभरा",
    onion: "कांदा",
    tomato: "टोमॅटो",

    sellYourCrop: "आपले पिक विक्री करा",
    bestPriceLine: "JD सोल्यूशन कडून सर्वोत्तम दर मिळवा",
    selectCrop: "पिक निवडा",
    jdPrice: "JD सोल्यूशन दर",
    mandiPrice: "मंडी दर",
    youSave: "आपण वाचवाल",
    per: "प्रति",
    back: "मागे",
    enterQty: "प्रमाण भरा",
    qtyPlaceholder: "प्रमाण प्रविष्ट करा",
    kg: "कि.ग्रा",
    quintal: "क्विंटल",
    addPhotos: "फोटो जोडा (ऐच्छिक)",
    addPhotoTap: "फोटो जोडण्यासाठी टॅप करा",
    notes: "टीप (ऐच्छिक)",
    submit: "विनंती पाठवा",

    // AUTH PAGE
    auth_instruction: "पुढे जाण्यासाठी मोबाईल नंबर टाका",
    auth_phone: "मोबाईल नंबर",
    auth_send_otp: "OTP मिळवा",
    auth_enter_otp: "OTP टाका",
    auth_verify_otp: "OTP पडताळा",
    auth_name: "पूर्ण नाव",
    auth_location: "शेतीचे ठिकाण",
    auth_create_account: "खाते तयार करा",
    auth_new_user: "नवीन वापरकर्ता?",
    auth_have_account: "आधीच खाते आहे?",
    auth_select_crop: "आवडती पिके निवडा",

    // DASHBOARD GREETING
    hi: "नमस्कार",
    farmer: "शेतकरी",

    locationNotDetected: "ओळख पटली नाही",
    geoNotSupported: "लोकेशन सपोर्ट उपलब्ध नाही",
    permissionDenied: "परवानगी नाकारली",
    puneMandi: "पुणे मार्केट यार्ड",
    mainMandi: "मुख्य मंडई",

    autoDetected: "स्वयंचलित स्थान",
    manualSelect: "हस्तचलित स्थान निवडा",
    detect: "शोधा",
    apply: "लागू करा",

    selectState: "राज्य निवडा",
    selectCity: "शहर निवडा",
    nearestMandi: "जवळची मंडई",

    pricePredictionTitle: "पिक दर अंदाज",
    rising: "वाढ",
    falling: "घट",

    advice_good_sell: "विक्रीसाठी चांगला काळ",
    advice_hold: "सध्या थांबा",
    advice_tmr_high: "उद्या जास्त दराची शक्यता",

    maize: "मका",
    greenPeas: "हरभरा (हिरवा वाटाणा)",
    apple: "सफरचंद",
    banana: "केळे",
    grapes: "द्राक्षे",
    orange: "संत्रे",

    mandiPriceLabel: "मंडी दर",
    jdPriceLabel: "JD सोल्यूशन",

    weatherForecast: "हवामान आणि अंदाज",
    field1: "शेत क्षेत्र 1",
    field2: "शेत क्षेत्र 2",
    field3: "शेत क्षेत्र 3",

    lightRain: "हलका पाऊस",
    sunny: "कोरडे / उन्हाळे",
    cloudy: "ढगाळ",

    irrigationAdvice: "गरज असल्यास सिंचन करा",
    harvestAdvice: "कापणीसाठी उत्तम हवामान",
    moistureAdvice: "मातीतील ओलावा तपासा",

    smartInsights: "स्मार्ट माहिती",

    insight_rain: "पावसाचा इशारा",
    insight_important: "महत्त्वाचे",
    insight_rain_desc:
      "२ दिवसांत मोठा पाऊस होण्याची शक्यता. नाशवंत माल लवकर विकावा.",

    insight_wheat: "गहू दर वाढत आहेत",
    insight_wheat_desc: "या आठवड्यात गहू दर ३.२% वाढले. विक्रीसाठी चांगला काळ.",

    insight_tomato: "टोमॅटोची मागणी वाढत आहे",
    insight_tomato_desc: "सणासुदीमुळे टोमॅटो मागणी वाढण्याची शक्यता आहे.",

    insight_tip: "साठवण टिप",
    insight_tip_desc: "गहू साठवण्यापूर्वी त्यातील ओलावा कमी करा.",

    support_desc: "मदत हवी आहे? आम्ही तुमच्यासाठी आहोत.",
    support_phone: "फोन",
    support_email: "ईमेल",
    support_time: "वेळ",
    pickupTitle: "पिकअप स्थिती",
    pickupSubtitle: "तुमच्या विक्री विनंत्या ट्रॅक करा",
    pickupRequestNo: "विनंती क्रमांक",
    pickupPlaceholder: "विनंती क्रमांक टाका",
    pickupTrack: "पिकअप ट्रॅक करा",
    pickupActive: "सक्रिय विनंती",
    pickupInProgress: "प्रगतीत",
    pickupRequestSent: "विनंती पाठवली",
    pickupAssigned: "पिकअप नियुक्त",
    pickupOutForPickup: "पिकअपसाठी निघाले",
    pickupCompleted: "पूर्ण",
    pickupAssignedTo: "नियुक्त",
    pickupExpected: "अपेक्षित",
    pickupCall: "सपोर्ट कॉल करा",
    pickupNotFound: "या क्रमांकासाठी विनंती आढळली नाही",

    profileTitle: "माझा प्रोफाइल",
    profileUpdated: "प्रोफाइल यशस्वीरित्या अपडेट झाली!",
    profileName: "पूर्ण नाव",
    profilePhone: "मोबाईल नंबर",
    profileAddress: "पत्ता",
    profileSelectCity: "आपले शहर निवडा",
    profileLanguage: "मराठी", // shows current language
    profileEdit: "प्रोफाइल संपादित करा",
    profileSave: "बदल जतन करा",
    profileCancel: "रद्द करा",

    overview: "आढावा",
    dashboardOverview: "शेतीचा आढावा",
    overviewSubtitle: "आजचे निर्णय घेण्यासाठी जलद सारांश",
    yourCrops: "तुमची पिके",
    checkPrices: "बाजारभाव पहा",
    checkWeather: "हवामान पहा",

    trendingCrops: "लोकप्रिय पिके",
    myRequests: "माझ्या विनंत्या",

    farmerBenefitsTitle: "शेतकऱ्यांसाठी फायदे",
    farmerBenefitsSubtitle: "स्मार्ट शेती आता सोपी आणि अधिक प्रभावी",

    dashboardOverview: "शेताचा आढावा",
    overviewSubtitle: "तुमच्या शेत आणि पिकांची जलद माहिती",
    yourCrops: "तुमची पिके",
    checkPrices: "बाजार भाव पाहा",
    checkWeather: "हवामान पाहा",

    cropHealthTitle: "पिकांची तब्येत",
    cropHealthStatus: "एकूण स्थिती",
    cropHealthHealthy: "निरोगी आणि स्थिर",
    cropHealthIssues: "2 किरकोळ पोषण समस्यांचा शोध लागला",

    irrigationTitle: "सिंचन सूचना",
    irrigationRecommended: "आजची शिफारस",
    irrigationPerPlant: "प्रति रोप",
    soilMoisture: "मातीतील आर्द्रता",
    soilMoistureLevel: "मध्यम",
    waterSavingTip: "सायंकाळी सिंचन केल्यास सुमारे 18% पाणी बचत होते",

    marketPredictionTitle: "बाजार भाव अंदाज",
    marketTrendNote: "अलीकडील बाजारातील ट्रेंडवर आधारित",

    profitEstimatorTitle: "खर्च व नफा",
    expensesLabel: "खर्च",
    expectedProfitLabel: "अनुमानित नफा",
    projectedProfit: "अनुमानित नफा",
    regionalComparison:
      "तुमचा खर्च xxxxxxxxx प्रदेशातील 72% शेतकऱ्यांपेक्षा कमी आहे",

    dashboard: "डॅशबोर्ड",
sell: "पिक विक्री",
track: "ऑर्डर ट्रॅक",
support: "मदत",
logout: "लॉगआउट",
selectTaluka: "तालुका निवडा",
selectTalukaLabel: "तुमचा तालुका निवडा",
dashboardOverview: "शेताचा आढावा",


    farmerBenefits: [
      {
        title: "अचूक पीक नियोजन",
        desc: "हवामान आणि मातीच्या आधारे दिलेले अंदाज योग्य वेळी योग्य पिकाची निवड करायला मदत करतात.",
        img: "/benefit1.jpg",
      },
      {
        title: "पीक नुकसानात घट",
        desc: "कीड, रोग आणि हवामान अलर्ट वेळेवर सूचना देऊन उत्पादन सुरक्षित ठेवतात.",
        img: "/benefit2.jpg",
      },
      {
        title: "चांगले बाजारभाव",
        desc: "लाईव्ह बाजारभाव आणि मागणी डेटा शेतकऱ्यांना जास्त नफा मिळवून देतो.",
        img: "/benefit3.jpg",
      },
    ],
  },
};

export default TRANSLATIONS;
