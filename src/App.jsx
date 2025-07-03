import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AOS from "aos";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "aos/dist/aos.css";
import Index from "./pages/Index";
import PageNotFound from "./pages/PageNotFound";
import LMS from "./pages/LMS";
import { AuthProvider } from "./contexts/AuthContext";
import { LMSProvider } from "./contexts/LMSContext";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    AOS.init({ offset: 50, delay: 50, duration: 1000, once: false });
  }, []);

  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <LMSProvider>
              <Routes>
                <Route index element={<Index />} />
                <Route path="lms/*" element={<LMS />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </LMSProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
