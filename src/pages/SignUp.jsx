import {
  Box,
  Button,
  Grid,
  Group,
  Image,
  LoadingOverlay,
  PasswordInput,
  Select,
  Text,
  TextInput,
  createStyles,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import authService from "services/auth.service";
import { validationSignup } from "shared/auth.validation";

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

function SignUp() {
  const [loading, setLoading] = useState(false);
  const { classes, theme } = loginStyles();
  const navigate = useNavigate();
  const form = useForm({
    validate: yupResolver(validationSignup),
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      passwordConfirm: "",
      role: "",
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
      .signUpSupplier(values)
      .then((res) => {
        console.log("Create user", res);
        setLoading(false);
        if (res.status === 201) {
          showNotification({
            message: (
              <Group>
                <Text>
                  Sign up supplier successfully.
                  <br />
                  <strong>Login to continue</strong>
                </Text>
              </Group>
            ),
            icon: <IconCircleCheckFilled size={16} />,
            color: "teal",
            styles: () => ({
              root: {
                marginTop: "2rem",
                padding: "1.2rem 0.5rem",
              },
            }),
          });
          form.reset();
          navigate("/");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("signup Error", error);
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
                  Cloth Material Management
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
                  Sign Up
                </Text>
                <Text
                  style={{
                    fontSize: "0.875rem",
                    lineHeight: "1.25rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  Sign up as a supplier to proceed further
                </Text>
                <Box style={{ marginBottom: "0.75rem" }}>
                  <TextInput
                    withAsterisk
                    label="Name"
                    placeholder="Name"
                    {...form.getInputProps("name")}
                  />
                </Box>

                <Box style={{ marginBottom: "0.75rem" }}>
                  <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="Email Id"
                    {...form.getInputProps("email")}
                  />
                </Box>
                <Box style={{ marginBottom: "0.75rem" }}>
                  <TextInput
                    withAsterisk
                    label="Phone number"
                    placeholder="Phone number"
                    {...form.getInputProps("phoneNumber")}
                  />
                </Box>
                <Box style={{ marginBottom: "0.75rem" }}>
                  <Select
                    withAsterisk
                    label="Role"
                    placeholder="Select Role"
                    {...form.getInputProps("role")}
                    data={[
                      { value: "manufacturer", label: "Manufacturer" },
                      { value: "retailer", label: "Retailer" },
                      { value: "supplier", label: "Supplier" },
                    ]}
                  />
                </Box>
                <Box style={{ marginBottom: "0.75rem" }}>
                  <PasswordInput
                    withAsterisk
                    label="Password"
                    placeholder="password"
                    {...form.getInputProps("password")}
                  />
                </Box>
                <Box style={{ marginBottom: "1.75rem" }}>
                  <PasswordInput
                    withAsterisk
                    label="Confirm Password"
                    placeholder="confirm password"
                    {...form.getInputProps("passwordConfirm")}
                  />
                </Box>

                <Button variant="filled" fullWidth type="submit">
                  SIGN UP
                </Button>

                <Text
                  style={{
                    textAlign: "center",
                    marginTop: "24px",
                    color: `${theme.colors.blue[8]}`,
                    cursor: "pointer",
                  }}
                  role="button"
                  onClick={() => navigate("/")}
                >
                  Already have an Account ?{" "}
                  <span style={{ textDecoration: "underline" }}>Login</span>
                </Text>
              </form>
            </Grid.Col>
          </Grid>
        </Box>
      </Box>
    </main>
  );
}

export default SignUp;
