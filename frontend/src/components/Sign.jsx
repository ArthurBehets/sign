import { Component, React } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {faArrowLeft, faCheck} from '@fortawesome/free-solid-svg-icons'

library.add(fab, faArrowLeft, fas, faCheck)

class Sign extends Component{
    state = {
        param :'',
        sign : [],
        category : '',
        categoryId : '',
        known : false,
        toWork : false
    }
    
    componentDidMount(){
        fetch('http://localhost:3001/api/sign/getOneToWork/',{
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body : JSON.stringify({'userId' : localStorage.getItem('userId'), 'signId' : this.param})
        })
        .then(res => {
            if(res.ok){
                return res.json()
            }
        })
        .then(response =>{
            if(response[0]){
                this.setState({
                    toWork : true
                })
            }
        })
        fetch('http://localhost:3001/api/sign/getOneKnown/',{
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body : JSON.stringify({'userId' : localStorage.getItem('userId'), 'signId' : this.param})
        })
        .then(res => {
            if(res.ok){
                return res.json()
            }
        })
        .then(response =>{
            if(response[0]){
                if(response){
                    this.setState({
                        known : true
                    })
                }
            }
            fetch("http://localhost:3001/api/sign/getOne/" + this.param)
            .then(res =>{
                if(res.ok){
                    return res.json()
                }
            })
            .then(values =>{
                this.setState({
                    sign : values[0]
                })
            })
        })
    }

    handleKnown(statement){
        fetch('http://localhost:3001/api/sign/addToKnown/' + statement,{
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body : JSON.stringify({'signId' : this.param, 'userId' : localStorage.getItem('userId')})
        })
        .then(res => {
            if(res.ok){
                return res.json()
            }
        })
        .then( result =>{
            if(statement === 'checked'){
               this.setState({
                   known : false
               })
            }
            else if(statement === 'unchecked'){
                this.setState({
                    known : true
                })
            }
            })
    }

    handleToWork(statement){
        fetch('http://localhost:3001/api/sign/addToWork/' + statement,{
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body : JSON.stringify({'signId' : this.param, 'userId' : localStorage.getItem('userId')})
        })
        .then(res => {
            if(res.ok){
                return res.json()
            }
        })
        .then( result =>{
            if(statement === 'checked'){
               this.setState({
                   toWork : false
               })
            }
            else if(statement === 'unchecked'){
                this.setState({
                    toWork : true
                })
            }
        })
    }

    constructor(props){
        super(props);
        this.param = (props.signId);
    }
    render(){
        return(
            <div className="corps container">
                <a href={"/category/" + this.state.sign.categoryId} className="corps__back"><FontAwesomeIcon icon="arrow-left" /></a>
                <div className="row corps__elements-head">
                    <h1 className="col-lg-3 col-sm-6 corps__elements-head-title"> { this.state.sign.categoryName + " : " + this.state.sign.traduction } </h1>
                </div>
                <div className="corps__items ">
                    <div className="corps__items-list">
                        <div className='corps__items-list-sign row'>
                            <div className='player-wrapper col-lg-8 col-xl-6 corps__items-list-sign-videoDiv'>
                            <iframe width="100%" height="100%" src={this.state.sign.videoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                            <div className='corps__items-list-sign-rightDiv col-lg-4 col-xl-6'>
                                <p className='corps__items-list-sign-rightDiv-traduction'>{this.state.sign.traduction}</p>
                                
                                {(this.state.known === true) ? ( 
                                    (this.state.toWork === true) ? (
                                        <div className="corps__items-list-sign-rightDiv-buttons">
                                            <button  onClick={ () => this.handleToWork('checked')} id={'buttonToWork + signId' } className="row corps__items-list-sign-rightDiv-buttons-button-checked">
                                                <p><FontAwesomeIcon icon='check' className='corps__items-list-sign-rightDiv-buttons-button-icon'/> A travailler</p>
                                            </button >
                                            <button onClick={ () => this.handleKnown('checked')} id={'buttonKnown + signId' } className="row corps__items-list-sign-rightDiv-buttons-button-checked">
                                                <p><FontAwesomeIcon icon='check' className='corps__items-list-sign-rightDiv-buttons-button-icon'/> Connu</p>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="corps__items-list-sign-rightDiv-buttons">
                                            <button  onClick={ () => this.handleToWork('unchecked')} id={'buttonToWork + signId' } className="row corps__items-list-sign-rightDiv-buttons-button">
                                                A travailler
                                            </button >
                                            <button onClick={ () => this.handleKnown('checked')} id={'buttonKnown + signId' } className="row corps__items-list-sign-rightDiv-buttons-button-checked">
                                                <p><FontAwesomeIcon icon='check' className='corps__items-list-sign-rightDiv-buttons-button-icon'/> Connu</p>
                                            </button>
                                        </div>
                                    )
                                ): (
                                    (this.state.toWork === true) ? (
                                        <div className="corps__items-list-sign-rightDiv-buttons">
                                            <button  onClick={ () => this.handleToWork('checked')} id={'buttonToWork + signId' } className="row corps__items-list-sign-rightDiv-buttons-button-checked">
                                                <p><FontAwesomeIcon icon='check' className='corps__items-list-sign-rightDiv-buttons-button-icon'/> A travailler</p>
                                            </button >
                                            <button onClick={ () => this.handleKnown('unchecked')} id={'buttonKnown + signId' } className="row corps__items-list-sign-rightDiv-buttons-button">
                                                Connus
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="corps__items-list-sign-rightDiv-buttons">
                                            <button  onClick={ () => this.handleToWork('unchecked')} id={'buttonToWork + signId' } className="row corps__items-list-sign-rightDiv-buttons-button">
                                                A travailler
                                            </button >
                                            <button onClick={ () => this.handleKnown('unchecked')} id={'buttonKnown + signId' } className="row corps__items-list-sign-rightDiv-buttons-button">
                                                Connus
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sign;