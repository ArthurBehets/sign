import { Component } from "react";
import { Button } from 'react-bootstrap';

let suggestionsVar = []

class Datalist extends Component{
    state = {
        suggestions : []
    }
    lookingForSign(){
        let id = '';
        let sign = document.getElementById('navInput').value;
        for (let i in suggestionsVar){
            if(suggestionsVar[i].traduction === sign){
                id = suggestionsVar[i].signId
            }
        }
        window.location.href = '/sign/' + id;
    }

    componentDidMount(){
        fetch('http://localhost:3001/api/sign/getAllSigns/')
        .then(res =>{
            if(res.ok){
                return res.json();
            }
        })
        .then(results =>{
            console.log(results);
            this.setState({
                suggestions : results
            })
            suggestionsVar = results
        })
    }

    constructor(props){
        super(props);
        console.log(props);
    }

    render(){
        return(
            <div>
                <datalist id='suggestion'>
                {this.state.suggestions.map((sign) => 
                <option key={sign.signId} id={'sign' + sign.signId}>{sign.traduction}</option>) } 
                </datalist>
                <Button variant="outline-success" onClick={this.lookingForSign}>Search</Button>
            </div>
        )
    }

    
}

export default Datalist;

