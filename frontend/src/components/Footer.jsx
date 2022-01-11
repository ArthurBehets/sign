import React, { Component } from 'react';
import '../scss/main.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab, faFontAwesomeFlag } from '@fortawesome/free-brands-svg-icons'
import {faYoutube} from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(fab, faYoutube, faFontAwesomeFlag)

class Footer extends Component{
    componentDidMount(){
        console.log("ok");
    }
    render () {
        if(localStorage.getItem('grade') !== 'admin'){
            return(
                <footer className='footer'>
                    <div className='container footer__content'>
                        <div className='row footer__content-lists'>
                            <ul className='col-6 row footer__content-lists-list'>
                                <li><a href="/signalement">Signaler une erreur</a></li>
                            </ul>
                            <ul className='col-6 row footer__content-lists-list'>
                                <li className='row'>
                                    <a href="https://fontawesome.com/" target="_blank" rel="noreferrer">Voir les icônes sur FontAwesome <FontAwesomeIcon icon={faFontAwesomeFlag} color='#949bff' /></a>
                                    <a href="https://youtube.com" target="_blank" rel='noreferrer'>Vidéos stockées sur Youtube. <FontAwesomeIcon icon={faYoutube} color='red' /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </footer>
            )
        }
        else{
            return(
                <footer className='footer'>
                    <div className='container footer__content'>
                        <div className='row footer__content-lists'>
                            <ul className='col-6 row footer__content-lists-list'>
                                <li><a href="/signalement">Signaler une erreur</a></li>
                                <li><a href="/createSign">Créer un nouveau signe</a></li>
                            </ul>
                            <ul className='col-6 row footer__content-lists-list'>
                                <li className='row'>
                                    <a href="https://fontawesome.com/" target="_blank" rel="noreferrer">Voir les icônes sur FontAwesome <FontAwesomeIcon icon={faFontAwesomeFlag} color='#949bff' /></a>
                                    <a href="https://youtube.com" target="_blank" rel='noreferrer'>Vidéos stockées sur Youtube. <FontAwesomeIcon icon={faYoutube} color='red' /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </footer>
            )
        }
    }
}

export default Footer