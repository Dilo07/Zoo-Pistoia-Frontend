import React from 'react'
import MostraAnimali from './mostraAnimali'


class Animali extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            error: null,
            isloaded: false,
            animali: []
        }
    }
    //funzione che si avvia non appena è stato inizializzato lo stato
    componentDidMount(){
        //chiamata get di tutti gli animali
        fetch('http://localhost:8080/Animali/getAll').then(response => response.json())
        .then(result => {
            this.setState({
                isloaded: true,
                animali: result
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
        const {animali,error,isloaded} = this.state
        const dati = <MostraAnimali animali={animali}/>
        if(error){
            return <div className="CenterAndTop"> error: {error.message}</div>
        }else if (!isloaded){
            return <div className="CenterAndTop"> Loading...</div>
        }else{
            return <div> {dati} </div>
        }
    }
}

export default Animali