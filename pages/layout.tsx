import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-numWorld bg-fixed bg-cover bg-center">
      <div className="absolute inset-0 opacity-50 z-0"></div> {/* Slightly transparent overlay */}
      <Header />
      <main className="flex-grow relative z-10">{children}</main>
      <Footer />
    </div>
  );
};

export default RootLayout;
