import React from 'react';

function MessaggioAvviso(props){
    const messaggio = props.messaggio
    if(!messaggio){
        return null;
    }
    return <h1>Attenzione</h1>
}

class Avviso extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            messaggioAvviso: false
        }
        this.handleAvviso = this.handleAvviso.bind(this);
    }
    handleAvviso(){
        this.setState({
            messaggioAvviso: !this.state.messaggioAvviso
        })
    }
    render(){
        const messaggioAvviso = this.state.messaggioAvviso
        return(
            <div>
                <MessaggioAvviso messaggio={messaggioAvviso}></MessaggioAvviso>
                <button onClick={this.handleAvviso}>{messaggioAvviso ? 'Chiudi' : 'Mostra'}</button>
            </div>
        )
    }
}

export default Avviso;