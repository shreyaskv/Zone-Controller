import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center',
  },
  image: {
    backgroundImage: 'url(/img/openApp.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  },
});

 class About extends Component {


    render(){
        const { classes } = this.props;
        
        return (
            <div >
            <Grid container className="flex" alignItems="stretch" direction="row" justify="space-evenly">
              <Grid item xs={11} sm={10} md={8} lg={4}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3">
                    S/W Version:
                    </Typography>
                    <p>
                    1.1.CT2
                    </p>
                    <br />
                    <Typography variant="h5" component="h3">
                    H/W Version:
                    </Typography>
                    <p>
                    1.0.0
                    </p>
                    <br />
                    <Typography variant="h5" component="h3">
                        Release Date: 
                    </Typography>
                   <p>
                    22 March 2019
                    </p>
                </Paper>
              </Grid>
            </Grid>
        <br />
<center><div className={classes.image}></div></center>
            </div>
        );
    }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};


const connectedAbout = withStyles(styles, { withTheme: true })(About);
export { connectedAbout as About };
