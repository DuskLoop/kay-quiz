import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: 'white',
    minHeight: '100%',
  },
  image: {
    width: '250px',
    [theme.breakpoints.down('xs')]: {
      width: '50%',
    },
  },
  mail: { padding: '40px' },
}));

interface IProps {}

export const SupportScreen: React.FC<IProps> = props => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Kay Quiz
      </Typography>
      <Typography variant="h6" gutterBottom>
        In this game you will hear the intro to a K-pop song and your objective
        is to guess which song it is
      </Typography>
      <Typography variant="h6" gutterBottom>
        The game consists of 4 stages
      </Typography>
      <Typography variant="h5" gutterBottom>
        Stage 1 - Wait
      </Typography>
      <Typography gutterBottom>
        In this stage you just need to wait. You will see the number on the next
        song and number of total songs (20)
      </Typography>
      <img src="./supportImages/stage1.png" className={classes.image}></img>
      <Typography variant="h5" gutterBottom>
        Stage 2 - Listen
      </Typography>
      <Typography gutterBottom>
        Listen carefully and try to think of the song name
      </Typography>
      <img src="./supportImages/stage2.png" className={classes.image}></img>
      <Typography variant="h5" gutterBottom>
        Stage 3 - Guess
      </Typography>
      <Typography gutterBottom>Click on one of the 4 options</Typography>
      <img src="./supportImages/stage3.png" className={classes.image}></img>
      <Typography variant="h5" gutterBottom>
        Stage 4 - Result
      </Typography>
      <Typography gutterBottom>
        Here you will know if you guess correct and also be able to watch a MV
        of the correct song
      </Typography>
      <img src="./supportImages/stage4.png" className={classes.image}></img>
      <Typography className={classes.mail} variant="h5">
        For questions, email: kolmenx2@gmail.com
      </Typography>
    </div>
  );
};
