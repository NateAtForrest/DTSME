import React from 'react';
import { BookOpen, BarChart2, MessageSquare, FileText, Settings as SettingsIcon, Database } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import KnowledgeBase from './pages/KnowledgeBase';
import Conversation from './pages/Conversation';
import ContentGeneration from './pages/ContentGeneration';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import SidebarLayout from './components/layout/SidebarLayout';

function App() {
  return (
    <Router>
      <SidebarLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/conversation" element={<Conversation />} />
          <Route path="/content-generation" element={<ContentGeneration />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SidebarLayout>
    </Router>
  );
}

export default App;