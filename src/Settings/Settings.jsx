 import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import classNames from 'classnames';
import { settingsActions } from '../_actions'
import { Typography, FormControl } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ReactDOM from 'react-dom';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    height: 'calc(100% - 64px)',
    width: '100%',
    overflow: 'auto',
  }, 
  header: {
    padding: '10px',
  },
paper: {
    width: '100%',
    verticalAlign: 'middle',
      position: 'relative',
      textAlign: 'center',
      height: '450px',

},

  menu: {
      width: '71%'
  },
  scrollDiv: {
      height: '70%',
      overflowY: 'scroll'
  },
  button: {
    position: 'absolute',
    bottom: 15,
    marginLeft: '-12%',
  },
  grid: {
    height: '482px',
    padding: '16px',
  }
});

class Settings extends Component {

    state = {
        ssid: '',
        password: '',
        submitted: false,
        panID: '',
        enabled: '',
        maxWindSpeed: 5,
        maxRainFall: 5,
        meanWindSpeed: 2,
        windSpeedTimer: 30,
        timeZone: "",
        default1: 20,
	thresholdOK: false,
	heartBeatOK: false,
        maxWindSpeed1:0, maxRainFall1:0, meanWindSpeed1:0 ,windSpeedTimer1:0, hbinterval1:0, maxMsgs1:0, panid1:0,
        labelWidth: 0,
        };

