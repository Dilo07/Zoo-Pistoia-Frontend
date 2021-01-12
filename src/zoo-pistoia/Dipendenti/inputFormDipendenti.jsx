import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      marginRight: "5px",
      /* float: "left", */
      backgroundColor: "#4caf50",
      '&:hover': {backgroundColor: '#357a38'}
      }
})

function InputForm(props){
    const classes = useStyles();
    //hooks definisco l'oggetto infoNewDip con le sue istanze nome e cognome che saranno modificati con il setInfo che richiamerà useStase
    /* const [ infoNewDip, setInfo ] = useState({id: props.dipendente.id, nome: props.dipendente.nome, cognome: props.dipendente.cognome}); */
    const onSubmit = () => {
        if(!props.dipendenteEdit.id){
            // Verifica che il campo non sia vuoto o undefined
            if(props.dipendenteEdit.nome === undefined || props.dipendenteEdit.nome === '' || props.dipendenteEdit.cognome === undefined || props.dipendenteEdit.cognome === ''  ){
                alert('Inserisci un valore')
            }
            else{
                props.clickSaveAdd({
                    nome: props.dipendenteEdit.nome,
                    cognome: props.dipendenteEdit.cognome
                })
            }
        }
        else{
            if(props.dipendenteEdit.nome === '' || props.dipendenteEdit.cognome === '' ){
                alert('Inserisci un valore')
            }
            else{
                props.clickSaveEdit({
                    id: props.dipendenteEdit.id,
                    nome: props.dipendenteEdit.nome,
                    cognome: props.dipendenteEdit.cognome
                })
            }
        }
    }
    
    return (
    <div>
        <h1>Inserisci i dati del nuovo dipendente</h1>
        <form autoComplete="off" /* onSubmit={() => onSubmit()} */>
            <Grid>
                {/* <TextField  required onChange={e => setInfo({...infoNewDip, nome: e.target.value})} value={infoNewDip.nome} label="Nome" defaultValue="" /> */}
                <TextField required onChange={e => props.changed(e.target.value, 'nome')} value={props.dipendenteEdit.nome} label="Nome"/>
            </Grid>
            <Grid>
                {/* ... prende l'oggetto infoNewDip e va ad aggiungere la modifica fatta su cognome, lasciando invariato nome */}
                {/* <TextField required onChange={e => setInfo({...infoNewDip, cognome: e.target.value})} value={infoNewDip.cognome} label="Cognome" defaultValue=""/> */}
                <TextField required onChange={e => props.changed(e.target.value, 'cognome')} value={props.dipendenteEdit.cognome} label="Cognome"/>
            </Grid>
            <Grid item style={{ marginTop: 16 }}>
                <Button className={classes.root} onClick={() => props.clickBack()}> Indietro</Button>
                <Button className={classes.root} onClick={() => onSubmit()}> Salva </Button>
            </Grid>
        </form>
    </div>)
}

export default InputForm