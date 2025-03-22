
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary">Coming Soon</h1>
        <p className="text-xl text-gray-600 mb-8">
          This feature is under development. Please check back soon!
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-primary text-white hover:bg-primary/90"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
