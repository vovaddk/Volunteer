import React, { useEffect, useState, useRef } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { Router, Route } from './lib/router';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HelpDialog } from './components/HelpDialog';
import { QuickAccessSidebar } from './components/QuickAccessSidebar';
import { useUserBehavior } from './hooks/useUserBehavior';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

// Pages
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import VolunteerCabinet from './pages/VolunteerCabinet';
import OrganizationCabinet from './pages/OrganizationCabinet';
import CoordinatorDashboard from './pages/CoordinatorDashboard';
import RequestDetailsPage from './pages/RequestDetailsPage';
import ForVolunteersPage from './pages/ForVolunteersPage';
import ForOrganizationsPage from './pages/ForOrganizationsPage';

// Placeholder pages
const LearningPage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="mb-4">Навчання та ресурси</h1>
      <p className="text-muted-foreground">Навчальні матеріали та рекомендації з безпеки незабаром</p>
    </div>
  </div>
);

const ResourcesPage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="mb-4">Ресурси</h1>
      <p className="text-muted-foreground">Статті та корисна інформація незабаром</p>
    </div>
  </div>
);

const AboutPage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="mb-4">Про Volunteer+</h1>
      <p className="text-muted-foreground">Наша місія та історія незабаром</p>
    </div>
  </div>
);

const AppContent: React.FC = () => {
  const { mode, toggleLargeUI } = useApp();
  const { behavior } = useUserBehavior();
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [showQuickAccess, setShowQuickAccess] = useState(false);
  const [helpDialogShown, setHelpDialogShown] = useState(false);
  const [quickAccessShown, setQuickAccessShown] = useState(false);
  const prevScaleFactor = useRef(1.0);

  // Apply dark mode class to document
  useEffect(() => {
    if (mode.dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode.dark]);

  // Apply UI scale factor based on behavior
  useEffect(() => {
    if (behavior.uiScaleFactor > 1.0) {
      document.documentElement.style.setProperty('--ui-scale', behavior.uiScaleFactor.toString());
      document.documentElement.classList.add('scaled-ui');
      
      // Show notification when UI scales up
      if (behavior.uiScaleFactor > prevScaleFactor.current) {
        const percentage = Math.round(behavior.uiScaleFactor * 100);
        toast.info(`Інтерфейс збільшено до ${percentage}%`, {
          description: 'Ми помітили труднощі з натисканням кнопок і автоматично збільшили елементи',
          duration: 4000,
        });
      }
      prevScaleFactor.current = behavior.uiScaleFactor;
    } else {
      document.documentElement.style.setProperty('--ui-scale', '1');
      document.documentElement.classList.remove('scaled-ui');
    }
  }, [behavior.uiScaleFactor]);

  // Behavior-based adaptations
  useEffect(() => {
    // Show help dialog on chaotic scrolling (only once)
    if (behavior.chaoticScrolling && !helpDialogShown) {
      setShowHelpDialog(true);
      setHelpDialogShown(true);
    }

    // Show quick access sidebar on long browsing (only once)
    if (behavior.longBrowsing && !quickAccessShown) {
      setShowQuickAccess(true);
      setQuickAccessShown(true);
    }

    // Enable large UI on click difficulty
    if (behavior.clickDifficulty && !mode.largeUI) {
      toggleLargeUI();
    }
  }, [behavior, helpDialogShown, quickAccessShown, mode.largeUI, toggleLargeUI]);

  const routes: Route[] = [
    { path: '/', component: HomePage, exact: true },
    { path: '/search', component: SearchPage, exact: true },
    { path: '/for-volunteers', component: ForVolunteersPage, exact: true },
    { path: '/for-organizations', component: ForOrganizationsPage, exact: true },
    { path: '/cabinet', component: VolunteerCabinet, exact: true },
    { path: '/organization-cabinet', component: OrganizationCabinet, exact: true },
    { path: '/coordinator', component: CoordinatorDashboard, exact: true },
    { path: '/request', component: RequestDetailsPage, exact: true },
    { path: '/learning', component: LearningPage, exact: true },
    { path: '/resources', component: ResourcesPage, exact: true },
    { path: '/about', component: AboutPage, exact: true },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Router routes={routes} fallback={HomePage} />
      </main>
      <Footer />
      
      {/* Adaptive UI Components */}
      <HelpDialog isOpen={showHelpDialog} onClose={() => setShowHelpDialog(false)} />
      <QuickAccessSidebar isOpen={showQuickAccess} onClose={() => setShowQuickAccess(false)} />
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;