import '@mantine/core/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import { MantineProvider, ColorSchemeScript, Container } from '@mantine/core';
import { ToastContainer } from 'react-toastify';

import { QueryProvider } from '@/client/app/providers';

export const metadata = {
  title: 'Car Shop',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <QueryProvider>
          <MantineProvider>
            <Container size="xl" p="6rem">
              {children}
            </Container>
          </MantineProvider>
          <ToastContainer />
        </QueryProvider>
      </body>
    </html>
  );
}
