import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import SellCrop from "./pages/SellCrop";
import Support from "./pages/Support";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sell" element={<SellCrop />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
