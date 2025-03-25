import "./App.css";
import { MantineProvider, Flex, createStyles } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PageNotFound from "./pages/PageNotFound";
import Header from "./components/Header";
import { useState, useMemo, useEffect } from "react";

import { AuthContext } from "core/context";
import SupplierDashboard from "pages/SupplierDashboard";
import AuthInterceptor from "services/interceptor";
import authService from "services/auth.service";
const useStyles = createStyles((theme) => ({
  wrapper: {
    overflow: "hidden",
  },
}));
function App() {
  const { classes } = useStyles();
  const [authData, setAuthData] = useState(null);
  const navigate = useNavigate();
  const authDataStates = useMemo(
    () => ({
      authData,
      setAuthData,
    }),
    [authData]
  );

  useEffect(() => {
    const authDataGet = authService.getAuthData();
    if (authDataGet) {
      setAuthData(authDataGet);
      navigate("/SupplierPage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: "Inter, sans-serif",
        colors: {
          blue: [
            "#E3F2FD",
            "#6B9DB3",
            "#4F96B4",
            "#3B8EB1",
            "#2887AE",
            "#1581AD",
            "#027CAF",
            "#11698E",
            "#1B5A75",
            "#204E61",
          ],
        },
        primaryColor: "blue",
        colorScheme: "light",
        components: {
          Button: {
            // Subscribe to theme and component params
            styles: (theme, params, { variant }) => ({
              root: {
                // height: "1.625rem",
                padding: "0 1.2rem",
                backgroundColor:
                  variant === "filled"
                    ? theme.colors[params.color || theme.primaryColor][6]
                    : undefined,
              },
            }),
          },
          // Table: {
          //   styles: (theme, params: TableStylesParams, { variant }) => ({
          //     th: { borderBottom: "0px", padding: "20px" }
          //   })
          // }
        },
      }}
    >
      <ModalsProvider>
        <Notifications position="top-right" zIndex={9999} />
        <AuthContext.Provider value={authDataStates}>
          <AuthInterceptor />

          <Flex direction="column" h="100%" className={classes.wrapper}>
            <div>{authData && <Header />}</div>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/Signup" element={<SignUp />} />
              <Route path="/SupplierPage" element={<SupplierDashboard />} />
              {/* 👇️ only match this when no other routes match */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            {/* <Table /> */}
            {/* <FooterComponent /> */}
          </Flex>
        </AuthContext.Provider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
