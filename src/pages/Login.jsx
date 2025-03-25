import {
  Box,
  Button,
  Grid,
  Image,
  LoadingOverlay,
  PasswordInput,
  Select,
  Text,
  TextInput,
  createStyles,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { AuthContext } from "core/context";
import { useContext, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import authService from "services/auth.service";
import { validationLogin } from "shared/auth.validation";
const loginStyles = createStyles(() => ({
  loginContainer: {
    backgroundColor: "rgba(0,0,0,0.9)",
    position: "fixed",
    inset: 0,
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  bannerSubText: {
    fontSize: "1.2rem",
    lineHeight: "1.75rem",
    fontWeight: 500,
    marginBottom: "1rem",
    position: "relative",
    "&:after": {
      content: `""`,
      position: "absolute",
      borderRadius: "20px",
      width: "3rem",
      height: "4px",
      backgroundColor: "white",
      left: 0,
      bottom: "-0.5rem",
    },
  },
}));

function Login() {
  const [loading, setLoading] = useState(false);
  const { setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();
  const { classes, theme } = loginStyles();
  const form = useForm({
    validate: yupResolver(validationLogin),
    initialValues: {
      email: "",
      password: "",
      role: "retailer",
    },
  });

  /**
   * This method is used to call the login API and after success
   * login will call dashboard api status
   * @param values type of any to initiate login API
   */
  const handleSubmitUser = (values) => {
    setLoading(true);
    authService
      .loginUser(values)
      .then((res) => {
        authService.setAuthData(res.data);
        setAuthData(res.data);
        setLoading(false);
        navigate("/ManufacturerDashboard");
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error", error);
      });
  };

  // useEffect(() => {
  //   if (authData !== null) {
  //     navigate("MyLeads/AgentProsList");
  //   }
  // }, [authData, navigate]);

  return (
    <main
      role="main"
      style={{
        padding: 0,
        margin: 0,
        height: "100%",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <Box className={classes.loginContainer}>
        <Box style={{ display: "flex", maxWidth: "900px" }} pos="relative">
          <LoadingOverlay
            style={{ borderRadius: "14px" }}
            visible={loading}
            overlayBlur={1}
          />
          <Grid grow gutter={0}>
            <Grid.Col
              style={{
                backgroundColor: "rgba(0,0,0,0.6)",
                height: "100%",
                padding: "2.5rem",
                width: "500px",
                flexGrow: 1,
                borderTopLeftRadius: "15px",
                borderBottomLeftRadius: "15px",
                color: "white",
              }}
              span={4}
            >
              <Box>
                <Image
                  src="images/logo-material.svg"
                  alt="Material cloth brand"
                  fit="contain"
                  height={70}
                  styles={{
                    image: {
                      height: "100%",
                    },
                  }}
                  style={{ marginBottom: "2.5rem" }}
                />
              </Box>
              <Box>
                <Text
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5rem",
                    display: "block",
                    marginBottom: "0.7rem",
                  }}
                >
                  Welcome
                </Text>

                <Text className={classes.bannerSubText}>
                  TextTile Management
                </Text>
              </Box>
            </Grid.Col>
            <Grid.Col
              style={{
                padding: "2.5rem",
                borderTopRightRadius: "15px",
                borderBottomRightRadius: "15px",
                backgroundColor: "white",
              }}
              span={4}
            >
              <form
                autoComplete="off"
                autoCorrect="off"
                onSubmit={form.onSubmit((values) => handleSubmitUser(values))}
              >
                <Text
                  style={{
                    fontSize: "1.875rem",
                    lineHeight: "2.25rem",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                  }}
                >
                  Sign In
                </Text>
                <Text
                  style={{
                    fontSize: "0.875rem",
                    lineHeight: "1.25rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  Sign in if you have an account in here
                </Text>
                <Box style={{ marginBottom: "0.75rem" }}>
                  <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="Email Id"
                    {...form.getInputProps("email")}
                  />
                </Box>
                <Box style={{ marginBottom: "1.5rem" }}>
                  <PasswordInput
                    withAsterisk
                    label="Password"
                    placeholder="password"
                    {...form.getInputProps("password")}
                  />
                </Box>
                <Box style={{ marginBottom: "1.5rem" }}>
                  <Select
                    data={[
                      { value: "retailer", label: "Retailer" },
                      { value: "supplier", label: "Supplier" },
                      { value: "manufacturer", label: "Manufacturer" },
                    ]}
                    placeholder="Select Role"
                    label={
                      <Text>
                        Select your role{" "}
                        <i>
                          (if you are not <strong>retailer</strong>)
                        </i>
                      </Text>
                    }
                    {...form.getInputProps("role")}
                  />
                </Box>

                <Button variant="filled" fullWidth type="submit">
                  SIGN IN
                </Button>

                <Text
                  style={{
                    textAlign: "center",
                    marginTop: "24px",
                    color: `${theme.colors.blue[8]}`,
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  role="button"
                  onClick={() => navigate("/signUp")}
                >
                  Create an Account{" "}
                </Text>
              </form>
            </Grid.Col>
          </Grid>
        </Box>
      </Box>
    </main>
  );
}

export default Login;
