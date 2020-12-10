import React from 'react';

function Blog(props){
    const sidebar = 
            <tr>{props.articoli.map((articolo) =>
                        <th key={articolo.id}>
                            {articolo.titolo}
                        </th>                    
                )}
            </tr>
        

    const contenuto = 
            <tr>{props.articoli.map((articolo) =>
                <td key={articolo.id}>
                    {articolo.testo}
                </td>                    
                )}
            </tr>
    return(
        <table>
            <thead>
            {sidebar}
            </thead>
            <tbody>
            {contenuto}
            </tbody>
            
        </table>
    )
}


function Listanumeri(){

    const articoli = [{id: 1, titolo: 'Ciao Mondo', testo: 'Benvenuto in imparando React!'},
    {id: 2, titolo: 'Installazione', testo: 'Puoi installare React usando npm.'}];

    return(
        <Blog articoli={articoli}></Blog>
    )
}

export default Listanumeri