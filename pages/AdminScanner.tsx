
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Reservation, BookingStatus } from '../types';
import { Search, CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';

export const AdminScanner: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' | null }>({ text: '', type: null });

  useEffect(() => {
    setReservations(db.getReservations());
  }, []);

  const handleCheckIn = (id: string) => {
    const res = db.getReservationById(id);
    if (!res) {
      setMessage({ text: "Erreur : Réservation introuvable.", type: 'error' });
      return;
    }

    if (res.status === BookingStatus.USED) {
      setMessage({ text: `Alerte : Réservation n°${id} déjà utilisée ! Accès refusé.`, type: 'error' });
      return;
    }

    db.updateStatus(id, BookingStatus.USED);
    setReservations(db.getReservations());
    setMessage({ text: `Réservation n°${id} confirmée – Accès autorisé. Bienvenue au Lizard King !`, type: 'success' });
    
    // Auto clear message after 5 seconds
    setTimeout(() => setMessage({ text: '', type: null }), 5000);
  };

  const filtered = reservations.filter(r => 
    r.id.toLowerCase().includes(search.toLowerCase()) || 
    r.fullName.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-anton text-white">CONTRÔLE D'ACCÈS</h1>
          <p className="text-zinc-500">Gestion des réservations et validation des entrées.</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Scannez ou saisissez l'ID..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Real-time scan message alert */}
      {message.type && (
        <div className={`mb-8 p-6 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500 ${
          message.type === 'success' ? 'bg-green-500/10 border border-green-500/50 text-green-500' : 'bg-red-500/10 border border-red-500/50 text-red-500'
        }`}>
          {message.type === 'success' ? <CheckCircle className="w-8 h-8 shrink-0" /> : <AlertCircle className="w-8 h-8 shrink-0" />}
          <p className="text-lg font-bold">{message.text}</p>
        </div>
      )}

      {/* Reservations Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50">
                <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500 tracking-wider">ID / Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500 tracking-wider">Client</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500 tracking-wider">Groupe</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500 tracking-wider">Statut</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-zinc-500 tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">Aucune réservation trouvée.</td>
                </tr>
              ) : (
                filtered.map(res => (
                  <tr key={res.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-mono text-amber-500 font-bold">{res.id}</div>
                      <div className="text-xs text-zinc-500 mt-1">{res.date} @ {res.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold">{res.fullName}</div>
                      <div className="text-xs text-zinc-500">{res.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span className="font-bold">{res.guests}</span>
                        <span className="text-zinc-500 text-xs">pers.</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {res.status === BookingStatus.USED ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-800 text-zinc-400 text-xs font-bold rounded-full">
                          <XCircle className="w-3 h-3" /> UTILISÉ
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-full">
                          <Clock className="w-3 h-3" /> VALIDE
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleCheckIn(res.id)}
                        disabled={res.status === BookingStatus.USED}
                        className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                          res.status === BookingStatus.USED 
                            ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' 
                            : 'bg-amber-600 hover:bg-amber-500 text-black active:scale-95'
                        }`}
                      >
                        VALIDER L'ENTRÉE
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
