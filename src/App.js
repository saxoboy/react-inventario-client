import React, { useState, useEffect, useMemo } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import Auth from "./pages/auth";
import Navigation from "./routes/Navigation"
import AuthContext from "./context/AuthContext";
import { getToken, decodeToken } from "./utils/token";


function App() {
  const [auth, setAuth] = useState(undefined);
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setAuth(null);
    } else {
      setAuth(decodeToken(token));
    }
  }, []);

  const logout = () => {
    console.log("Cerrar Sesion");
  };

  const setUser = (user) => {
    setAuth(user);
  };

  const authData = useMemo(
    () => ({
      auth,
      logout,
      setUser,
    }),
    [auth]
  );

  if(auth === undefined) return null // para evitar flash login
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <AuthContext.Provider value={authData}>
          <CssBaseline />
          {!auth ? <Auth /> : <Navigation /> }
        </AuthContext.Provider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
