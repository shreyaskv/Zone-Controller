import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';


const styles = theme => ({
  root: {
    width: '100%',
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    borderRadius: '3%',
  },
  heading: {
    paddingLeft: '24px'
  },
  innerDiv: {
    width: '90%',
    height: '100%',
    margin: 'auto'
  },  
  outerRow: {
    borderRight: '1px solid #e0e0e0'
  }
});

function TrackerDetails(props) {
  const { classes, angle } = props;
  
  return (
      
        <Paper className={classes.root}>
            <div className={classNames(classes.innerDiv, 
            angle >= 52.5 ? 'angle60' : 
            angle >= 37.5 ? 'angle45' :
            angle >= 22.5 ? 'angle30' :
            angle >= 7.5 ? 'angle15' :
            angle >= -7.5 ? 'angle0' :
            angle >= -22.5 ? 'angle_15' :
            angle >= -37.5 ? 'angle_30' :
            angle >= -52.5 ? 'angle_45' :
            'angle_60')}>
                Angle = {angle}
            </div>
        </Paper>
     
  );
}

TrackerDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TrackerDetails);