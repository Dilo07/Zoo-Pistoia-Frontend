import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import AddDipendente from './AddDipendente'
import MostraDipendenti from './mostradipendenti'

const useStyles = ({
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
            console.log(result)
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
        const {classes} = this.props
        const inputForm = <AddDipendente></AddDipendente>

        if(error){
            return <div> error: {error.message}</div>
        }else if(!isloaded){
            return <div>Loading...</div>
        } else{
            return(
                <div>
                    <MostraDipendenti dipendenti={dipendenti} onClick={(id) => this.deleteDipendente(id)}/>
                    {/* <Button className={classes.root} onClick={this.addDipendente} variant="contained">Aggiungi</Button>
                    <TableContainer component={Paper}>
                        <Table className={classes.table}>
                            <TableHead>
                                
                                <TableCell className={classes.tablehead}>ID</TableCell>
                                <TableCell className={classes.tablehead}>Nome</TableCell>
                                <TableCell className={classes.tablehead}>Cognome</TableCell>
                                <TableCell className={classes.tablehead}></TableCell>
                            </TableHead>
                            <TableBody>
                            {dipendenti.map(dipendente => (
                                <TableRow className={classes.tr} key={dipendente.id}>
                                
                                    <TableCell>{dipendente.id}</TableCell>
                                    <TableCell>{dipendente.nome}</TableCell> 
                                    <TableCell>{dipendente.cognome}</TableCell>
                                    <TableCell><Button className={classes.delete} onClick={() => this.deleteDipendente(dipendente.id)} variant="contained">Elimina</Button>
                                    <Button className={classes.edit} variant="contained">Modifica</Button></TableCell>
                                </TableRow>                        
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer> */}
                </div>
            )
        }
    }
}

export default withStyles(useStyles) (Dipendenti)