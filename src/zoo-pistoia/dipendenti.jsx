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

//modifica dello stile in una funzione
const useStyles = makeStyles({
    root: {
      marginRight: "5px",
      float: "left",
      backgroundColor: "#4caf50",
      '&:hover': {backgroundColor: '#357a38'}
      },
    tr: {
        '&:hover': {backgroundColor: "darkseagreen"}
    },
    tablehead: {
        fontWeight: "bold"
    }
  });

function MostraDipendenti(props){
    const classes = useStyles();
    return( 
    <div>
        <Button className={classes.root} variant="contained">Aggiungi</Button>
        <Button className={classes.root} variant="contained">Modifica</Button>
        <Button className={classes.root} variant="contained">Elimina</Button>
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableCell className={classes.tablehead}>ID</TableCell>
                    <TableCell className={classes.tablehead}>Nome</TableCell>
                    <TableCell className={classes.tablehead}>Cognome</TableCell>
                </TableHead>
                <TableBody>
                {props.dipendenti.map(dipendente => (
                    <TableRow className={classes.tr} key={dipendente.id}>
                        <TableCell>{dipendente.id}</TableCell>
                        <TableCell>{dipendente.nome}</TableCell> 
                        <TableCell>{dipendente.cognome}</TableCell>
                    </TableRow>                        
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>)
}

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

    render(){
        const  {error,isloaded,dipendenti} = this.state

        if(error){
            return <div> error: {error.message}</div>
        }else if(!isloaded){
            return <div>Loading...</div>
        } else{
            return(
                <div>
                    <MostraDipendenti dipendenti={dipendenti}/>
                </div>
            )
        }
    }
}

export default Dipendenti