
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="app-container page-transition">
      <div className="min-h-screen flex flex-col items-center justify-center px-5">
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl font-medium text-app-darkGray mb-4">404</h1>
          <p className="text-xl text-app-lightText mb-8">Oops! Page not found</p>
          <Link to="/" className="btn-primary inline-flex items-center">
            <Home className="mr-2 h-5 w-5" />
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
