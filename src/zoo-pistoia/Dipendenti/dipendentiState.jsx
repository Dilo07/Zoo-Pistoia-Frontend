import React from 'react'
/* import { withStyles } from '@material-ui/core/styles'; */
import InputForm from './inputFormDipendenti'
import MostraDipendenti from './mostraDipendenti'


class Dipendenti extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            error: null,
            isloaded: false,
            dipendenti: [],
            dipendenteEdit: [],
            viewForm: false
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
            /* Metodo Spread = concat perchè quando assegniamo un array o un oggetto ad una variabile, quando l'array cambia cambia anche la variabile
            mentre con il metodo Spread ovviamo a questo problema*/
            dipendenteEdit: {...dipendente}
        })
    }

    //funzione richiamata quando si edita un dipendente
    editDipendente(){
        //Inizialitto isloade a falso in modo da visualizzare il caricamento (Loading..)
        this.setState({
            isloaded: false
        })
        fetch('http://localhost:8080/Dipendenti/updateDipendente', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                id: this.state.dipendenteEdit.id,
                nome: this.state.dipendenteEdit.nome,
                cognome: this.state.dipendenteEdit.cognome
            })
        }).then(response => response.json())
        .then(result => {
            /* assegno a newState il nuovo stato dipendenti aggiornato sul db*/
            const newState = [...this.state.dipendenti]
            /* il foreach non importa assegnarlo alla variabile, scorre tutto dipendente se trovo quello con lo stesso id aggiorna nome e cognome */
            newState.forEach((dipendente) => {
                if(dipendente.id === this.state.dipendenteEdit.id){ 
                    dipendente.nome = this.state.dipendenteEdit.nome 
                    dipendente.cognome = this.state.dipendenteEdit.cognome}})
            this.setState({
                dipendenti: [...newState],
                viewForm: !this.state.viewForm,
                isloaded: true
            })

        })
    }

    // funzione richiamata ogni volte che gli input del form cambiano
    changeDipendenteHandler(val, key) {
        const dip = this.state.dipendenteEdit
        switch(key){
            case ('nome'):
                dip.nome = val
                console.log(dip)
                this.setState({
                    dipendenteEdit: dip
                })
            break
            case ('cognome'):
                dip.cognome = val
                this.setState({
                    dipendenteEdit: dip
                })
            break
            default: break
        }
    }

    //funzione richiamata quando si salva un nuovo dipendente
    addDipendente(){
        //Inizialitto isloade a falso in modo da visualizzare il caricamento (Loading..)
        this.setState({
            isloaded: false
        })
        const dipendenti = this.state.dipendenti
        fetch('http://localhost:8080/Dipendenti/newDipendente', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                nome: this.state.dipendenteEdit.nome,
                cognome: this.state.dipendenteEdit.cognome
            })
        }).then(response => response.json())
        .then(result => {
            const newdipendenti = dipendenti.concat({ id: result, nome: this.state.dipendenteEdit.nome, cognome: this.state.dipendenteEdit.cognome})
            this.setState({
                dipendenti: newdipendenti,
                viewForm: !this.state.viewForm,
                isloaded: true
            })
        })
    }

    //funzione per richiamare il delete prendendo l'id come parametro e riaggiornando lo state con i nuovi dipendenti
    deleteDipendente(id){
        //Inizialitto isloade a falso in modo da visualizzare il caricamento (Loading..)
        this.setState({
            isloaded: false
        })
        const dipendenti = this.state.dipendenti
        fetch('http://localhost:8080/Dipendenti/deleteDipendente/'+ id, {
            method: "delete"}).then(response => response.json())
        .then(result => { 
            const newdipendenti = dipendenti.filter((dipendente) => dipendente.id !== id)
                this.setState({
                    dipendenti: newdipendenti,
                    isloaded: true
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

    sortDipendenti(key, direction){
        if (direction === 'DOWN'){
            this.setState({
                dipendenti: this.state.dipendenti.sort((a,b) => 
                    {
                        if(a[key] > b[key]){
                            return 1
                        }
                        if(a[key] < b[key]){
                            return -1
                        }
                        else {
                            return 0
                        }
                        // Ascending
                        /* a[key] - b[key] */
                    })
            })
        }
        else{
            this.setState({
                dipendenti: this.state.dipendenti.sort((a,b) => 
                   /*  b[key] - a[key] */
                    {
                        if(b[key] > a[key]){
                            return 1
                        }
                        if(b[key] < a[key]){
                            return -1
                        }
                        else {
                            return 0
                        }
                    })
            })
        }
    }
    

    render(){
        const {error,isloaded,viewForm,dipendenti,dipendenteEdit} = this.state
        /* const {classes} = this.props */
        const Inputform = <InputForm 
            dipendenteEdit={dipendenteEdit} 
            clickBack={() => this.switchForm()} 
            clickSaveAdd={() => this.addDipendente()} 
            clickSaveEdit={() => this.editDipendente()} 
            changed={(val,key) => this.changeDipendenteHandler(val,key)}/>
        
        
        const Dati = <MostraDipendenti 
            dipendenti={dipendenti} 
            clickAdd={() => this.switchForm()} 
            clickEdit={(dipendente) => this.switchFormEdit(dipendente)} 
            clickDelete={(id) => this.deleteDipendente(id)} 
            sortBy={(key, direction) => this.sortDipendenti(key, direction)} />

        return (
            <>
            {   error ? <div className="CenterAndTop"> error : {error.message}</div> 
                : !isloaded ? <div className="CenterAndTop">Loading...</div> 
                : viewForm ? <div className="CenterAndTop">{Inputform}</div> 
                : <div>{Dati}</div>
            } 
            </>
        )
    }
}

export default Dipendenti