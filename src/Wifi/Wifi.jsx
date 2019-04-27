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
import { wifiActions } from '../_actions'
import { Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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
    height: '300px',
    
},
paper1: {
    padding: '5%',
    verticalAlign: 'middle',
    textAlign: 'center',
},

input: {
    marginTop: '25%',
    fontSize: 20,
    display: 'none'
},
label: {
    backgroundColor: 'black',
    display:' inline-block'
},
formControl: {
    marginTop: '15%',
    [theme.breakpoints.down('lg')]: {
      width: '80%',
    },
    width: '60%',
    margin: theme.spacing.unit,
},
inputButton:{
    marginTop: '20%'
},
textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    textAlign: 'center',
    margin:'auto',
  },
  underline : {
    borderBottom: '1px dotted grey',
    width: '100%',
    display: 'block',
    margin: 0,
    position: 'absolute',
    bottom: 0,
    color: 'grey'
    },
    button: {
      position: 'absolute',
      bottom: 15,
      marginLeft: '-12%',
    },
    grid: {
      height: '332px',
      padding: '16px',
      
    }
});

class Wifi extends Component {

    state = {
        ssid: '',
        password: '',
        submitted: false,
        selectedFile: null,
        selectedKey: null,
        age:'',
        open: false,
        sensor: '',
        labelWidth: 0,
    };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { ssid, password } = this.state;
    if (ssid && password) {
        this.props.setWifiInfo(ssid, password);
    }
  }

  handleselectedFile = event => {
    console.log(event.target.files[0])
    this.setState({
      selectedFile: event.target.files[0]
    })
    console.log(event.target.files[0]['name']);
  }

  handleselectedKey = event => {
    console.log(event.target.files[0])
    this.setState({
      selectedKey: event.target.files[0]
    })
    console.log(event.target.files[0]['name']);
  }

  handleUpload = event => {
    this.props.upload(this.state.selectedFile)
  }

  handleUploadKey = event => {
    this.props.uploadKey(this.state.selectedKey)
  }

  handleChange1 = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  selectS = () => {
    this.props.selectSensor(this.state.sensor);
  }
  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

    render(){
        const { classes } = this.props;
        
        return (
          <div className={classes.root} >
        <Grid  container justify="flex-start" direction="row" style={{height: '100%'}}>            
              <Grid item  md={3}  xs={6} className={classes.grid}>
                        <Paper className={classes.paper}>
                        
                                <Typography variant="h5" component="h3" className={classes.header}>
                                    WiFi Settings
                                </Typography>
                                <br />
                                <form onSubmit={this.handleSubmit}>
                                    <TextField
                                        name="ssid"
                                        id="outlined-name"
                                        label="SSID"
                                        placeholder="Enter the ssid"
                                        className={classes.textField}
                                        onChange={this.handleChange}
                                        margin="normal"
                                        className="ssid-field"
                                        variant="outlined"
                                    />
                                    <br />
                                    <br />
                                    <TextField
                                        name="password"
                                        id="outlined-name"
                                        label="Password"
                                        placeholder="Enter the password"
                                        type="password"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        onChange={this.handleChange}
                                    />
                                    <br />
                                    
                                    <Button type="submit"  variant="outlined" component="span" className={classes.button}>
                                    CONNECT
                                </Button>
                                </form>
                            </Paper>
                </Grid>

                <Grid  item  md={3}  xs={6} className={classes.grid}>
                            <Paper className={classes.paper}>
                            
                                <Typography variant="h5" component="h3" className={classes.header}>
                                    Upload Zone Tracker Info
                                </Typography>
                                <br />
                                
                               
                                
                                
                            <form style={{margin: 'auto', padding: '10px'}}>
                                <input
        accept="*.json"
        className={classes.input}
        id="text-button-file"
        multiple
        type="file"
        onChange={this.handleselectedFile}
      />
      <label htmlFor="text-button-file">
      <Grid container>
      <Grid item xs={8} style={{position: 'relative'}} className="fileInput">
      {this.state.selectedFile === null && <p className={classes.underline}>Choose File</p>}
      {this.state.selectedFile && <p className={classes.underline}>{this.state.selectedFile['name']}</p>}
      
      </Grid>
      <Grid item xs={4}>
        <Button component="span" variant="outlined" className={classes.inputButton}>
          BROWSE
        </Button></Grid></Grid>
        <br />
        <p style={{color: 'grey'}}>
                                    Upload the JSON document that contains the static initialization data.
                                </p>
        </label>
        
                                
                                <Button onClick={this.handleUpload} variant="outlined" component="span" className={classes.button}>
                                    Upload
                                </Button>
                            </form>
                            </Paper>
                </Grid>

                <Grid  item  md={3}  xs={6} className={classes.grid}>
                            <Paper className={classes.paper}>
                            
                            <Typography variant="h5" component="h3" className={classes.header}>
                            Sensor Settings
                                </Typography>
                                                
                        <form autoComplete="off">
                        
              
                    <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-simple"
          >
            Select Wind Sensor
          </InputLabel>
          <Select
            value={this.state.sensor}
            onChange={this.handleChange1}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="sensor"
                id="outlined-age-simple"
              />
            }
          >
            <MenuItem value="WD385">WD385</MenuItem>
                        <MenuItem value="default">default</MenuItem>
          </Select>
        </FormControl> 
            <br />      
                   <br />
                                <Button onClick={this.selectS} variant="outlined" component="span" className={classes.button}>
                                    Submit
                                </Button>
                            

                </form>
                            </Paper>
                </Grid>

                <Grid  item  md={3}  xs={6} className={classes.grid}>
                            <Paper className={classes.paper}>
                                <Typography variant="h5" component="h3" className={classes.header}>
                                    Big Query
                                </Typography>
                                <br />
                               
                                
                                
                            <form style={{margin: 'auto', padding: '10px'}}>
                                <input
        
        className={classes.input}
        id="text-button-file1"
        multiple
        type="file"
        onChange={this.handleselectedKey}
      />
      <label htmlFor="text-button-file1">
      <Grid container>
      <Grid item xs={8} style={{position: 'relative'}} className="fileInput">
      {this.state.selectedKey === null && <p className={classes.underline}>Choose File</p>}
      {this.state.selectedKey && <p className={classes.underline}>{this.state.selectedKey['name']}</p>}
      
      </Grid>
      <Grid item xs={4}>
        <Button component="span" variant="outlined" className={classes.inputButton}>
          BROWSE
        </Button></Grid></Grid>
        <br />
        <p style={{color: 'grey'}}>
                                    Upload key.
                                </p>
        </label>
        
                                <Button onClick={this.handleUploadKey} variant="outlined" component="span" className={classes.button}>
                                    Upload
                                </Button>
                      
                            </form>
                            </Paper>
                </Grid>
        </Grid>
        </div>
        );
    }
}

Wifi.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapDispatchToProps = (dispatch) => ({
    setWifiInfo: (ssid, pass) => {
        dispatch(wifiActions.setWifiInfo(ssid, pass)) 
    },
    upload: file => {
        dispatch(wifiActions.upload(file))
    },
    uploadKey: key => {
      dispatch(wifiActions.uploadKey(key))
  },
    selectSensor : (sensor) => {
      dispatch(wifiActions.selectSensor(sensor))
    },
  })

const connectedWifi = connect(null, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Wifi));
export { connectedWifi as Wifi };
