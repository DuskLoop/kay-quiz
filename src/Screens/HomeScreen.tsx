import React from "react";
import { Button, Typography, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

interface IProps {}

const useStyles = makeStyles(theme => ({
  titleText: {
    fontWeight: 800,
    margin: theme.spacing(2),
  },
}));

export const HomeScreen: React.FunctionComponent<IProps> = props => {
  const classes = useStyles();

  const history = useHistory();

  return (
    <>
      <div>
        <Typography variant="h3" color="primary" className={classes.titleText}>
          KAY QUIZ
        </Typography>
      </div>
      <Button
        onClick={() => {
          history.push("/game");
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
