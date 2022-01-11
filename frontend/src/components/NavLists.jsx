import { Component } from "react";
import {  Nav } from 'react-bootstrap';

class NavList extends Component{

    disconnect(){
        localStorage.clear();
    }

    render(){
        // TODO 
        if(localStorage.getItem('status') === 'connected'){ 
            return(
                <div className='d-flex'>
                    <Nav.Link href="/List/toWork">Ma liste "A travailler"</Nav.Link>
                    <Nav.Link href="/List/known">Ma liste "Connus"</Nav.Link>
                    <Nav.Link onClick={this.disconnect} href='/'>Se déconnecter</Nav.Link>
                </div>
            )
        }
        else if(localStorage.getItem('status') !== 'connected'){
            return(
                <div className='d-flex'>
                    <Nav.Link href='/Connection'>Se connecter</Nav.Link>
                    <Nav.Link href='/Inscription'>S'inscrire</Nav.Link>
                </div>
            )
        }
    }
}

export default NavList;