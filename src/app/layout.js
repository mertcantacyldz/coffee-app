import './globals.css';

export const metadata = {
  title: 'Emir Can İğrek Konser Daveti 🎵',
  description: 'Helin, seni özel bir konsere davet ediyorum!',
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
        <meta name="theme-color" content="#0a0118" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
