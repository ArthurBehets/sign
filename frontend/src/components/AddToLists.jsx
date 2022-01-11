import React, { Component } from 'react';

class addToList extends Component{
    state = {
        props : [],
        signId : '',
        toWork : false,
        known : false

    }
    componentDidMount(){
        this.setState({
            toWork : this.props.toWork,
            known : this.props.known
        })
        this.signId = this.props.signId;
        console.log(this.props.toWork)
        console.log(this.props.known)
        console.log(this.props.signId)
    }
    handleKnown(statement){
        fetch('http://localhost:3001/api/sign/addToKnown/' + statement,{
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body : JSON.stringify({'signId' : this.signId, 'userId' : localStorage.getItem('userId')})
        })
        .then(res => {
            if(res.ok){
                return res.json()
            }
        })
        .then( result =>{
            console.log(result)
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
            body : JSON.stringify({'signId' : this.signId, 'userId' : localStorage.getItem('userId')})
        })
        .then(res => {
            if(res.ok){
                return res.json()
            }
        })
        .then( result =>{
            console.log(result)
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
        this.props = props;
    }

    render () {
        if(this.state.known === true && this.state.toWork === true){
            return(
                <div className="corps__items-list-sign-rightDiv-buttons">
                    <button  onClick={ () => this.handleToWork('checked')} id={'buttonToWork + signId' } className="row corps__items-list-sign-rightDiv-buttons-button-checked">
                        A travailler
                    </button >
                    <button onClick={ () => this.handleKnown('checked')} id={'buttonKnown + signId' } className="row corps__items-list-sign-rightDiv-buttons-button-checked">
                        Connus
                    </button>
                </div>
            )
        }
        else if(this.state.known === true && this.state.toWork === false){
            return(
                <div className="corps__items-list-sign-rightDiv-buttons">
                    <button  onClick={ () => this.handleToWork('unchecked')} id={'buttonToWork + signId' } className="row corps__items-list-sign-rightDiv-buttons-button">
                        A travailler
                    </button >
                    <button onClick={ () => this.handleKnown('checked')} id={'buttonKnown + signId' } className="row corps__items-list-sign-rightDiv-buttons-button-checked">
                        Connus
                    </button>
                </div>
            )
        }
        else if(this.state.known === false && this.state.toWork === false){
            return(
                <div className="corps__items-list-sign-rightDiv-buttons">
                    <button  onClick={ () => this.handleToWork('unchecked')} id={'buttonToWork + signId' } className="row corps__items-list-sign-rightDiv-buttons-button">
                        A travailler
                    </button >
                    <button onClick={ () => this.handleKnown('unchecked')} id={'buttonKnown + signId' } className="row corps__items-list-sign-rightDiv-buttons-button">
                        Connus
                    </button>
                </div>
            )
        }
        else if(this.state.known === false && this.state.toWork === true){
            return(
                <div className="corps__items-list-sign-rightDiv-buttons">
                    <button  onClick={ () => this.handleToWork('checked')} id={'buttonToWork + signId' } className="row corps__items-list-sign-rightDiv-buttons-button-checked">
                        A travailler
                    </button >
                    <button onClick={ () => this.handleKnown('unchecked')} id={'buttonKnown + signId' } className="row corps__items-list-sign-rightDiv-buttons-button">
                        Connus
                    </button>
                </div>
            )
        }
    }
}

export default addToList;