import Link from 'next/link';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-lg font-bold">Train Reservation System</h1>
          <nav className="space-x-4">
            <Link href="/login">
              <a className="hover:underline">Login</a>
            </Link>
            <Link href="/signup">
              <a className="hover:underline">Sign Up</a>
            </Link>
            <Link href="/booking">
              <a className="hover:underline">Booking</a>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto py-6">{children}</main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        © 2024 Train Reservation System
      </footer>
    </div>
  );
};

export default Layout;
