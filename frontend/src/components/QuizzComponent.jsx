import { Component } from 'react';
import '../scss/main.scss'

let quizzArray = [];


class Quizz extends Component{
    state = {
        param : "",
        currentSign : {},
        end : false
    }

    componentDidMount(){
        fetch('http://localhost:3001/api/sign/getOneCategory/' + this.param)
        .then(res =>{
            if(res.ok){
                return res.json()
            }
        })
        .then(results =>{
            this.setState({
                sign : results
            })
            quizzArray = results;
            return quizzArray
        })
        .then(quizzArray =>{
            let random = Math.floor(Math.random() * quizzArray.length);
            this.setState({
                currentSign : quizzArray[random]
            })
            quizzArray.splice(random, 1);
            })
        }

    getRamdom = () => {
        if(quizzArray.length >= 2){
            let random = Math.floor(Math.random() * quizzArray.length);
            this.setState({
                currentSign : quizzArray[random]
            })
            quizzArray.splice(random, 1);
        }
        else{
            this.setState({
                end : true
            })
        }
    }

    constructor(props){
        super(props);
        this.param = Number(props.category);
    }
    

    render(){
        if(this.state.end === false){
            return(
                <div className='corps'>
                    <button onClick={this.getRamdom}>next</button>
                    {this.state.currentSign.traduction}
                </div>
            )
        }
        else if(this.state.end === true){
            return(
                <p>Vous avez terminé</p>
            )
        }
        
    }
}

export default Quizz;