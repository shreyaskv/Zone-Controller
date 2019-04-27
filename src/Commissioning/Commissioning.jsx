import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import classNames from 'classnames';
import DeviceList from './DeviceList';
import {TrackerDetails} from './TrackerDetails';
import { commissioningActions } from '../_actions';
import { Loading } from '../_components';
import TrackerAngle from './TrackerAngle';
import { Link } from "react-router-dom";
import { history } from '../_helpers';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        height: '93%',
        width: '100%',
      }, 

    padRight: {
        paddingRight: '10px',
        height: '100%',
    },
    padBottom: {
        paddingBottom: '3px',
        maxHeight:'45%',
    },
    details: {
        [theme.breakpoints.down('md')]: {
            height: '500px',
          },
          borderRadius: '3%',
    },
    detail: {
          borderRadius: '3%',
    },
    image: {
        backgroundImage: 'url(/img/openApp.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
      },
});

class Commissioning extends Component {

    constructor(props){
        super(props);
    }

    state = {
        trackerID: "",
        deviceID: "AB000121",
        permitJoinClicked: false,
        trackerIDforColor: "",
        trackercolor: "",
        singlePixel: false,
        time: "",
    }

    permitJoin = () => {
        this.setState({
            permitJoinClicked: true
        })
    }

    componentDidMount() {
        this.props.getCommissioningData()
    }

    inter = {} 

    everyEight = (trackerID) => {
        var func = this;
        console.log(trackerID);
        clearInterval(this.inter);
        this.inter = setInterval(() => {
            func.props.getCurrentTrackerInfo(trackerID);
            console.log(trackerID);
        }, 8000)
    }

    getTrackerDetails = (trackerID) => {
        this.setState()
        this.props.getCurrentTrackerInfo(trackerID)
        console.log(trackerID, this.props.commissioningData)
        const deviceID = this.props.commissioningData.find(e => e.trackerID === trackerID).deviceID
        this.setState({
            trackerID,
            deviceID
        })
        this.everyEight(trackerID);
    }

    handleApp = () => {
        console.log("clicked");
        this.setState({singlePixel: true});
    } 

    componentWillReceiveProps = (nextProps) => {
        if(this.props.trackerColor !== nextProps.trackerColor)
        {
            this.setState({trackerIDforColor: nextProps.trackerColor.trackerID});
            this.setState({trackercolor: nextProps.trackerColor.color});
        }
    }

    render(){
        const { classes, loaded, commissioningData, selectedTrackerDetails, loadedTrackerInfo, selectedTrackerID } = this.props;
        const { trackerColor } = this.props;
         return (
            <div className={classes.root} >
                <Grid container  className="flex" alignItems="stretch" direction="row" justify="space-around">
                    <Grid item xs={12} sm={6} className={classNames("flex", classes.padRight, classes.detail)}>
                        { loaded ? <DeviceList time={this.state.time} trackerIDforColor={this.state.trackerIDforColor} trackercolor={this.state.trackercolor} permitJoin={this.permitJoin} permitJoinClicked={this.state.permitJoinClicked} selectedTrackerID={selectedTrackerID} devices={commissioningData} getTrackerDetails={this.getTrackerDetails}/> : <Loading /> }
                    </Grid>
                    <br />
                    <Grid item xs={12} sm={6}  className={classNames("flex")}>
                        <Grid container  className="flex" direction="column"  justify="space-around">
                        
                        <Grid item sm onClick={this.handleApp} className={classNames("flex","flex1", classes.padBottom, classes.details)}>
                        {loadedTrackerInfo &&
                            <TrackerAngle angle={selectedTrackerDetails.currentAngle}/>
                        }
                        </Grid>
                        <Grid item sm className={classNames("flex", classes.padTop, classes.details)}>
                         {loadedTrackerInfo &&
                            <TrackerDetails 
                                                    deviceID={this.state.deviceID}
                                                    trackerID={selectedTrackerID} 
                                                    trackerDetails={selectedTrackerDetails}/> 
                         }
                        </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {this.state.singlePixel === true && <div className={classes.image}></div>}
            </div>
        );
    }
}

Commissioning.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const { loaded, commissioningData, selectedTrackerDetails, loadedTrackerInfo, selectedTrackerID, trackerColor  } = state.commissioning
    return {
        commissioningData,
        loaded,
        loadedTrackerInfo,
        selectedTrackerDetails,
        selectedTrackerID,
        trackerColor,
    };
}

const mapDispatchToProps = (dispatch) => ({
    getCurrentTrackerInfo: (trackerID) => {
        dispatch(commissioningActions.getCurrentTrackerInfo(trackerID)) 
    },
    getCommissioningData: () => {
        dispatch(commissioningActions.getCommissioningData()) 
    }
})

const connectedCommissioning = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Commissioning));
export { connectedCommissioning as Commissioning };
