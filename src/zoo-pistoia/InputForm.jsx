import React, {useState} from 'react'
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
    const [ infoNewDip, setInfo ] = useState({id: props.dipendente.id, nome: props.dipendente.nome, cognome: props.dipendente.cognome});
    const onSubmit = () => {
        if(!infoNewDip.id){
            console.log('entra in add')
            if(infoNewDip.nome === '' || infoNewDip.cognome === '' ){
                alert('Inserisci un valore')
            }
            else{
                props.clickSaveAdd(infoNewDip)
            }
        }
        else{
            console.log('entra in edit')
            if(infoNewDip.nome === '' || infoNewDip.cognome === '' ){
                alert('Inserisci un valore')
            }
            else{
                props.clickSaveEdit(infoNewDip)
            }
        }
    }
    

    return (
    <div>
        <h1>Inserisci i dati del nuovo dipendente</h1>
        <form autoComplete="off" /* onSubmit={() => onSubmit()} */>
            <Grid>
                <TextField  required onChange={e => setInfo({...infoNewDip, nome: e.target.value})} value={infoNewDip.nome} label="Nome" defaultValue="" />
            </Grid>
            <Grid>
                {/* ... prende l'oggetto infoNewDip e va ad aggiungere la modifica fatta su cognome, lasciando invariato nome */}
                <TextField required onChange={e => setInfo({...infoNewDip, cognome: e.target.value})} value={infoNewDip.cognome} label="Cognome" defaultValue=""/>
            </Grid>
            <Grid item style={{ marginTop: 16 }}>
                <Button className={classes.root} onClick={() => props.clickBack()}> Indietro</Button>
                <Button className={classes.root} onClick={() => onSubmit()}> Salva </Button>
            </Grid>
        </form>
    </div>)
}

export default InputForm