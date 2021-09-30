import React, { 
  createContext,
  ReactNode,
  useContext
 } from 'react';

 import * as AuthSession from 'expo-auth-session';

 interface AuthProviderProps {
  children: ReactNode
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextProps {
  user: User;
  signInWithGoogle(): Promise<void>
}

const AuthContext = createContext({} as AuthContextProps);


function AuthProvider({ children }: AuthProviderProps) {
  const user = {
    id:'123456',
    name: 'Iago Pinto',
    email: 'iago111996@gmail.com',
  }

  async function signInWithGoogle() {
    try {
      const CLIENT_ID= '207764922669-3q6khdt2dea20i2b7a84c3osh98m3bsc.apps.googleusercontent.com';
      const REDIRECT_URI= 'https://auth.expo.io/@iagopinto/gofinances';
      const RESPONSE_TYPE= 'token';
      const SCOPE= encodeURI('profile email');

      const authUrl= `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const response = await AuthSession.startAsync({ authUrl });
      console.log(response);

    } catch (error) {
      const errorType = String(error);
      throw new Error(errorType);
    }
  }

  return(
    <AuthContext.Provider value={{
      user,
      signInWithGoogle
    }}>
     { children }
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }