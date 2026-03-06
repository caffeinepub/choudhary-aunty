import type { CustomerAccount } from "@/backend.d";
import { useActor } from "@/hooks/useActor";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// ============================================
// AUTH CONTEXT
// ============================================

interface AuthContextValue {
  customerAccount: CustomerAccount | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (
    name: string,
    phone: string,
    email: string,
    city: string,
    state: string,
  ) => Promise<void>;
  logout: () => void;
  refreshAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  customerAccount: null,
  isLoggedIn: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  refreshAccount: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { actor, isFetching } = useActor();
  const [customerAccount, setCustomerAccount] =
    useState<CustomerAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on app load
  useEffect(() => {
    if (isFetching || !actor) return;
    const restore = async () => {
      setIsLoading(true);
      try {
        const account = await actor.getMyAccount();
        setCustomerAccount(account ?? null);
      } catch {
        // Check localStorage for saved account
        const saved = localStorage.getItem("ca_customer_account");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            // Convert string back to bigint for id/asharfiPoints
            if (parsed.id) parsed.id = BigInt(parsed.id);
            if (parsed.asharfiPoints)
              parsed.asharfiPoints = BigInt(parsed.asharfiPoints);
            if (parsed.signupDate)
              parsed.signupDate = BigInt(parsed.signupDate);
            setCustomerAccount(parsed);
          } catch {
            setCustomerAccount(null);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    restore();
  }, [actor, isFetching]);

  const login = useCallback(
    async (
      name: string,
      phone: string,
      email: string,
      city: string,
      state: string,
    ) => {
      if (!actor) throw new Error("Not connected");
      setIsLoading(true);
      try {
        const account = await actor.registerCustomer(
          name,
          phone,
          email,
          city,
          state,
        );
        setCustomerAccount(account);
        // Save to localStorage (serializing bigints to strings)
        localStorage.setItem(
          "ca_customer_account",
          JSON.stringify(account, (_key, value) =>
            typeof value === "bigint" ? value.toString() : value,
          ),
        );
      } finally {
        setIsLoading(false);
      }
    },
    [actor],
  );

  const logout = useCallback(() => {
    setCustomerAccount(null);
    localStorage.removeItem("ca_customer_account");
  }, []);

  const refreshAccount = useCallback(async () => {
    if (!actor) return;
    try {
      const account = await actor.getMyAccount();
      if (account) {
        setCustomerAccount(account);
        localStorage.setItem(
          "ca_customer_account",
          JSON.stringify(account, (_key, value) =>
            typeof value === "bigint" ? value.toString() : value,
          ),
        );
      }
    } catch {
      // silently fail
    }
  }, [actor]);

  return (
    <AuthContext.Provider
      value={{
        customerAccount,
        isLoggedIn: customerAccount !== null,
        isLoading,
        login,
        logout,
        refreshAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
