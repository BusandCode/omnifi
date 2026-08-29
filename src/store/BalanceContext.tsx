import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { accountData } from "../constants/accountData";
import { CurrencyCode } from "../constants/currencies";

const STORAGE_KEY = "omnifi_balances_v1";

type Balances = Record<CurrencyCode, number>;

// Seeded once from the same accountData used elsewhere, so the very
// first render matches Add Money / Send before any transaction happens.
const INITIAL_BALANCES: Balances = {
  NGN: 1245600.0,
  USD: accountData.USD.balance,
  EUR: accountData.EUR.balance,
};

type Action =
  | { type: "HYDRATE"; balances: Balances }
  | { type: "DEBIT"; currency: CurrencyCode; amount: number }
  | { type: "CREDIT"; currency: CurrencyCode; amount: number }
  | { type: "SET"; currency: CurrencyCode; amount: number };

function reducer(state: Balances, action: Action): Balances {
  switch (action.type) {
    case "HYDRATE":
      return action.balances;
    case "DEBIT":
      return {
        ...state,
        [action.currency]: Math.max(0, state[action.currency] - action.amount),
      };
    case "CREDIT":
      return { ...state, [action.currency]: state[action.currency] + action.amount };
    case "SET":
      return { ...state, [action.currency]: action.amount };
    default:
      return state;
  }
}

type BalanceContextValue = {
  balances: Balances;
  hydrated: boolean;
  debit: (currency: CurrencyCode, amount: number) => void;
  credit: (currency: CurrencyCode, amount: number) => void;
  setBalance: (currency: CurrencyCode, amount: number) => void;
};

const BalanceContext = createContext<BalanceContextValue | null>(null);

export function BalanceProvider({ children }: { children: ReactNode }) {
  const [balances, dispatch] = useReducer(reducer, INITIAL_BALANCES);
  const hydratedRef = useRef(false);

  // Load persisted balances on mount.
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          dispatch({ type: "HYDRATE", balances: JSON.parse(raw) });
        }
      } catch {
        // If storage read fails, fall back to defaults silently.
      } finally {
        hydratedRef.current = true;
      }
    })();
  }, []);

  // Persist on every change, but skip the very first render before
  // hydration finishes so we don't overwrite saved data with defaults.
  useEffect(() => {
    if (!hydratedRef.current) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(balances)).catch(() => {});
  }, [balances]);

  const value: BalanceContextValue = {
    balances,
    hydrated: hydratedRef.current,
    debit: (currency, amount) => dispatch({ type: "DEBIT", currency, amount }),
    credit: (currency, amount) => dispatch({ type: "CREDIT", currency, amount }),
    setBalance: (currency, amount) => dispatch({ type: "SET", currency, amount }),
  };

  return <BalanceContext.Provider value={value}>{children}</BalanceContext.Provider>;
}

export function useBalances() {
  const ctx = useContext(BalanceContext);
  if (!ctx) throw new Error("useBalances must be used within a BalanceProvider");
  return ctx;
}