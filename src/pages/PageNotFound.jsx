import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
} from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    height: "100%",
    overflow: "hidden",
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginTop: "5rem",
    marginBottom: theme.spacing.xl,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.blue[8],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },

  title: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
}));

function PageNotFound() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  return (
    <Container className={classes.root}>
      <Text className={classes.label}>404</Text>
      <Title className={classes.title}>You have found a secret place.</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}
      >
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, or the page has been moved to another URL.
      </Text>
      <Group position="center">
        <Button
          onClick={() => {
            navigate("/");
          }}
          variant="subtle"
          size="md"
        >
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
}

export default PageNotFound;
