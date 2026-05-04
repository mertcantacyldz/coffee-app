import './globals.css';

export const metadata = {
  title: 'Kahve Daveti ☕',
  description: 'Mertcan seni kahve içmeye davet ediyor!',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <meta name="theme-color" content="#FDF5E6" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
