import React from 'react';
import Dipendenti from './dipendentiState'
import Animali from './animaliState'
import './App.css';
import imgHome from './Image/homeZooImg.jpg'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import {Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom'

//modifica dello stile in una classe, quando si usano le classi importare withStyles
const useStyles = ({
    root: {
        marginRight: "5px",
        backgroundColor: "#4caf50",
        '&:hover': {backgroundColor: '#357a38'}
    }
})

//esercizio button
class Dati extends React.Component{

    render(){
        const {classes} = this.props
        const Home = () => (
            <div> 
                    <img src={imgHome} alt="ImageHome" className="CenterAndTop"></img>
            </div>
        )
        return(
            <div>
                <div className="Center">
                    <h1> Zoo Pistoia</h1>
                    <Router>
                        <Link to="/" style={{ textDecoration: 'none' }}><Button className={classes.root} variant="contained"> Home</Button></Link>
                        <Link to="/dipendenti" style={{ textDecoration: 'none' }}><Button className={classes.root} variant="contained"> Dipendenti</Button></Link>
                        <Link to="/animali" style={{ textDecoration: 'none' }}><Button className={classes.root} variant="contained"> Animali</Button></Link>
                        <Switch>
                            <Route path="/" exact component={Home}></Route>
                            <Route path="/dipendenti" component={Dipendenti}></Route>
                            <Route path="/animali" component={Animali}></Route>
                        </Switch>
                    </Router>
                </div>
            </div>

        )
    }
}

export default withStyles(useStyles) (Dati)

