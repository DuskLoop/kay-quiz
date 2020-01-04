import React from "react";
import {
  CssBaseline,
  Container,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomeScreen } from "./Screens/HomeScreen";
import { GameScreen } from "./Screens/GameScreen";
import { theme } from "./Utils/theme";

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: "center",

    paddingRight: 0,
    paddingLeft: 0,
  },
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Container className={classes.container}>
          <Switch>
            <Route path="/game">
              <GameScreen />
            </Route>
            <Route path="/">
              <HomeScreen />
            </Route>
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
