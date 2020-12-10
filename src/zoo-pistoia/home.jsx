import React from 'react';
import Dipendenti from './dipendenti'
import './App.css';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

function Area(props){
    if(props.area === 'Dipendenti'){
        return <Dipendenti/>
    }
    if(props.area === 'Animali'){
        return <h1> Ecco gli animali</h1>
    }
}

//modifica dello stile in una classe
const useStyles = ({
    root: {
        marginRight: "5px",
        backgroundColor: "#4caf50",
        '&:hover': {backgroundColor: '#357a38'}
    }
})

//esercizio button
class Dati extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            areaSelezionata: 'Dipendenti'
        }
        this.clickAnimali = this.clickAnimali.bind(this);
        this.clickDipendenti = this.clickDipendenti.bind(this);
    }


    clickDipendenti(){
        this.setState({
            areaSelezionata: 'Dipendenti'
        })
    }

    clickAnimali(){
        this.setState({
            areaSelezionata: 'Animali'
        })
    }

    render(){
        const {classes} = this.props
        return(
            <div>
                <div className="Center">
                    <h1> Zoo Pistoia</h1>
                    <div>
                        <Button className={classes.root} variant="contained" onClick={this.clickDipendenti}>Dipendenti</Button>
                        <Button className={classes.root} variant="contained" onClick={this.clickAnimali}> Animali</Button>
                    </div>
                </div>
                <Area area={this.state.areaSelezionata}></Area>
            </div>
        )
    }
}

export default withStyles(useStyles) (Dati)

