
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EventType, Guest } from '@/utils/types';

interface GuestStore {
  guests: Guest[];
  addGuest: (guest: Guest) => void;
  removeGuest: (id: string) => void;
  updateGuestRSVP: (id: string, rsvp: boolean) => void;
  getGuestsByEventType: (eventType: EventType) => Guest[];
}

export const useGuestStore = create<GuestStore>()(
  persist(
    (set, get) => ({
      guests: [],
      
      addGuest: (guest) => set((state) => ({ 
        guests: [...state.guests, guest] 
      })),
      
      removeGuest: (id) => set((state) => ({ 
        guests: state.guests.filter(guest => guest.id !== id) 
      })),
      
      updateGuestRSVP: (id, rsvp) => set((state) => ({
        guests: state.guests.map(guest => 
          guest.id === id ? { ...guest, rsvp } : guest
        )
      })),
      
      getGuestsByEventType: (eventType) => {
        return get().guests.filter(guest => guest.eventType === eventType);
      },
    }),
    {
      name: 'celebr8r-guests',
    }
  )
);
