import React from 'react'
/* import { withStyles } from '@material-ui/core/styles'; */
import InputForm from './InputForm'
import MostraDipendenti from './mostradipendenti'


class Dipendenti extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            error: null,
            isloaded: false,
            dipendenti: []
        }
    }

    componentDidMount(){
        fetch('http://localhost:8080/Dipendenti/getAll').then(response => response.json())
        .then(result => {
            this.setState({
                isloaded: true,
                dipendenti: result
            })
        },
        (error) => {
            this.setState({
              isloaded: true,
              error
            })
          }
        );
    }    

    addDipendente(){
        console.log('entra')
    }

    deleteDipendente(id){
        const dipendenti = this.state.dipendenti
        fetch('http://localhost:8080/Dipendenti/deleteDipendente/'+ id, {method: "delete"}).then(response => response.json())
        .then(result => { 
            const newdipendenti = dipendenti.filter((dipendente) => dipendente.id !== id)
                this.setState({
                    dipendenti: newdipendenti
                })
            },
            (error) => {
                this.setState({
                  isloaded: true,
                  error
                })
              }
            );
            /* .catch(e => console.error(e)) */
    }

    render(){
        const {error,isloaded,dipendenti} = this.state
        /* const {classes} = this.props */
        const Inputform = <InputForm></InputForm>
        const Dati = <MostraDipendenti dipendenti={dipendenti} clickAdd={() => this.addDipendente()} clickDelete={(id) => this.deleteDipendente(id)}/>

        if(error){
            return <div> error: {error.message}</div>
        }else if(!isloaded){
            return <div>Loading...</div>
        } else{
            return(
                <div>
                    {Dati}
                    {Inputform}
                </div>
            )
        }
    }
}

export default Dipendenti