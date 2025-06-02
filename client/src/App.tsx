import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "@/pages/landing";
import HomePage from "@/pages/home";
import AdminPage from "@/pages/admin";
import InformationsPage from "@/pages/informations";
import MentionsLegalesPage from "@/pages/mentions-legales";
import PolitiqueConfidentialitePage from "@/pages/politique-confidentialite";
import ConditionsGeneralesPage from "@/pages/conditions-generales";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/devis" component={HomePage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/informations" component={InformationsPage} />
      <Route path="/mentions-legales" component={MentionsLegalesPage} />
      <Route path="/politique-confidentialite" component={PolitiqueConfidentialitePage} />
      <Route path="/conditions-generales" component={ConditionsGeneralesPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
