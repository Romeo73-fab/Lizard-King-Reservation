
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../services/db';
import { Reservation } from '../types';
import { CheckCircle2, Download, Share2, ArrowLeft } from 'lucide-react';

export const Confirmation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [res, setRes] = useState<Reservation | null>(null);

  useEffect(() => {
    if (id) {
      const data = db.getReservationById(id);
      if (data) setRes(data);
    }
  }, [id]);

  if (!res) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h2 className="text-2xl font-anton mb-4">Réservation introuvable</h2>
        <Link to="/" className="text-amber-500 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
        </Link>
      </div>
    );
  }

  // Simulated QR Code URL
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${res.id}`;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <h1 className="text-4xl font-anton mb-2">PAIEMENT CONFIRMÉ</h1>
        <p className="text-zinc-400">Votre réservation pour THE LIZARD KING est validée !</p>
      </div>

      <div className="bg-white text-black rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-8 border-b-2 border-dashed border-zinc-200 relative">
          <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-zinc-950 rounded-full"/>
          <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-zinc-950 rounded-full"/>
          
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Pass Invité</p>
              <h2 className="text-2xl font-anton text-zinc-900">{res.fullName}</h2>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">ID Réservation</p>
              <p className="font-mono font-bold text-lg">{res.id}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Date & Heure</p>
              <p className="font-bold text-zinc-800">{new Date(res.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
              <p className="font-bold text-zinc-800">{res.time}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Personnes</p>
              <p className="font-bold text-zinc-800">{res.guests} Adulte(s)</p>
            </div>
          </div>
        </div>

        <div className="p-12 flex flex-col items-center bg-zinc-50">
          <div className="bg-white p-4 rounded-2xl shadow-inner mb-6">
            <img src={qrUrl} alt="QR Code" className="w-48 h-48" />
          </div>
          <p className="text-sm text-zinc-500 text-center max-w-xs mb-8">
            Présentez ce QR Code à l'entrée du bar. Il sera scanné pour valider votre accès.
          </p>
          <div className="flex gap-4 w-full">
            <button 
              onClick={() => window.print()}
              className="flex-1 bg-zinc-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors"
            >
              <Download className="w-5 h-5" /> Imprimer
            </button>
            <button className="flex-1 border border-zinc-200 text-zinc-600 font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-100 transition-colors">
              <Share2 className="w-5 h-5" /> Partager
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-center">
        <p className="text-zinc-400 text-sm">
          Un email de confirmation contenant votre ticket a été envoyé à 
          <span className="text-amber-500 font-bold ml-1">{res.email}</span>.
        </p>
      </div>
    </div>
  );
};
