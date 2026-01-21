
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Booking } from './pages/Booking';
import { Confirmation } from './pages/Confirmation';
import { AdminScanner } from './pages/AdminScanner';
import { Music, Calendar, ShieldCheck, Menu, X, MapPin, Phone } from 'lucide-react';
import { ADMIN_PHONE, LOCATION } from './constants';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="bg-amber-500 p-2 rounded-lg group-hover:rotate-12 transition-transform">
                  <Music className="w-6 h-6 text-black" />
                </div>
                <span className="text-2xl font-anton tracking-wider text-white">THE LIZARD KING</span>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-zinc-400 hover:text-amber-500 transition-colors">Accueil</Link>
                <Link to="/booking" className="bg-amber-600 hover:bg-amber-500 text-black font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105">
                  Réserver
                </Link>
                <Link to="/admin" className="text-zinc-500 hover:text-zinc-300">
                  <ShieldCheck className="w-5 h-5" />
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-zinc-400">
                  {isMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Nav */}
          {isMenuOpen && (
            <div className="md:hidden bg-zinc-900 border-b border-zinc-800 px-4 pt-2 pb-6 space-y-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-lg">Accueil</Link>
              <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="block text-lg text-amber-500 font-bold">Réserver une table</Link>
              <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block text-lg text-zinc-500">Admin</Link>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/confirmation/:id" element={<Confirmation />} />
            <Route path="/admin" element={<AdminScanner />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-zinc-900 border-t border-zinc-800 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="font-rock text-amber-500 text-xl mb-4">"Keep on Knocking"</h3>
            <p className="text-zinc-500 max-w-md mx-auto mb-6">
              THE LIZARD KING Bar - Le temple du Blues & Rock. <br/>
              Live sessions tous les vendredis et samedis soir de 22h30 à 02h00.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-12 text-zinc-400 mb-8">
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-500" /> {LOCATION}</span>
              <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-amber-500" /> {ADMIN_PHONE}</span>
            </div>
            <p className="text-xs text-zinc-600">© 2024 THE LIZARD KING Bar. Tous droits réservés.</p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
