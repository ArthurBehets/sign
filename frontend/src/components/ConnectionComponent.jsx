import { Component } from "react";

class ConnectionComponent extends Component{
    state = {
        
    }

    connect(){
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let body = {
            'email' : email,
            'password' : password
        }
        console.log(body)
        fetch('http://localhost:3001/api/auth/login/', {
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
            localStorage.setItem('token', results.token)
            localStorage.setItem('grade', results.grade)
            localStorage.setItem('userId', results.userId)
            localStorage.setItem('status', 'connected')
        })
        .then(function(){
            window.location.href = '/'
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
                <button onClick={this.connect}></button>
            </div>
        )
    }
}

export default ConnectionComponent;