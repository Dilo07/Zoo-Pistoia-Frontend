import React from 'react';
import ReactDOM from 'react-dom'
import './App.css';

function FormatDate(props){
    return(
        <h1> {props.date.toLocaleTimeString()} </h1>
    )
}

class Clock extends React.Component {
    constructor(props){
      super(props);
      this.state = {date: new Date()};
  }

  componentDidMount(){
      this.timerID = setInterval(() => this.tick(), 1000 )
  }

  componentWillUnmount(){
      clearInterval(this.timerID)
  }

  tick(){
      this.setState({
          date: new Date()
      })
  }

  render(){
      return(
          <div>
             <h1> Ciao oggi sono le <FormatDate date={this.state.date} /> {/* {this.state.date.toLocaleTimeString()} */} </h1>
          </div>
      )
  }
}


function App(){
    return(
        <div>
            <Clock/>
            <Clock/>
        </div>
    )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);




