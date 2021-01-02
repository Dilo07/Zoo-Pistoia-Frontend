import React, {useState} from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { makeStyles } from '@material-ui/core/styles';

//modifica dello stile in una funzione, quando si utilizzano le funzioni importare makeStyles
const useStyles = makeStyles({
    root: {
      marginRight: "5px",
      float: "left",
      backgroundColor: "#4caf50",
      '&:hover': {backgroundColor: '#357a38'}
      },
    delete: {
        backgroundColor: "#f44336",
        marginRight: "5px",
      '&:hover': {backgroundColor: '#aa2e25'}
    },
    edit: {
        backgroundColor: "#ffc107",
        marginRight: "5px",
      '&:hover': {backgroundColor: '#b28704'}
    },
    tr: {
        '&:hover': {backgroundColor: "darkseagreen"}
    },
    tablehead: {
        fontWeight: "bold"
    }
  });
  
// funzione che prende in ingresso props.dipendenti con tutta la lista di dipendenti ed estrae la tabella
function MostraDipendenti(props){
    const classes = useStyles();
    const [direction, setDirection] = useState('UP')
    const [column, setColumn] = useState('id')

    const switchDirection = (key) => {
        if ( direction === 'DOWN'){
            //Chiama la funzione di ordinamento nel componente superiore dipendenti e modifica la direction
            props.sortBy(key,direction)
            setDirection('UP')
            setColumn(key)
        }
        else{
            props.sortBy(key,direction)
            setDirection('DOWN')
            setColumn(key)
        }
    }


    return( 
    <div>
        <Button className={classes.root} onClick={() => props.clickAdd()} variant="contained">Aggiungi</Button>
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead>
                    {/* <TableCell padding="checkbox"> <Checkbox></Checkbox> </TableCell> */}
                   {/*  in base allo stato direction mostra l'icona e al click chiama la funzione passandogli la key */}
                    {/* <TableCell className={classes.tablehead}> ID {direction === 'UP' ? (<ArrowDropDownIcon onClick={() => switchDirection('id')}/>) : (<ArrowDropUpIcon onClick={() => switchDirection('id')}/>)} </TableCell> */}
                    <TableCell className={classes.tablehead} onClick={ () => switchDirection('id')}> ID {column === 'id' ? direction === 'UP' ? (<ArrowDropDownIcon onClick={() => switchDirection('id')}/>) : (<ArrowDropUpIcon onClick={() => switchDirection('id')}/>) : null} </TableCell>
                    <TableCell className={classes.tablehead} onClick={ () => switchDirection('nome')}> Nome {column === 'nome' ? direction === 'UP' ? (<ArrowDropDownIcon onClick={() => switchDirection('nome')}/>) : (<ArrowDropUpIcon onClick={() => switchDirection('nome')}/>) : null} </TableCell>
                    <TableCell className={classes.tablehead} onClick={ () => switchDirection('cognome')}> Cognome {column === 'cognome' ? direction === 'UP' ? (<ArrowDropDownIcon onClick={() => switchDirection('cognome')}/>) : (<ArrowDropUpIcon onClick={() => switchDirection('cognome')}/>) : null} </TableCell>
                    <TableCell className={classes.tablehead}></TableCell>
                </TableHead>
                <TableBody>
                {props.dipendenti.map(dipendente => (
                    <TableRow className={classes.tr} key={dipendente.id}>
                        {/* <TableCell padding="checkbox"><Checkbox></Checkbox></TableCell> */}
                        <TableCell>{dipendente.id}</TableCell>
                        <TableCell>{dipendente.nome}</TableCell> 
                        <TableCell>{dipendente.cognome}</TableCell>
                        <TableCell><Button className={classes.delete} onClick={() => props.clickDelete(dipendente.id)} variant="contained">Elimina</Button>
                        <Button className={classes.edit} onClick={() => props.clickEdit(dipendente)} variant="contained">Modifica</Button></TableCell>
                    </TableRow>                        
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>)
}

export default MostraDipendenti