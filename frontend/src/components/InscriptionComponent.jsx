import { Component } from "react";

class ConnectionComponent extends Component{
    state = {
        
    }

    connect(){
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let lastName = document.getElementById('lastName').value;
        let firstName = document.getElementById('firstName').value; // TODO vérifier les infos
        let grade = 'user';
        let body = {
            'email' : email,
            'password' : password,
            'lastName' : lastName,
            'firstName' : firstName,
            'grade' : grade // TODO sécuriser le grade
        }
        console.log(body)
        fetch('http://localhost:3001/api/auth/signup/', {
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body : JSON.stringify(body)
        })
        .then(res =>{
            if(res.ok){
                return res.json()
            }
        })
        .then(results =>{
            console.log(results) // TODO alerte
        })
    }

    render(){
        return(
            <div>
                <label>
                    Adresse Email
                    <input type='email' id="email" placeholder='exemple@exemple.com'></input>
                </label>
                <label>
                    Mot de passe
                    <input type="password" id="password" placeholder='Mot de passe'></input>
                </label>
                <label>
                    Nom de famille
                    <input type="text" id="lastName" placeholder='Nom de famille'></input>
                </label>
                <label>
                    Prénom
                    <input type="text" id="firstName" placeholder='Prénom'></input>
                </label>
                <button onClick={this.connect}></button>
            </div>
        )
    }
}

export default ConnectionComponent;