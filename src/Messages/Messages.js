import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import classNames from 'classnames';
import {InfiniteScroll} from 'infinite-scroll';
import {connect} from 'react-redux';
import Infinite from 'react-infinite';
import BottomScrollListener from 'react-bottom-scroll-listener';
const Logs = React.lazy(() => import("./Logs"));

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};



const draw = 240;

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
  },
  black: {
      backgroundColor: 'black',
      color: 'silver',
      height: "75vh",
      overflowY: 'scroll',
  },
  white: {
      color: 'white',
      fontSize: '13px',
      height: '7vh',
  },
  table: {
    height: "300px",
    overflowY: 'scroll',
  },
});

class Messages extends React.Component {
  state = {
    value: 0,
    logs: [],
    logsActual: [],
    xbeelogsActual: [],
    xbeelogs: [],
    timezone: 'Asia/Kolkata',
    showlogs: 10,
  };
  

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  setone = () => {
    if(this.state.logs1.length <= 10){
      console.log("asdf");
      this.setState({logsActual: this.state.logs1});
    }
    console.log(this.state.logsActual);
    console.log(this.state.logs1);
  }

  componentWillReceiveProps(nextProps){
    this.setState({logs: nextProps.logs, xbeelogs: nextProps.xbeelogs, timezone: nextProps.timezone});
  }
  
  componentDidMount() {
    this.div.addEventListener("scroll", this.handleScroll);
  }

    handleScroll = e => {
    console.log(this.div.scrollTop);
    if(this.div.scrollHeight - this.div.scrollTop === this.div.clientHeight){
      console.log("bottom");
      this.setState({showlogs: (this.state.logs.length - this.state.showlogs) > 10 ? (this.state.showlogs + 10) : (this.state.logs.length)});
    }
  };

  render() {
    const { classes, theme, mess } = this.props;
    const len = this.state.logs.length > 10 ? this.state.showlogs : this.state.logs.length; 
    const items = this.state.logs.slice(0, len).reverse().map(
      (row) => 
      <TableRow  className={classes.rows}>
        <TableCell  className={classes.white}  align="left">{new Date(Number(Number(row.date) * 1000)).toLocaleDateString('en-US', {timeZone: this.state.timezone})}</TableCell>
        <TableCell className={classes.white}  align="left">{new Date(Number(Number(row.time) * 1000)).toLocaleTimeString('en-US', {timeZone: this.state.timezone})}</TableCell>
        <TableCell component="th" scope="row" align="left" className={classes.white}>
          {row.log}
        </TableCell>
      </TableRow>
    )
        return (
      <div className={classes.root}>
        <AppBar position="static" color="default" className={classes.appBar}>
        
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            centered
          >
            <Tab label="Log" />
            <Tab label="Errors" />
            <Tab label="Warnings" />
            <Tab label="Info" />
            <Tab label="Xbee" />
          </Tabs>
          
        </AppBar>
        <BottomScrollListener onBottom={this.callb}>
        
        <div ref={div => (this.div = div)} className={classes.black }>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex} 
          ref={this.refCallback} 
        >
          <TabContainer dir={theme.direction} className={classNames(classes.white, classes.scroll)}>
          <Table  className={classes.table} id="tab">
        <TableHead>
          <TableRow className={classes.rows} >
            <TableCell className={classes.white}  align="left">Date</TableCell>
            <TableCell className={classes.white}  align="left">Time</TableCell>
            <TableCell align="left" className={classes.white}>Log</TableCell>
          </TableRow>
        </TableHead>

        <TableBody >
            {items}
        </TableBody>
      </Table>
          </TabContainer>
          <TabContainer dir={theme.direction} ><p className={classes.white}>Errors</p></TabContainer>
          <TabContainer dir={theme.direction} ><p className={classes.white}>Warnings</p></TabContainer>
          <TabContainer dir={theme.direction}><p className={classes.white}>Info</p></TabContainer>
          <TabContainer dir={theme.direction} className={classNames(classes.white, classes.scroll)}>          
          <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.rows}>
            <TableCell className={classes.white} align="left">Date</TableCell>
            <TableCell className={classes.white} align="left">Time</TableCell>
            <TableCell className={classes.white} align="left">Log</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.xbeelogs.slice(0).reverse().map(row1 => (
            <TableRow className={classes.rows}>
              <TableCell className={classes.white} align="left">{new Date(Number(JSON.parse(row1.log).TS) * 1000).toLocaleDateString('en-US', {timeZone: this.state.timezone})}</TableCell>
              <TableCell className={classes.white} align="left">{new Date(Number(JSON.parse(row1.log).TS) * 1000).toLocaleTimeString('en-US', {timeZone: this.state.timezone})}</TableCell>
              <TableCell component="th" scope="row" align="left" className={classes.white}>
                {row1.log}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
          </TabContainer>
 
        </SwipeableViews>
        </div>
        </BottomScrollListener>
      </div>
    );
  }
}

Messages.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { logs,xbeelogs, logCount } = state.commissioning;
  const { timezone } = state.settings;
  return {
    logs,
    xbeelogs,
    logCount,
    timezone
  };
}

const connectedMessages = connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Messages))
export { connectedMessages as Messages };
