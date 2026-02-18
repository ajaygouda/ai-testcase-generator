import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 text-foreground">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            This page is not yet implemented. Continue exploring with a new prompt to fill in this page content!
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
