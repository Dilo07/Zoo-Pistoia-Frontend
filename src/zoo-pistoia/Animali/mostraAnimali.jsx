import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

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

function MostraAnimali(props) {

    const classes = useStyles();
    return(
        <div>
            <Button className={classes.root} variant="contained">Aggiungi</Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tablehead} > ID </TableCell>
                            <TableCell className={classes.tablehead} > Tipo Animale </TableCell>
                            <TableCell className={classes.tablehead}> ID Recinzione</TableCell>
                            <TableCell className={classes.tablehead}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {props.animali.map(animale => (
                        <TableRow className={classes.tr} key={animale.id}>
                            {/* <TableCell padding="checkbox"><Checkbox></Checkbox></TableCell> */}
                            <TableCell className={classes.tr}>{animale.id}</TableCell>
                            <TableCell className={classes.tr}>{animale.tipo_animale}</TableCell> 
                            <TableCell className={classes.tr}>{animale.id_recinzione}</TableCell>
                            <TableCell className={classes.tr}><Button className={classes.delete} variant="contained">Elimina</Button>
                            <Button className={classes.edit} variant="contained">Modifica</Button></TableCell>
                        </TableRow>                        
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default MostraAnimali