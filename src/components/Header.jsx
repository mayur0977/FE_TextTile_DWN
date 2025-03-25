import {
  Header,
  Flex,
  Image,
  Box,
  createStyles,
  Menu,
  Text,
  Group,
} from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { AuthContext } from "core/context";

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles(() => ({
  imageContainer: {
    borderRightWidth: "2px",
  },
  logo: {
    height: "40px",
    width: "100%",
    objectFit: "contain",
  },
}));

function HeaderComponent() {
  const { classes } = useStyles();

  const { authData, setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Header
      height="auto"
      px="lg"
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "rgba(230,230,230)",
        borderBottom: "2px solid gray",
      }}
    >
      <Flex justify="space-between" align="center" w="100%">
        <Flex gap="xl" align="center">
          <Box className={classes.imageContainer} pl="sm" pr="xl" py="md">
            <Image
              src="/images/logo-material.svg"
              height={52}
              className={classes.logo}
            />
          </Box>
        </Flex>
        <Box style={{ cursor: "pointer" }}>
          <Menu
            shadow="md"
            width={240}
            withArrow
            arrowPosition="side"
            position="bottom-end"
          >
            <Menu.Target
              onClick={() => {
                setAuthData(null);
                localStorage.clear();
                navigate("/");
              }}
            >
              <Group spacing={10}>
                <Text style={{ fontWeight: 700 }}>
                  {authData.firstName} {authData.lastName}
                </Text>
                <IconLogout color="red" size={22} />
              </Group>
            </Menu.Target>
          </Menu>
        </Box>
      </Flex>
    </Header>
  );
}

export default HeaderComponent;
