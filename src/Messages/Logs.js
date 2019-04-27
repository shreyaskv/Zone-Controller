import React , {Component} from 'react';
import MUIDataTable from "mui-datatables";
import { connect } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

 
class Logs extends Component{

  getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTable: {
        root: {
          backgroundColor: "#FF0000"
        }
      }
    }
  })

  state = {
    start : false,
    datae: [],
  }
  columns = [
    {
     name: "Date",
     options: {
      filter: false,
      sort: true,
     }
    },
    {
     name: "Time",
     options: {
      filter: false,
      sort: true,
     }
    },
    {
     name: "Message",
     options: {
      filter: true,
      sort: true,
     }
    },
   ];
   
  options = {
     filterType: 'checkbox',
     selectableRows: false,
     download: true,
     print: false,
   };

   data = [];

  componentWillReceiveProps(nextProps){
    console.log(nextProps);
      console.log(nextProps.logs);
      this.data=[];
      for(var i=0 ; i< nextProps.logs.length ; i++)
      {
         var temp = [];
         temp.push(nextProps.logs[i].date);
         temp.push(nextProps.logs[i].time);
         temp.push(nextProps.logs[i].log);
         this.data.push(temp);
      }
      this.setState({datae : this.data});
      console.log(this.state.datae);
      this.setState({start: true});
  }

  render(){
    return(
      <div>
        {
          this.state.start === true &&
        <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable
              title={"Logs"}
              data={this.state.datae}
              columns={this.columns}
              options={this.options}
              delete = {false}
          />
      </MuiThemeProvider>
    }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { logs, logCount  } = state.commissioning
  return {
    logs,
    logCount
  };
}

const connectedLogs = connect(mapStateToProps)(Logs);
export { connectedLogs as Logs };