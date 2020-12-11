import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

//modifica dello stile in una funzione
const useStyles = makeStyles({
    root: {
      marginRight: "5px",
      float: "left",
      backgroundColor: "#4caf50",
      '&:hover': {backgroundColor: '#357a38'}
      },
    delete: {
        backgroundColor: "#f44336",
      '&:hover': {backgroundColor: '#aa2e25'}
    },
    tr: {
        '&:hover': {backgroundColor: "darkseagreen"}
    },
    tablehead: {
        fontWeight: "bold"
    }
  });

  function deleteDipendente(props){
    console.log(props)
  }
  

function MostraDipendenti(props){
    const classes = useStyles();

    return( 
    <div>
        <Button className={classes.root} variant="contained">Aggiungi</Button>
        <Button className={classes.root} variant="contained">Modifica</Button>
        
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead>
                    {/* <TableCell padding="checkbox"> <Checkbox></Checkbox> </TableCell> */}
                    <TableCell className={classes.tablehead}>ID</TableCell>
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
                        <TableCell><Button className={classes.delete} onClick={() => deleteDipendente(dipendente.id)} variant="contained">Elimina</Button></TableCell>
                    </TableRow>                        
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>)
}

export default MostraDipendenti