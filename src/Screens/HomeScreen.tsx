import React, { Dispatch, SetStateAction } from "react";
import { Button, Typography, makeStyles } from "@material-ui/core";
import { AppState } from "../App";

interface IProps {
  setAppState: Dispatch<SetStateAction<AppState>>;
}

const useStyles = makeStyles(theme => ({
  titleText: {
    fontWeight: 800,
    margin: theme.spacing(2),
  },
}));

export const HomeScreen: React.FunctionComponent<IProps> = props => {
  const classes = useStyles();

  return (
    <>
      <div>
        <Typography variant="h3" color="primary" className={classes.titleText}>
          KAY QUIZ
        </Typography>
      </div>
      <Button
        onClick={() => {
          props.setAppState(AppState.Game);
        }}
        variant="outlined"
        color="primary"
        size="large"
      >
        Play
      </Button>
    </>
  );
};
