
import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  MessageCircle, 
  Settings, 
  Home, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AppPage } from '@/utils/types';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { 
    icon: <Home size={20} />, 
    label: 'Início', 
    path: AppPage.HOME 
  },
  { 
    icon: <Calendar size={20} />, 
    label: 'Dashboard', 
    path: AppPage.DASHBOARD 
  },
  { 
    icon: <Users size={20} />, 
    label: 'Convidados', 
    path: AppPage.GUESTS 
  },
  { 
    icon: <DollarSign size={20} />, 
    label: 'Finanças', 
    path: AppPage.FINANCE 
  },
  { 
    icon: <MessageCircle size={20} />, 
    label: 'Interações', 
    path: AppPage.INTERACTIONS 
  },
  { 
    icon: <Settings size={20} />, 
    label: 'Configurações', 
    path: AppPage.SETTINGS 
  },
];

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

  return (
    <div className="flex min-h-screen flex-col sm:flex-row">
      {/* Mobile Header */}
      {isMobile && (
        <header className="flex justify-between items-center p-4 border-b z-50 bg-background">
          <div className="flex items-center space-x-3">
            <img 
              src="/placeholder.svg" 
              alt="Celebr8r logo" 
              className="h-8 w-8" 
            />
            <span className="font-display text-xl font-semibold tracking-tight">celebr8r</span>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </header>
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 border-r bg-card/80 backdrop-blur-md transition-transform duration-300 ease-out-expo sm:translate-x-0 sm:relative",
          isMobile && (mobileMenuOpen ? "translate-x-0" : "-translate-x-full"),
          !isMobile && "animate-fade-in"
        )}
      >
        <div className="flex h-full flex-col justify-between p-4">
          {/* Logo and Navigation */}
          <div className="space-y-8">
            {!isMobile && (
              <div className="flex items-center space-x-3 px-2 py-4">
                <img 
                  src="/placeholder.svg" 
                  alt="Celebr8r logo" 
                  className="h-8 w-8" 
                />
                <span className="font-display text-xl font-semibold tracking-tight">celebr8r</span>
              </div>
            )}
            
            <nav className="space-y-1.5">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                    "focus-ring hover:bg-accent/10",
                    location.pathname === item.path
                      ? "bg-accent/15 text-accent font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={isMobile ? toggleMobileMenu : undefined}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* User and Logout */}
          <div className="border-t pt-4">
            <div className="mb-4 flex items-center gap-3 rounded-lg px-3 py-2">
              <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
                U
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Usuário</span>
                <span className="text-xs text-muted-foreground">usuario@email.com</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
            >
              <LogOut size={16} />
              Sair
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        className={cn(
          "flex-1 transition-all duration-300 ease-out-expo",
          isMobile && mobileMenuOpen ? "blur-sm" : "",
          "animate-fade-in"
        )}
      >
        <div className="container mx-auto p-4 sm:p-6 max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
