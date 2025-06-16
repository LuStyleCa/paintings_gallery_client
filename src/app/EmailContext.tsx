import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

// Define the type for the context value
type EmailContextType = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

// Create context with the correct type, but allow initial null (we'll handle it in the hook)
const EmailContext = createContext<EmailContextType | null>(null);

// Provide the context
export const EmailProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState("");

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
};

// Hook to use the context
export const useEmail = () => {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error("useEmail must be used within an EmailProvider");
  }
  return context;
};
