import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import PageTransition from './PageTransition';

interface LayoutProps {
  children: ReactNode;
  withFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, withFooter = true }) => {
  return (
    <div className="flex flex-col min-h-screen bg-agri-light-gradient">
      <Header />
      <main className="flex-grow px-container py-section">
        <PageTransition>
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </PageTransition>
      </main>
      {withFooter && <Footer />}
    </div>
  );
};

export default Layout;