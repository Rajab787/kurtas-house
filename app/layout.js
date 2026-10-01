import './globals.css';
import { Playfair_Display, Inter } from 'next/font/google';

const serifFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const sansFont = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: 'KURA ATELIER | Bespoke Luxury Kurtas & Haute Couture',
  description: 'Experience the modern architecture of heritage kurta tailoring. Hand-loomed silk, imperial cotton, and contemporary silhouettes with scroll-directed cinematography.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serifFont.variable} ${sansFont.variable} dark`}>
      <body className="bg-luxury-950 text-luxury-100 antialiased selection:bg-gold-500/30 selection:text-gold-300">
        {children}
      </body>
    </html>
  );
}
