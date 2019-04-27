import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames'

const styles = {
  root: {
    flexGrow: 1,
  },
  root1: {
      padding:'5px',
  },
  paper: {
      width: 100,
      maxHeight: '90%',
  },
  keyy: {
      margin:"3px",
      fontSize: 13,
      fontWeight: 5,
  },
  vall: {
      margin: "3px",
      color: 'silver',
  },
  app: {
      maxHeight: '50px',
      backgroundColor: '	#575A5D',
      boxShadow: 'none',
  },
  demo: {
    maxHeight: '50px',
    },
pad: {
    paddingRight: '4px',
},
val: {
    fontSize: '12px',
  },
  val1: {
    fontSize: '8px',
  },
  keyy: {
    fontSize: '10px',
  },
};

const barItems = [
    {
        key: "Id",
        value: "zone1",
    },
    {
        key: "Location",
        value: "192*",
    },
    {
        key: "WindSpeed",
        value: "13",
    },
    {
        key: "RainSpeed",
        value: "67",
    }
]

const buttonObject = {
    "id": "zone1",
    "location": "19.8,20.8 Chennai",
    "rainfall": 110,
    "windspeed": 23,
    "swversion": "0.0.9",
  }

function SimpleBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: '#575A5D' }} 
className={classes.app}>
        <Toolbar style={{ backgroundColor: '#575A5D' }} >
        <Grid container className={classes.root1} spacing={16}>
                <Grid item xs={12} className={classes.pad}>
                    <Grid container className={classes.demo} justify="flex-start" spacing={Number(8)}>
                    <Grid key={0} item >
                    <Paper className={classes.paper} >
                    <center><div className={classes.keyy}><b>ID</b></div> <div className={classes.val}>{props.button["id"]}</div></center>
                  </Paper>
                  </Grid>
                  <Grid key={3} item >
                  {props.windSpeeed > props.windSpeedT &&
                    <Paper className={classNames(classes.paper, "blink")} >
                    <center><div className={classes.keyy}>
                      <b>WindSpeed</b></div> <div className={classes.val1}>{props.windSpeeed} mph, putting all panels to stow</div></center>
                    </Paper>
                  }
                  {props.windSpeeed <= props.windSpeedT &&
                    <Paper className={classes.paper} >
                    <center><div className={classes.keyy}>
                      <b>WindSpeed</b></div> <div className={classes.val}>{props.windSpeeed} mph</div></center>
                    </Paper>
                  }
                  </Grid>
                  <Grid key={4} item>
                  <Paper className={classes.paper} >
                  <center><div className={classes.keyy}>
                    <b>ZC Version</b> </div><div className={classes.val}><b>S/W &nbsp;</b>{props.button["swversion"]}</div></center>
                  </Paper>

                  </Grid>
                  <Grid key={5} item>
                  <Paper className={classes.paper} >
                  <center><div className={classes.keyy}>
                    <b>ZC Version</b> </div><div className={classes.val}><b>H/W &nbsp; </b>{props.button["hwversion"]}</div></center>
                  </Paper>

                  </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBar);