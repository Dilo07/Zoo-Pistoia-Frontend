import React from 'react'
import MostraDipendenti from './mostradipendenti'

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