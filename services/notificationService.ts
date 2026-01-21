
import { Reservation } from '../types';
import { ADMIN_EMAIL, getConfirmationEmailHTML } from '../constants';

export const notificationService = {
  /**
   * Simule l'envoi d'e-mails de confirmation.
   * Dans une version de production, cette fonction appellerait EmailJS, SendGrid ou un backend Node.js.
   */
  sendBookingNotifications: async (reservation: Reservation): Promise<void> => {
    console.log(`[Notification Service] Déclenchement des e-mails pour la réservation ${reservation.id}`);
    
    // 1. Notification pour le client
    console.log(`[Email] Envoi de la confirmation client à : ${reservation.email}`);
    
    // 2. Notification pour le propriétaire (VOUS)
    console.log(`[Email] Envoi de l'alerte de nouveau paiement à l'admin : ${ADMIN_EMAIL}`);
    
    // Simulation d'un délai réseau
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`[Notification Service] Succès : Administrateur (${ADMIN_EMAIL}) et Client notifiés.`);
        resolve();
      }, 1500);
    });
  }
};
