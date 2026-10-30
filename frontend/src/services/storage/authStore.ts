import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthUser {
  name: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isGuest: boolean;
  user: AuthUser | null;

  // Actions
  enterAsGuest: () => void;
  signIn: (email: string, name?: string) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isGuest: true,
      user: null,

      enterAsGuest: () =>
        set({
          isAuthenticated: false,
          isGuest: true,
          user: null,
        }),

      signIn: (email: string, name?: string) => {
        const derivedName = name || email.split('@')[0] || 'Java Student';
        const capitalized = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);
        set({
          isAuthenticated: true,
          isGuest: false,
          user: {
            email,
            name: capitalized,
          },
        });
      },

      signOut: () =>
        set({
          isAuthenticated: false,
          isGuest: true,
          user: null,
        }),
    }),
    {
      name: 'oopslab-auth-v1',
    }
  )
);

