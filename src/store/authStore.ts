// src/store/authStore.ts
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  lastActivityTime: number | null;
  isLoading: boolean;
  pin: string | null;
  setAuthenticated: (user: any, pin?: string) => void;
  setLastActivity: () => void;
  logout: () => void;
  checkLockStatus: () => boolean;
  loadPersistedState: () => Promise<void>;
  verifyPin: (pin: string) => boolean;
  setPin: (pin: string) => void;
  hasPin: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  lastActivityTime: null,
  isLoading: true,
  pin: null,

  setAuthenticated: (user, pin) => {
    set({
      isAuthenticated: true,
      user,
      lastActivityTime: Date.now(),
      pin: pin || null,
    });
    AsyncStorage.setItem('auth-state', JSON.stringify({
      isAuthenticated: true,
      user,
      lastActivityTime: Date.now(),
      pin: pin || null,
    }));
  },

  setLastActivity: () => {
    const now = Date.now();
    set({ lastActivityTime: now });
    AsyncStorage.getItem('auth-state').then((data) => {
      if (data) {
        const parsed = JSON.parse(data);
        AsyncStorage.setItem('auth-state', JSON.stringify({
          ...parsed,
          lastActivityTime: now,
        }));
      }
    });
  },

  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
      lastActivityTime: null,
      pin: null,
    });
    AsyncStorage.removeItem('auth-state');
  },

  checkLockStatus: () => {
    const { isAuthenticated, lastActivityTime } = get();
    if (!isAuthenticated) return false;
    if (!lastActivityTime) return false;

    const now = Date.now();
    const elapsedMinutes = (now - lastActivityTime) / (1000 * 60);
    return elapsedMinutes >= 3; // Show lock screen after 3 minutes
  },

  loadPersistedState: async () => {
    try {
      const data = await AsyncStorage.getItem('auth-state');
      if (data) {
        const parsed = JSON.parse(data);
        set({
          isAuthenticated: parsed.isAuthenticated || false,
          user: parsed.user || null,
          lastActivityTime: parsed.lastActivityTime || null,
          pin: parsed.pin || null,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
      set({ isLoading: false });
    }
  },

  verifyPin: (pin: string) => {
    const { pin: storedPin } = get();
    if (!storedPin) return false;
    return pin === storedPin;
  },

  setPin: (pin: string) => {
    set({ pin });
    AsyncStorage.getItem('auth-state').then((data) => {
      if (data) {
        const parsed = JSON.parse(data);
        AsyncStorage.setItem('auth-state', JSON.stringify({
          ...parsed,
          pin,
        }));
      }
    });
  },

  hasPin: () => {
    const { pin } = get();
    return pin !== null && pin !== undefined;
  },
}));