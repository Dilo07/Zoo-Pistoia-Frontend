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
            dipendenti: [],
            viewForm: false,
            dipendenteEdit: []
        }
    }
    //funzione che si avvia non appena è stato inizializzato lo stato
    componentDidMount(){
        //chiamata get di tutti i dipendenti
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
    // funzione per switchare tra il form di inserimento nuovo dipendente e la tabella dei dipendenti. 
    // Svuota l'oggetto dipendentiEdit in caso fosse valorizzato
    switchForm(){
        this.setState({
            viewForm: !this.state.viewForm,
            dipendenteEdit: []
        })
    }

    //funzione per switchare tra il form di edit di un dipendente e la tabella dei dipendenti
    // salva nello state dipendenteEdit tutti l'oggetto dipendente preso dal component mostradipendenti
    switchFormEdit(dipendente){
        this.setState({
            viewForm: !this.state.viewForm,
            dipendenteEdit: dipendente
        })
    }

    //funzione richiamata quando si edita un dipendente
    editDipendente(infoNewDip){
        /* const dipendenti = this.state.dipendenti */
        fetch('http://localhost:8080/Dipendenti/updateDipendente', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                id: infoNewDip.id,
                nome: infoNewDip.nome,
                cognome: infoNewDip.cognome
            })
        }).then(response => response.json())
        .then(result => {
            /* anziché modificare lo state dipendenti aggiorno la pagina*/
            window.location.reload(false);
            this.setState({
                viewForm: !this.state.viewForm
            })
        })
    }

    //funzione richiamata quando si salva un nuovo dipendente
    addDipendente(infoNewDip){
        const dipendenti = this.state.dipendenti
        fetch('http://localhost:8080/Dipendenti/newDipendente', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                nome: infoNewDip.nome,
                cognome: infoNewDip.cognome
            })
        }).then(response => response.json())
        .then(result => {
            const newdipendenti = dipendenti.concat({ id: result, nome: infoNewDip.nome, cognome: infoNewDip.cognome})
            this.setState({
                dipendenti: newdipendenti,
                viewForm: !this.state.viewForm
            })
        })
    }

    //funzione per richiamare il delete prendendo l'id come parametro e riaggiornando lo state con i nuovi dipendenti
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
        const {error,isloaded,dipendenti,viewForm, dipendenteEdit} = this.state
        /* const {classes} = this.props */
        // passargli nome={nomeState} cognome={cognomeState} valorizzati nello state 
        const Inputform = <InputForm dipendente={dipendenteEdit} clickBack={() => this.switchForm()} 
        clickSaveAdd={(infoNewDip) => this.addDipendente(infoNewDip)} clickSaveEdit={(infoNewDip) => this.editDipendente(infoNewDip)}/>

        const Dati = <MostraDipendenti dipendenti={dipendenti} clickAdd={() => this.switchForm()} clickEdit={(dipendente) => this.switchFormEdit(dipendente)} 
        clickDelete={(id) => this.deleteDipendente(id)}/>

        if(error){
            return <div> error: {error.message}</div>
        }else if(!isloaded){
            return <div>Loading...</div>
        } else{
            if(viewForm){
                return(<div className="Center">{Inputform}</div>)
            }else{
                return(<div>{Dati}</div>)
            }
        }
    }
}

export default Dipendenti