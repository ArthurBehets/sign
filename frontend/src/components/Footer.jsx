import React, { Component } from 'react';
import '../scss/main.scss'

class Footer extends Component{
    componentDidMount(){
        console.log("ok");
    }
    render () {
        return(
            <footer className='footer'>
                <div className='container footer__content'>
                    <div className='row footer__content-lists'>
                        <ul className='col-6 row footer__content-lists-list'>
                            <li><a href="/newSign">Proposer un nouveau signe.</a></li>
                            <li><a href="/signalement">Signaler une erreur</a></li>
                        </ul>
                        <ul className='col-6 row footer__content-lists-list'>
                            <li>
                                <a href="https://fontawesome.com/" target="_blank" rel="noreferrer">Voir les icônes sur FontAwesome</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer