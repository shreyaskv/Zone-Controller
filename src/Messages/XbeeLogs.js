import React , {Component} from 'react';
import MUIDataTable from "mui-datatables";
import { connect } from 'react-redux';

 
class XbeeLogs extends Component{

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
      console.log(nextProps.xbeelogs);
      this.data=[];
      for(var i=0 ; i< nextProps.xbeelogs.length ; i++)
      {
         var temp = [];
         temp.push(new Date(Number(JSON.parse(nextProps.xbeelogs[i]).TS) * 1000).toLocaleDateString('en-US', {timeZone: 'America/Denver'}));
         temp.push(new Date(Number(JSON.parse(nextProps.xbeelogs[i]).TS) * 1000).toLocaleTimeString('en-US', {timeZone: 'America/Denver'}));
         temp.push(nextProps.xbeelogs[i].log);
         this.data.push(temp);
      }
      this.setState({datae : this.data});
      this.setState({start: true});
  }

  render(){
    return(
      <div>
        {this.state.start === true &&
        <MUIDataTable
          title={"Xbee Logs"}
          data={this.state.datae}
          columns={this.columns}
          options={this.options}
          delete = {false}
      />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { xbeelogs, logCount  } = state.commissioning
  return {
    xbeelogs,
    logCount
  };
}

const connectedXbeeLogs = connect(mapStateToProps)(XbeeLogs);
export { connectedXbeeLogs as XbeeLogs };