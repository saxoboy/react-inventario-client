import React, { useState, useEffect, useMemo } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import Auth from "./pages/auth";
import AuthContext from "./context/AuthContext";
import { getToken } from "./utils/token";
import NavBar from "./components/NavBar";

function App() {
  const [auth, setAuth] = useState(undefined);
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setAuth(null);
    } else {
      setAuth(token);
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
  console.log(auth)
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <AuthContext.Provider value={authData}>
          <CssBaseline />
          {!auth ? <Auth /> : <NavBar />}
        </AuthContext.Provider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
