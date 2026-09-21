import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'VDCET Mouda | Vilasrao Deshmukh College of Engineering & Technology',
  description:
    'Official website of Vilasrao Deshmukh College of Engineering & Technology (VDCET), Mouda, Nagpur. Approved by AICTE, DTE Code 04141.',
  keywords: [
    'VDCET',
    'VDCET Mouda',
    'Vilasrao Deshmukh College of Engineering & Technology',
    'Nagpur Engineering College',
    'Mouda Engineering College',
    'DTE 04141',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#fbfbfd] text-[#1d1d1f] antialiased">
        <Navbar />
        <main className="flex-grow pt-16 sm:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
