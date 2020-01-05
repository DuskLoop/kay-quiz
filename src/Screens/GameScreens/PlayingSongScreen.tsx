import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { playingSongTime } from "../../consts";
import { Typography, makeStyles, Grow } from "@material-ui/core";
import { GameState } from "../GameScreen";

interface IProps {
  songNumber: number;
  setGameState: Dispatch<SetStateAction<GameState>>;
}

const useStyles = makeStyles(theme => ({
  container: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "50%",
    width: "218px",
    display: "inline-block",
  },
  text: {
    fontSize: 144,
  },
}));

export const PlayingSongScreen: React.FC<IProps> = props => {
  const classes = useStyles();

  const [time, setTime] = useState<number>(playingSongTime / 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime(prevTime => prevTime - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  const { setGameState } = props;

  useEffect(() => {
    if (time <= 0) {
      setGameState(GameState.guess);
    }
  }, [time, setGameState]);

  return (
    <>
      {props.songNumber === 1 && (
        <Typography color="primary" variant="h4" gutterBottom>
          Listen
        </Typography>
      )}
      <div className={classes.container}>
        <Grow in={true} key={time}>
          <Typography className={classes.text} color="primary">
            {time}
          </Typography>
        </Grow>
      </div>
    </>
  );
};
