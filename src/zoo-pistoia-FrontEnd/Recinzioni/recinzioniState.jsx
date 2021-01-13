import React from 'react'
import MostraRecinzioni from './mostraRecinzioni'

class Recinzioni extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            error: null,
            isloaded: false,
            recinzioni: []
        }
    }

     //funzione che si avvia non appena è stato inizializzato lo stato
     componentDidMount(){
        //chiamata get di tutte le recinzioni
        fetch('http://localhost:8080/Recinzioni/getAll').then(response => response.json())
        .then(result => {
            this.setState({
                isloaded: true,
                recinzioni: result
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
        const {recinzioni, error, isloaded} = this.state
        const dati = <MostraRecinzioni recinzioni={recinzioni}></MostraRecinzioni>
        console.log(recinzioni)
        if(error){
            return <div className="CenterAndTop"> error: {error.message} </div>
        }else if (!isloaded){
            return <div className="CenterAndTop"> loading... </div>
        }else{
            return <div> {dati} </div>
        }
    }
}

export default Recinzioni