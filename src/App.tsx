import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useLenis } from './hooks/useLenis';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { StarfieldCanvas } from './components/StarfieldCanvas';

const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));

const queryClient = new QueryClient();

const App = () => {
  useLenis();
  return (
    <QueryClientProvider client={queryClient}>
      <CustomCursor />
      <ScrollProgress />
      <StarfieldCanvas />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-space-dark text-[#34d399]">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects/:projectId" element={<ProjectDetail />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
