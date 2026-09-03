// src/store/authStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type AccountTier = 1 | 2 | 3;

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  lastActivityTime: number | null;
  isLoading: boolean;
  pin: string | null;
  accountTier: AccountTier;
  setAuthenticated: (user: any, pin?: string) => void;
  setLastActivity: () => void;
  logout: () => void;
  checkLockStatus: () => boolean;
  loadPersistedState: () => Promise<void>;
  verifyPin: (pin: string) => boolean;
  setPin: (pin: string) => void;
  hasPin: () => boolean;
  setAccountTier: (tier: AccountTier) => void;
}

const normalizeTier = (tier?: unknown): AccountTier => {
  const numericTier = Number(tier);
  return numericTier === 2 || numericTier === 3
    ? (numericTier as AccountTier)
    : 1;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  lastActivityTime: null,
  isLoading: true,
  pin: null,
  accountTier: 1,

  setAuthenticated: (user, pin) => {
    const nextTier = normalizeTier(user?.accountTier ?? user?.tier);
    set({
      isAuthenticated: true,
      user,
      lastActivityTime: Date.now(),
      pin: pin || null,
      accountTier: nextTier,
    });
    AsyncStorage.setItem(
      "auth-state",
      JSON.stringify({
        isAuthenticated: true,
        user,
        lastActivityTime: Date.now(),
        pin: pin || null,
        accountTier: nextTier,
      }),
    );
  },

  setLastActivity: () => {
    const now = Date.now();
    set({ lastActivityTime: now });
    AsyncStorage.getItem("auth-state").then((data) => {
      if (data) {
        const parsed = JSON.parse(data);
        AsyncStorage.setItem(
          "auth-state",
          JSON.stringify({
            ...parsed,
            lastActivityTime: now,
          }),
        );
      }
    });
  },

  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
      lastActivityTime: null,
      pin: null,
      accountTier: 1,
    });
    AsyncStorage.removeItem("auth-state");
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
      const data = await AsyncStorage.getItem("auth-state");
      if (data) {
        const parsed = JSON.parse(data);
        const nextTier = normalizeTier(
          parsed.accountTier ?? parsed.user?.accountTier ?? parsed.user?.tier,
        );

        set({
          isAuthenticated: parsed.isAuthenticated || false,
          user: parsed.user || null,
          lastActivityTime: parsed.lastActivityTime || null,
          pin: parsed.pin || null,
          accountTier: nextTier,
          isLoading: false,
        });
      } else {
        set({ isLoading: false, accountTier: 1 });
      }
    } catch (error) {
      console.error("Error loading auth state:", error);
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
    AsyncStorage.getItem("auth-state").then((data) => {
      if (data) {
        const parsed = JSON.parse(data);
        AsyncStorage.setItem(
          "auth-state",
          JSON.stringify({
            ...parsed,
            pin,
          }),
        );
      }
    });
  },

  hasPin: () => {
    const { pin } = get();
    return pin !== null && pin !== undefined;
  },

  setAccountTier: (tier) => {
    const nextTier = normalizeTier(tier);
    set({ accountTier: nextTier });

    AsyncStorage.getItem("auth-state").then((data) => {
      const parsed = data ? JSON.parse(data) : {};
      const nextState = {
        ...parsed,
        accountTier: nextTier,
        user: parsed.user
          ? { ...parsed.user, accountTier: nextTier, tier: nextTier }
          : parsed.user,
      };
      AsyncStorage.setItem("auth-state", JSON.stringify(nextState));
    });
  },
}));
