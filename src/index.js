import React from 'react';
import ReactDOM from 'react-dom'
import Dati from './zoo-pistoia/home'
/* import Avviso from './messaggio avviso' 
import Listanumeri from './esercizio map' */


class ZooPistoia extends React.Component{
  
    render(){
        return(
            <div>
               {/*  <Avviso/> */}
                <Dati />
                {/* <Listanumeri/> */}
            </div>
        )
    }
}

ReactDOM.render(
    <ZooPistoia/>,
    document.getElementById('root')
);