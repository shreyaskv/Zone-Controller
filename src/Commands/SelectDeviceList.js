import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import StopIcon from '@material-ui/icons/Stop'
import StraightenIcon from '@material-ui/icons/Straighten'
import BrightnessAutoIcon from '@material-ui/icons/BrightnessAuto'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import { Icon } from '@material-ui/core/Icon'
import { Grid, Button, Paper, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import classNames from 'classnames';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: '100%',
    display: 'flex',
  },
  red: {
    backgroundColor: 'red'
  },
  button: {
    margin: theme.spacing.unit * 2,
  },
  green: {
    backgroundColor: 'lightgreen'
  },
  orange: {
    backgroundColor: 'darkorange'
  },
  yellow: {
    backgroundColor: 'beige'
  },
  blue: {
    backgroundColor: 'lightskyblue'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
  }, 
});

class CheckboxListSecondary extends React.Component {
  state = {
    auto: [],
    stopped: [],
    disable: false,
  };

  handleChange2 = (e,command, deviceID, macID) => {
    e.target.style.backgroundColor = 'silver';
    this.props.sendCommand(deviceID, command, macID)
    const newAuto = this.state.auto
    const newStopped = this.state.stopped
    if(command === 'STOP') {
      newStopped.push(deviceID)
      this.setState({
        stopped: newStopped
      })  
    } else if(command === 'AUTO') {
      newAuto.push(deviceID)
      this.setState({
        auto: newAuto
      })
    }
    
  };

  handleChange = (command, deviceID) => {

    this.props.sendCommand(deviceID, command, '00000')
    const newAuto = this.state.auto
    const newStopped = this.state.stopped
    if(command === 'STOP') {
      newStopped.push(deviceID)
      this.setState({
        stopped: newStopped
      })  
    } else if(command === 'AUTO') {
      newAuto.push(deviceID)
      this.setState({
        auto: newAuto
      })
    }
    
  };


  handleToggleAll = () => () => {
    this.state.all ? 
    this.setState({
      all: false,
      checked: []
    })
    :
    this.setState({
      all: true,
      checked: this.props.trackers
    })
  }


  handleChange1 = event => {
    this.setState({ disable: event.target.checked });
  };

