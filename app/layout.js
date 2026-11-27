import './globals.css';

export const metadata = {
  title: 'Griha Pravesh · Vijayalakshmi Murugan Illam',
  description: 'Housewarming invitation – 13 December 2026, Chennai',
};

export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;1,500&family=Italiana&family=Noto+Serif+Tamil:wght@500;700&family=Montserrat:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
