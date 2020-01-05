import React, { useRef, useLayoutEffect, useState } from "react";
import { Typography, Button, makeStyles } from "@material-ui/core";
import { IOption, songs } from "../../consts";
import YouTube from "react-youtube";

interface IProps {
  guess: IOption | null;
  songNumber: number;
  nextSong: () => void;
}

const useStyles = makeStyles(theme => ({
  videoContainer: {
    maxWidth: "900px",
    margin: `${theme.spacing(2)}px auto`,
  },
  youtubeVideoContainer: {
    height: "100%",
  },
}));

export const AnswerScreen: React.FC<IProps> = props => {
  const classes = useStyles();
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const [videoContainerHeight, setVideoContainerHeight] = useState();

  const song = songs[props.songNumber - 1];

  useLayoutEffect(() => {
    const updateSize = () => {
      const videoContainerWidth = videoContainerRef.current?.clientWidth ?? 0;
      setVideoContainerHeight(videoContainerWidth * 0.5625);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (song == null) {
    return null;
  }

  return (
    <>
      <Typography variant="h3" color="primary">
        {props.guess == null
          ? "Timed out"
          : props.guess.correct
          ? "Correct!"
          : "Wrong"}
      </Typography>
      <Typography color="primary">{`${
        props.guess == null || !props.guess.correct ? "Correct answer is: " : ""
      }${song.artist} - ${song.name}`}</Typography>
      <div
        className={classes.videoContainer}
        ref={videoContainerRef}
        style={{
          height: `${videoContainerHeight}px`,
        }}
      >
        <YouTube
          containerClassName={classes.youtubeVideoContainer}
          videoId={song.youtubeVideoId}
          opts={{
            height: "100%",
            width: "100%",
            playerVars: {
              start: song.youtubeStart,
              autoplay: 1,
              showinfo: 0,
              controls: 1,
              modestbranding: 1,
            },
          }}
        />
      </div>
      <Button
        onClick={() => {
          props.nextSong();
        }}
        variant="outlined"
        color="primary"
        size="large"
      >
        Next
      </Button>
    </>
  );
};
