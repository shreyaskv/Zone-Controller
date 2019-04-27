import React from 'react';
import { connect } from 'react-redux';
import Layout from './Layout'
import { } from '../_actions';
import { Commissioning } from '../Commissioning';
import { Commands } from '../Commands';
import { Trends } from '../Trends';
import { Wifi } from '../Wifi';
import { commissioningActions } from '../_actions';
import { Settings } from '../Settings';
import { About } from '../About';
import {Messages} from '../Messages';
import io from 'socket.io-client';

class HomePage extends React.Component {

    state = {
        mobileOpen: false,
        start: true,
        messages:[],
        xbeeMessages: [],
        color: "",
        buttonObject: {
          "id": "zone1",
          "location": "19.8,20.8 Chennai",
          "rainfall": 0.0,
          "windspeed": 0.0,
          "rainfallT": 0.0,
          "windspeedT": 0.0,
          "swversion": "1.0.CT",
          "hwversion": "1.0.0",
          "trackerID": "",
        },
		modal: false,
      };

    hostname = '192.168.0.58' +':5000';

    logObj ={}

    componentDidMount() {
        var func = this;
        var socket = io(`http://${this.hostname}`);
        console.log(socket);
        socket.on("connect", () => {
            console.log("Connected to server!!!");
            socket.emit("subscribeToMessages",{});
        });
    
        socket.on("disconnect", () => {
            console.log("Disconnect!!!");
        });
    
        socket.on('message', function (data) {
            console.log(data);
            var res = [];
            var datae = func.state.messages;
            var xbeeDatae = func.state.xbeeMessages;
            
              res = data.message.split(" ");
              if(data.message.includes("rainFall"))
              {
                
                func.setState({...func.state, buttonObject: {
                  ...func.state.buttonObject,
                  rainfall: Number(Number(res[2]).toFixed(2))
                }});
                func.setState({...func.state, buttonObject: {
                  ...func.state.buttonObject,
                  rainfallT: Number(Number(res[4]).toFixed(2))
                }});
              }
              if(data.message.includes("windSpeed"))
              {
                func.props.setWindParams(Number(Number(res[2]).toFixed(2)), Number(Number(res[4]).toFixed(2)))
              }
              if(data.message.includes("colorChange"))
              {
                func.props.setTrackerColor(res[2], res[1]);
              }
              if(data.message.includes("CMD") && data.message.includes("DID"))
              {
                console.log(typeof data.message);
                this.logsObj = {
                    log: data.message,
                }
                func.props.setMessages("xbee", this.logsObj);
              }
              else{
                this.logsObj = {
                    date: data.timeStamp,
                    time: data.timeStamp,
                    log: data.message,
                }
                func.props.setMessages("logs", this.logsObj);
              }     
        });
        func.setState({start: true});
    }

    render() {
        return(
            <Layout selected={this.props.match.params.id}>
                {
                    this.props.match.params.id ?
                        this.props.match.params.id === 'Commissioning' ? <Commissioning /> :
                            this.props.match.params.id === 'Commands' ? <Commands /> :
                                this.props.match.params.id === 'Logs' ? <Messages />:
                                    this.props.match.params.id === 'Wifi' ? <Wifi /> :
                                        this.props.match.params.id === 'Settings' ? <Settings /> : <About />
                    : <Wifi />
                }
            </Layout>
        )
    }
    
}

const mapDispatchToProps = (dispatch) => ({
    getCommissioningData: () => {
        dispatch(commissioningActions.getCommissioningData()) 
    },
    setWindParams: (windSpeed, windSpeedT) =>{
        dispatch(commissioningActions.setWindParams(windSpeed, windSpeedT))
    },
        setTrackerColor: (trackerID, color) =>{
        dispatch(commissioningActions.setTrackerColor(trackerID, color))
    },
    setMessages: (typ, log) =>{
        dispatch(commissioningActions.setMessages(typ, log))
    },
})

const mapStateToProps = (state) => {
    const { timezone } = state.settings;
    return {
      timezone
    };
  }

const connectedHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export { connectedHomePage as HomePage };
