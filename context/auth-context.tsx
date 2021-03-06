import { createContext, useContext } from "react";
import FullPageSpinner from "../components/fullPageSpinner";
import { useMeQuery } from "../generated/graphql";

type User = {
  me: { id: number; name: string; avatar: string };
};

interface State {
  loading: boolean;
  user: User;
}

const AuthContext = createContext<State | null>(null);

export const AuthProvider = (props: any) => {
  const { loading, data } = useMeQuery();

  const user = data;

  const value = { user, loading };

  // if (loading) return <FullPageSpinner />;

  return <AuthContext.Provider value={value} {...props} />;
};

export const useAuth = (): State | null => {
  const context: State | null = useContext(AuthContext);

  return context;
};