  render() {
    const { classes, trackers } = this.props;
    console.log(trackers)
    return (
      <Grid container direction='column' spacing={24}>
        <Grid item>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3">
                Zone Control:
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch checked={this.state.disable} onChange={this.handleChange1} aria-label="LoginSwitch" />
                }
                label={this.state.disable ? 'Disable' : 'Enable'}
              />
            </FormGroup> 
            <Grid container justify="space-evenly">   
            <Button variant="contained" disabled={!this.state.disable} className={classNames(classes.green, classes.button)} onClick={() => this.handleChange('WE', '00000')}>
            RUN WEST
              <ArrowLeftIcon className={classes.rightIcon} />
            </Button>
            <Button variant="contained" disabled={!this.state.disable} className={classNames(classes.orange, classes.button)} onClick={() => this.handleChange('SMTALStow', '00000')}>
              STOW
              <StraightenIcon className={classes.rightIcon} />
            </Button>
            <Button variant="contained" disabled={!this.state.disable} className={classNames(classes.red, classes.button)} onClick={() => this.handleChange('SMTALStop', '00000')}>
              STOP
              <StopIcon className={classes.rightIcon} />
            </Button>
            <Button variant="contained" disabled={!this.state.disable} className={classNames(classes.blue, classes.button)} onClick={() => this.handleChange('ES', '00000')}>
              RUN EAST
              <ArrowRightIcon className={classes.rightIcon} />
            </Button>
            <Button variant="contained" disabled={!this.state.disable} className={classNames(classes.yellow, classes.button)} onClick={() => this.handleChange('SMTALReset', '00000')}>
              RESET
              <AutorenewIcon className={classes.rightIcon} />
            </Button>
            </Grid>
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
          <Typography variant="h5" component="h3">
                Tracker Control:
            </Typography>  
            <br />
          <Table className={classes.table}>
            <TableBody>
          {
              trackers.map(tracker => {
                  return (
                    <div>
<Grid container justify="space-evenly">   
<p>{tracker.trackerID}</p> 
            <Button variant="contained" className={classes.green} onClick={(e) => this.handleChange2(e,'WE', tracker.deviceID, tracker.macID)}>
                          RUN WEST
                          <ArrowLeftIcon className={classes.rightIcon} />
                        </Button>
            <Button variant="contained" className={classes.orange} onClick={(e) => this.handleChange2(e,'SMTALStow', tracker.deviceID, tracker.macID)}>
                          STOW
                          <StraightenIcon className={classes.rightIcon} />
                        </Button>
            <Button variant="contained" disabled={this.state.stopped ? this.state.stopped.indexOf(tracker.deviceID) > -1 ? true : false : false } className={classes.red} onClick={(e) => this.handleChange2(e,'SMTALStop', tracker.deviceID, tracker.macID)}>
                          STOP
                          <StopIcon className={classes.rightIcon} />
                        </Button>
            <Button variant="contained" disabled={this.state.auto ? this.state.auto.indexOf(tracker.deviceID) > -1 ? true : false : false } className={classes.blue} onClick={(e) => this.handleChange2(e,'ES', tracker.deviceID, tracker.macID)}>
                          RUN EAST
                          <ArrowRightIcon className={classes.rightIcon} />
                        </Button>
            </Grid><br/>
            <br/>
            </div>
                  )
              }
              )}
              </TableBody>
              </Table>
          </Paper>
        </Grid>
      </Grid>
      /*
      <div className={classes.root}>
        <Table className={classes.table}>
            <TableBody>
            <TableRow>
                      <TableCell padding="default"></TableCell>
                      <TableCell padding="default">
                        <Button variant="contained" className={classes.green} onClick={() => this.handleChange('CLEAN')}>
                          CLEAN
                          <div className={classNames(classes.rightIcon, 'cleanIcon')}></div>
                        </Button>
                      </TableCell>
                      <TableCell padding="default">
                        <Button variant="contained" className={classes.orange} onClick={() => this.handleChange('STOW')}>
                          STOW
                          <StraightenIcon className={classes.rightIcon} />
                        </Button>
                      </TableCell>
                      <TableCell padding="default">
                        <Button variant="contained" className={classes.red} onClick={() => this.handleChange('STOP')}>
                          STOP
                          <StopIcon className={classes.rightIcon} />
                        </Button>
                      </TableCell>
                      <TableCell padding="default">
                        <Button variant="contained" className={classes.blue} onClick={() => this.handleChange('AUTO')}>
                          AUTO
                          <BrightnessAutoIcon className={classes.rightIcon} />
                        </Button>
                      </TableCell>
                      <TableCell padding="default">
                        <Button variant="contained" className={classes.yellow} onClick={() => this.handleChange('UT')}>
                          UPDATE TIME
                          <AccessTimeIcon className={classes.rightIcon} />
                        </Button>
                      </TableCell>
                    </TableRow>
            {
              trackers.map(tracker => {
                  return (
                    <TableRow key={tracker.trackerID}>
                      <TableCell padding="default">{tracker.trackerID}</TableCell>
                      <TableCell padding="default">
                        <Button variant="contained" className={classes.green} onClick={() => this.handleChange('CLEAN', tracker.trackerID)}>
                          CLEAN
                          <div className={classNames(classes.rightIcon, 'cleanIcon')}></div>
                        </Button>
                      </TableCell>
                      <TableCell padding="default">
                        <Button variant="contained" className={classes.orange} onClick={() => this.handleChange('STOW', tracker.trackerID)}>
                          STOW
                          <StraightenIcon className={classes.rightIcon} />
                        </Button>
                      </TableCell>
                      <TableCell padding="default">
                        <Button variant="contained" disabled={this.state.stopped ? this.state.stopped.indexOf(tracker.trackerID) > -1 ? true : false : false } className={classes.red} onClick={() => this.handleChange('STOP', tracker.trackerID)}>
                          STOP
                          <StopIcon className={classes.rightIcon} />
                        </Button>
                      </TableCell>
                      <TableCell padding="default">
                        <Button variant="contained" disabled={this.state.auto ? this.state.auto.indexOf(tracker.trackerID) > -1 ? true : false : false } className={classes.blue} onClick={() => this.handleChange('AUTO', tracker.trackerID)}>
                          AUTO
                          <BrightnessAutoIcon className={classes.rightIcon} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
              })
            }
            </TableBody>
        </Table> 
      </div>
    */)
  }
}

CheckboxListSecondary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxListSecondary);