import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
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

    return( 
    <div>
        <Button className={classes.root} onClick={() => props.clickAdd()} variant="contained">Aggiungi</Button>
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead>
                    {/* <TableCell padding="checkbox"> <Checkbox></Checkbox> </TableCell> */}
                    <TableCell className={classes.tablehead}> ID <ArrowDropDownIcon onClick={() => props.sortBy('id') }/></TableCell>
                    <TableCell className={classes.tablehead}>Nome</TableCell>
                    <TableCell className={classes.tablehead}>Cognome</TableCell>
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