        componentDidMount(){
            this.props.getSettings();   
        }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(name, value);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { ssid, password } = this.state;
    if (ssid && password) {
        this.props.setWifiInfo(ssid, password);
    }
  }

  handleClick = () => {
    this.props.setPanID(this.state.panID);
  }

  handleThreshold = () => {
      console.log(this.state.maxWindSpeed);
      console.log(this.state.maxWindSpeed, this.state.maxRainFall, this.state.meanWindSpeed, this.state.windSpeedTimer);
      this.props.threshold(this.state.maxWindSpeed, this.state.maxRainFall, this.state.meanWindSpeed, this.state.windSpeedTimer);
  }

  handleHeartBeat = () => {
      
      if(this.state.enabled === 'disabled')
      {
          this.setState({hbinterval: 10, maxMsgs: 0});
          console.log(this.state.enabled, this.state.hbinterval? this.state.hbinterval: this.props.hbinterval1, this.state.maxMsgs? this.state.maxMsgs: this.props.maxMsgs1);
          this.props.heartBeat(this.state.enabled, this.state.hbinterval? this.state.hbinterval: this.props.hbinterval1, this.state.maxMsgs? this.state.maxMsgs: this.props.maxMsgs1);
      }

      if(this.state.enabled === 'enabled')
      {
        if(this.state.hbinterval === 0){
            toast('Heart Beat Interval cannot be 0', {
                position: "bottom-right"
              });
        }
        else{
            console.log(this.state.enabled, this.state.hbinterval? this.state.hbinterval: this.props.hbinterval1, this.state.maxMsgs? this.state.maxMsgs: this.props.maxMsgs1);
            this.props.heartBeat(this.state.enabled, this.state.hbinterval? this.state.hbinterval: this.props.hbinterval1, this.state.maxMsgs? this.state.maxMsgs: this.props.maxMsgs1);
        }
      }
        
  }

  handleTimeZone = () => {
      this.props.timeZone(this.state.timeZone);
  }

  

    render(){
        const { classes } = this.props;
        
        return (
            <div className={classes.root}>
            {this.props.heartBeatOK && this.props.thresholdOK &&
            <Grid   container justify="flex-start" direction="row" style={{height: '100%'}} >
              <Grid item md={3}  xs={6}  className={classes.grid} >
              <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3" className={classes.header}>
                        Set XBEE config
                    </Typography>
                    <br />
                    
                <form onSubmit={this.handleSubmit } >
                        <TextField
                            name="panID"
                            label="PAN ID"
                            placeholder="Enter the PAN ID"
                            margin="none"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
			    defaultValue={this.props.panid1.panID}
                        />
                        <br />
                        <br />
                        <Button type="submit" className={classes.button} onClick={this.handleClick} variant="outlined">
                            Submit
                        </Button>
                </form>
                </Paper>
              </Grid>

                            <Grid item md={3}  xs={6}  className={classes.grid}>
              <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3" className={classes.header}>
                        Threshold
                    </Typography>
                    <br />
                    
                <form onSubmit={this.handleSubmit} >
                <div>
                        <TextField
                            name="maxWindSpeed"
                            label="Maximum Wind Speed"
                            placeholder="Maximum Wind Speed"
                            margin="none"
                            onChange={this.handleChange}
                            margin="normal"
                            defaultValue={this.props.maxWindSpeed1}
                            variant="outlined"
                        />

                        <br />
                        <TextField
                            name="meanWindSpeed"
                            label="Mean Wind Speed"
                            placeholder="Mean Wind Speed"
                            margin="none"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            defaultValue={this.props.meanWindSpeed1}
                        />
                        <br />
                        <TextField
                            name="windSpeedTimer"
                            label="Wind Speed Timer"
                            placeholder="Wind Speed Timer"
                            margin="none"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            defaultValue={this.props.windSpeedTimer1}
                        />
                        <br />
                        <TextField
                            name="maxRainFall"
                            label="Maximum Rain Fall"
                            placeholder="Maximum Rain Fall"
                            margin="none"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            defaultValue={this.props.maxRainFall1}
                        />
                </div>

                        <br /><br />
                        <center><Button type="submit" className={classes.button} onClick={this.handleThreshold} variant="outlined">
                            Submit
                        </Button></center>
                </form>
                </Paper>
              </Grid>

        <Grid item md={3}  xs={6}  className={classes.grid} >
              <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3" className={classes.header}>
                        Heart Beat Settings
                    </Typography>
                    <br />
                    
                <form onSubmit={this.handleSubmit} >

          <TextField
          id="enabled-simple"
          select
          label="Enable"
          name="enabled"
          className={classes.menu}
          value={this.state.enabled}
          onChange={this.handleChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
          variant="outlined"
        >
          
          <MenuItem value="enabled">Enabled</MenuItem>
            <MenuItem value="disabled">Disabled</MenuItem>
          
        </TextField>
        <br />
          <TextField
                            name="hbinterval"
                            label="Heart Beat Interval"
                            placeholder="Heart Beat Interval"
                            margin="none"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            disabled={this.state.enabled === "disabled"}
                            defaultValue={this.props.hbinterval1}
                        />
                        <br />
                        <TextField
                            name="maxMsgs"
                            label="Max msgs before stow"
                            placeholder="Max msgs before stow"
                            margin="none"
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            disabled={this.state.enabled === "disabled"}
                            defaultValue={this.props.maxMsgs1}
                        />
                        <br /><br />
                        <center>
                            <Button type="submit" className={classes.button} onClick={this.handleHeartBeat} variant="outlined">
                                Submit
                            </Button>
                        </center>
                </form>
                </Paper>
              </Grid>

              <Grid item md={3}  xs={6}  className={classes.grid} >
              <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3" className={classes.header}>
                       Select Time Zone
                    </Typography>
                    
                    <br />
                <form onSubmit={this.handleSubmit}>

          <TextField
          id="timeZone-simple"
          select
          label="Select Time Zone"
          name="timeZone"
          className={classes.menu}
          value={this.state.timeZone}
          onChange={this.handleChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
          variant="outlined"
        >
          
          <MenuItem value="Asia/Kolkata">+ &nbsp; Asia/Kolkata</MenuItem>
            <MenuItem value="America/Denver">- &nbsp; America/Denver</MenuItem>
            <MenuItem value="Australia/Darwin">- &nbsp; Australia/Darwin</MenuItem>
          
        </TextField>
          
                        <br /><br />
                        <center>
                            <Button type="submit" className={classes.button} onClick={this.handleTimeZone} variant="outlined">
                                Submit
                            </Button>
                        </center>
                </form>
                </Paper>
              </Grid>
            </Grid>
            }
            </div>
        );
    }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const { maxWindSpeed1, maxRainFall1, meanWindSpeed1 ,windSpeedTimer1, hbinterval1, maxMsgs1, thresholdOK, heartBeatOK, panid1, panidOK} = state.settings;
    return {
        maxWindSpeed1, maxRainFall1, meanWindSpeed1 ,windSpeedTimer1, hbinterval1, maxMsgs1, thresholdOK, heartBeatOK, panid1, panidOK
    };
  }

const mapDispatchToProps = (dispatch) => ({
    setPanID: (panID) => {
        dispatch(settingsActions.setPanID(panID))
    },
    threshold: (maxWindSpeed, maxRainFall, meanWindSpeed, windSpeedTimer) => {
        dispatch(settingsActions.threshold(maxWindSpeed, maxRainFall, meanWindSpeed, windSpeedTimer))
    },
    heartBeat: (enabled, hbinterval, maxMsgs) => {
        dispatch(settingsActions.heartBeat(enabled, hbinterval, maxMsgs))
    },
    timeZone: (time) => {
        dispatch(settingsActions.timeZone(time))
    },
    getSettings: () => {
        dispatch(settingsActions.getSettings());
    },
  })

const connectedSettings = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Settings));
export { connectedSettings as Settings };

