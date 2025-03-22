
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { DonateBloodForm } from "./DonateBloodForm";
import { RequestBloodForm } from "./RequestBloodForm";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [showDonateForm, setShowDonateForm] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate("/")}
              className="text-2xl font-semibold text-primary hover:opacity-80 transition-opacity"
            >
              Jwandoon
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setShowDonateForm(true)}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Donate Blood
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowRequestForm(true)}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Request Blood
            </Button>
            <Button
              onClick={() => navigate("/auth")}
              className="bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>

      <DonateBloodForm 
        open={showDonateForm} 
        onOpenChange={setShowDonateForm}
      />
      
      <RequestBloodForm 
        open={showRequestForm} 
        onOpenChange={setShowRequestForm}
      />
    </nav>
  );
};

export default Navbar;
