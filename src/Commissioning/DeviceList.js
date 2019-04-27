import React , {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button, Grid } from '@material-ui/core';
import classNames from 'classnames'
import { connect } from 'react-redux'
import { commissioningActions } from '../_actions'

const styles = theme => ({
  root: {
    width: '100%',
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    borderRadius: '3%',
  },
  heading: {
    paddingLeft: '24px',
    height: 'calc(15%-48px)'
  },
  zoneImage: {
    height: '15%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  table: {
    overflowX: 'auto',
    height: '50%'
  },
  image: {
    width: '35%',
    height: '140%',
    backgroundImage: 'url(/img/map.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  },
  dummy: {
    width: '35%',
    height: '100%',
  },
  tracker: {
    maxHeight: '30px',
    minWidth: '120px',
    maxWidth: '130px',
    border: '1px solid black',
    boxShadow: '1px 1px 5px black',
    cursor: 'pointer',
    textAlignLast: 'end',
    lineHeight: '0.5em'
  },
  clicked: {
    maxHeight: '30px',
    minWidth: '120px',
    maxWidth: '130px',
    border: '1px solid black',
    boxShadow: 'inset 1px 1px 5px black',
    cursor: 'pointer',
    textAlignLast: 'end',
    lineHeight: '0.5em'

  },
  head: {
    marginBottom: '4px',
  },
  
});

class DeviceList extends Component {

  trigger = () => {
    this.props.triggerDiscovery();
  }

  render(){
  const { classes, devices, selectedTrackerID } = this.props;
  const data = devices
  console.log(this.props.trackercolor)

      return (
        <Paper className={classes.root}>
            <Typography className={classes.heading} variant="headline" component="h3">
              <p className={classes.head}>Trackers Discovered</p>
            </Typography>
            <Grid className={classes.table} container spacing={24} direction='row' justify='space-evenly' alignItems='center'>
              {data.map(n => {
                      return (
                        <Grid item xs 
                        className={classNames( (this.props.trackercolor === 'red' && this.props.trackerIDforColor ===  n.trackerID) ?  'overl' : 'trackerIcon', (this.props.trackercolor === 'blue' && this.props.trackerIDforColor ===  n.trackerID) ?  'trackerIcon' : 'trackerIcon', n.trackerID === selectedTrackerID ? classes.clicked : classes.tracker)}
                        onClick={() => this.props.getTrackerDetails(n.trackerID)}
                        key={n.trackerID}>{n.trackerID}</Grid>
                      )
              })}
            </Grid>
            <div className={classes.zoneImage}>
                <div className={classes.image}></div>
              
                <div className={classes.dummy}></div>
                <Button variant="contained" className={classes.yellow} onClick={this.trigger}>
                          Trigger Discovery
                </Button>
            </div>
        </Paper>
      );
    }
}

DeviceList.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapDispatchToProps = (dispatch) => ({
  triggerDiscovery: () => {
      dispatch(commissioningActions.triggerDiscovery()) 
  },
})

export default connect(null, mapDispatchToProps)(withStyles(styles, { withTheme: true })(DeviceList));