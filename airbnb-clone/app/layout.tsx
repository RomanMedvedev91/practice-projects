import { Nunito } from 'next/font/google';
import './globals.css';
import { Navbar } from './components/Navbar/Navbar';
import { ClientOnly } from './components/ClientOnly';
import { RegisterModal } from './components/Modals/RegisterModal';
import { LoginModal } from './components/Modals/LoginModal';
import { RentModal } from './components/Modals/RentModal';
import { SearchModal } from './components/Modals/SearchModal';
import { ToasterProvider } from './providers/ToasterProvider';
import { getCurrentUser } from './actions/getCurrentUser';

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

const font = Nunito({
  subsets: ["latin"],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  console.log('currentUser: ', currentUser);
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">
            {children}
        </div>
      </body>
    </html>
  )
};
