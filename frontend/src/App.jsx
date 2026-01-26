import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import SellCrop from "./pages/SellCrop";
import Support from "./pages/Support";
import PickupStatusSection from "./pages/PickupStatusSection";
import ProfilePage from "./pages/ProfilePage";
import SuccessScreen from "./components/SuccessScreen";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sell-crop" element={<SellCrop />} />
        <Route path="/success" element={<SuccessScreen />} />
        <Route path="/track" element={<PickupStatusSection />} />
        <Route path="/profile" element={<ProfilePage />} />
         <Route path="/support" element={<Support />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
