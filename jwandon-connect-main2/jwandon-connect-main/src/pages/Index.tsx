
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RequestBloodForm } from "@/components/RequestBloodForm";
import { DonateBloodForm } from "@/components/DonateBloodForm";

const Index = () => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showDonateForm, setShowDonateForm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-slide-up">
            Save Lives Through Blood Donation
          </span>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Connect Blood Donors with Recipients in Real-Time
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Join our community of life-savers. Whether you're a donor or in need,
            we make blood donation simple, fast, and accessible.
          </p>
          
          <div className="flex justify-center gap-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Button
              onClick={() => setShowDonateForm(true)}
              className="bg-primary text-white hover:bg-primary/90 px-8 py-6 text-lg"
            >
              Become a Donor
            </Button>
            <Button
              onClick={() => setShowRequestForm(true)}
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg"
            >
              Request Blood
            </Button>
          </div>
          
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <div className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-600">Emergency Support</div>
            </div>
            <div className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-gray-600">Secure & Private</div>
            </div>
            <div className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-primary mb-2">Real-time</div>
              <div className="text-gray-600">Location Matching</div>
            </div>
          </div>
        </div>
      </main>

      <RequestBloodForm 
        open={showRequestForm} 
        onOpenChange={setShowRequestForm}
      />
      
      <DonateBloodForm 
        open={showDonateForm} 
        onOpenChange={setShowDonateForm}
      />
    </div>
  );
};

export default Index;
