import React, { Dispatch, SetStateAction } from "react";
import { Typography, makeStyles, Grow, Button } from "@material-ui/core";
import { getNumberOfCorrectSongs } from "../../Utils/localStorageUtils";
import { currentLevelKeyName, numberOfCorrectSongsKeyName } from "../../consts";
import { Facebook } from "../../Icons/Facebook";

interface IProps {
  setSongNumber: Dispatch<SetStateAction<number>>;
}

const useStyles = makeStyles(theme => ({
  gradeContainer: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "50%",
    width: "178px",
    display: "inline-block",
  },
  gradeText: {
    fontSize: 96,
    margin: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
  },
  yourGrade: {
    margin: theme.spacing(1),
  },
  resultText: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(0),
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

declare global {
  interface Window {
    FB: any;
  }
}

export const GameCompletedScreen: React.FC<IProps> = props => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h3" color="primary" className={classes.title}>
        Game Completed
      </Typography>
      <Typography color="primary" className={classes.yourGrade}>
        Your grade:
      </Typography>
      <div className={classes.gradeContainer}>
        <Grow in={true}>
          <Typography className={classes.gradeText} color="primary">
            A+
          </Typography>
        </Grow>
      </div>
      <Typography color="primary" className={classes.resultText}>
        {`You answered ${getNumberOfCorrectSongs()}/20 songs correctly`}
      </Typography>
      <div className={classes.buttonsContainer}>
        <Button
          onClick={() => {
            window.FB.ui(
              {
                method: "share",
                href: "https://google.se",
              },
              function(response: any) {},
            );
          }}
          variant="outlined"
          color="primary"
          size="large"
          startIcon={<Facebook />}
        >
          Share
        </Button>

        <Button
          onClick={() => {
            localStorage.setItem(currentLevelKeyName, "1");
            localStorage.setItem(numberOfCorrectSongsKeyName, "0");
            props.setSongNumber(1);
          }}
          color="primary"
          size="large"
          className={classes.button}
        >
          Play again
        </Button>
      </div>
    </>
  );
};
