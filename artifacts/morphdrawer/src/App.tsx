import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/Layout";

import Home from "@/pages/Home";
import Sketchbook from "@/pages/Sketchbook";
import Archive from "@/pages/Archive";
import Evolve from "@/pages/Evolve";
import Themes from "@/pages/Themes";
import Motifs from "@/pages/Motifs";
import MemoryWall from "@/pages/MemoryWall";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/create" component={Sketchbook} />
        <Route path="/notebook" component={Archive} />
        <Route path="/evolve/:id" component={Evolve} />
        <Route path="/themes" component={Themes} />
        <Route path="/motifs" component={Motifs} />
        <Route path="/memory" component={MemoryWall} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
