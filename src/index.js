import React from 'react';
import ReactDOM from 'react-dom'
import Dati from './zoo-pistoia/home'
/* import Avviso from ./messaggio avviso' */


class ZooPistoia extends React.Component{
  
    render(){
        return(
            <div>
               {/*  <Avviso/> */}
                <Dati />
            </div>
        )
    }
}

ReactDOM.render(
    <ZooPistoia/>,
    document.getElementById('root')
);