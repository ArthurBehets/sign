import { Component } from 'react';
import '../scss/main.scss'

let quizzArray = [];
let random;

function clearPopup(){
    document.getElementById("popup").innerHTML = "";
}

class Quizz extends Component{
    state = {
        param : "",
        currentSign : {},
        end : false
    }

    componentDidMount(){
        if(this.param === 'ToWork' || this.param === 'Known'){
            fetch('http://localhost:3001/api/sign/get' + this.param + '/' ,{
                method : 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({'userId' : localStorage.getItem('userId')})
            })
            .then(res =>{
                if(res.ok){
                    return res.json()
                }
            })
            .then(results =>{
                quizzArray = results
                return quizzArray
            })
            .then(quizzArray =>{
                random = Math.floor(Math.random() * quizzArray.length);
                this.setState({
                    currentSign : quizzArray[random]
            })
            })
        }
        else{
            fetch('http://localhost:3001/api/sign/getOneCategory/' + this.param)
            .then(res =>{
                if(res.ok){
                    return res.json()
                }
            })
            .then(results =>{
                quizzArray = results;
                return quizzArray
            })
            .then(quizzArray =>{
                random = Math.floor(Math.random() * quizzArray.length);
                this.setState({
                    currentSign : quizzArray[random]
            })
            })
        }

    }

    getRamdom = () => {
        let answer = document.getElementById("answer").value;
        if(answer === quizzArray[random].traduction){
            document.getElementById("answer").value = '';
            document.getElementById("popup").innerHTML = "<p class='popup__good'>Bien joué</p>"
            setTimeout(clearPopup, 5000)
            quizzArray.splice(random, 1);
            if(quizzArray.length > 0){
                random = Math.floor(Math.random() * quizzArray.length);
                this.setState({
                    currentSign : quizzArray[random]
                })
            }
            else{
                this.setState({
                    end : true
                })
            }
        }
        else{
            document.getElementById("popup").innerHTML = "<p class='popup__bad'>Dommage</p>"
            document.getElementById("answer").value = ''
            setTimeout(clearPopup, 5000)
            random = Math.floor(Math.random() * quizzArray.length);
            this.setState({
                currentSign : quizzArray[random]
            })
        }
    }

    constructor(props){
        super(props);
        this.param = props.category;
    }
    

    render(){
        if(this.state.end === false){
            return(
                <div className='corps container'>
                    <div className='corps__title row'>
                        <h1>A quel mot correspond ce signe?</h1>
                    </div>
                    <div className='corps__elements row'>
                        <div className='corps__elements-quizzVideo col-12'>
                        <iframe width="100%" height="500px" src={this.state.currentSign.videoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                        <div className='col-12 corps__elements-quizzInput'>
                            <input type="text" name="answer" id='answer' placeholder='Ecrivez votre réponse ici'></input>
                            <button onClick={this.getRamdom}>Valider</button>
                        </div>
                    </div>
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