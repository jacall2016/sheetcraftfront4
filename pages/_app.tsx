import { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import RootLayout from './layout'; // Adjust the import path
import './globals.css'; // Ensure global CSS is imported here

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
};

export default MyApp;