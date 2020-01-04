import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

interface IProps {
  songNumber: number;
}

const useStyles = makeStyles(theme => ({
  container: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 20,
    width: "218px",
    display: "inline-block",
  },
  text: {
    fontSize: 144,
  },
}));

export const BeforeSongScreen: React.FC<IProps> = props => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography className={classes.text} color="primary">
        {props.songNumber}
      </Typography>
    </div>
  );
};
