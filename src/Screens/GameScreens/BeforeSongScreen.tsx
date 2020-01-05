import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

interface IProps {
  songNumber: number;
}

const useStyles = makeStyles(theme => ({
  container: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 20,
    minWidth: "218px",
    display: "inline-block",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  largeText: {
    fontSize: 144,
  },
  text: {
    display: "inline",
  },
}));

export const BeforeSongScreen: React.FC<IProps> = props => {
  const classes = useStyles();

  return (
    <>
      {props.songNumber === 1 && (
        <Typography color="primary" variant="h4" gutterBottom>
          Wait
        </Typography>
      )}
      <div className={classes.container}>
        <Typography
          className={`${classes.largeText} ${classes.text}`}
          color="primary"
        >
          {props.songNumber}
        </Typography>
        <Typography className={classes.text} color="primary" variant="h5">
          /20
        </Typography>
      </div>
    </>
  );
};
