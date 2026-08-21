import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      {/* GitHub Pages serves the SPA shell for unknown URLs with HTTP 200, so a
          missing page looks like a real one to a crawler and gets indexed with
          the homepage's title and description. There is no way to return a real
          404 status from a static host, so noindex is what keeps junk URLs out
          of the index. */}
      <Helmet>
        <title>Page not found | min.</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
    <div className="min-h-screen flex items-center justify-center bg-hair/60">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-quiet mb-4">Oops! Page not found</p>
        <a href="/" className="text-moss hover:text-moss underline">
          Return to Home
        </a>
      </div>
    </div>
    </>
  );
};

export default NotFound;
