import { Component } from "react";

function clearPopup(){
    document.getElementById("popup").innerHTML = "";
}

class ConnectionComponent extends Component{
    state = {
        
    }

    connect(){
        const testMail = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let lastName = document.getElementById('lastName').value;
        let firstName = document.getElementById('firstName').value; //
        let grade = 'user';
        let body = {
            'email' : email,
            'password' : password,
            'lastName' : lastName,
            'firstName' : firstName,
            'grade' : grade // TODO sécuriser le grade
        }
        if(testMail.test(email)){
            if(password.length <= 20 && password.length >= 9){
                console.log(password.length)
                if( 1 <= lastName.length && lastName.length <= 20 && 1 <= firstName.length && firstName.length <= 20){
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
                        window.location.href = '/login'
                    })
                }
                else{
                    document.getElementById('popup').innerHTML = "<div class='popup__bad'>Veuillez rentrer des noms valides</div>"
                    setTimeout(clearPopup, 5000);
                }
            }
            else{
                document.getElementById('popup').innerHTML = "<div class='popup__bad'>Le mot de passe doit comporter entre 9 et 20 caractères</div>"
                setTimeout(clearPopup, 5000);
            }
        }
        else{
            document.getElementById('popup').innerHTML = "<div class='popup__bad'>L'adresse email n'est pas correcte.</div>"
            setTimeout(clearPopup, 5000);
        }
    }

    render(){
        return(
            <div className="container form">
                <label className="form__label">
                    Adresse Email
                    <input type='email' id="email" className='form__label-input' placeholder='exemple@exemple.com'></input>
                </label>
                <label className="form__label">
                    Mot de passe
                    <input type="password" id="password" className='form__label-input' placeholder='Mot de passe'></input>
                </label>
                <label className="form__label">
                    Nom de famille
                    <input type="text" id="lastName" className='form__label-input' placeholder='Nom de famille'></input>
                </label>
                <label className="form__label">
                    Prénom
                    <input type="text" id="firstName" className='form__label-input' placeholder='Prénom'></input>
                </label>
                <button onClick={this.connect} className="form__button">
                    S'inscrire
                </button>
            </div>
        )
    }
}

export default ConnectionComponent;