import { Component } from "react";


class CreateSignComponent extends Component{
    state = {
        categories : []
    }

    componentDidMount(){
        fetch('http://localhost:3001/api/sign/getAllCategories/')
        .then(res => {
            if(res.ok){
                return res.json()
            }
        })
        .then(response => {
            this.setState({
                categories : response
            })
        })
    }

    send(){
        let url = document.getElementById('url').value;
        let traduction = document.getElementById('traduction').value;
        let category = document.getElementById('category').value;
        let userId = localStorage.getItem('userId');
        let body = {
            'url' : url,
            'traduction' : traduction,
            'categoryId' : category,
            'userId' : userId
        }
        fetch('http://localhost:3001/api/sign/createSign/', {
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
            
        })
        
    }

    render(){
        return(
            <div>
                <label>
                    Url de la vidéo Youtube
                    <input type='text' id="url" placeholder='URL'></input>
                </label>
                <label>
                    Traduction
                    <input type="text" id="traduction" placeholder='Traduction'></input>
                </label>
                <label>
                    Category
                    <select id="category">
                        {this.state.categories.map((Category) =>
                            <option value={Category.categoryId} key={Category.categoryId}>{Category.categoryName}</option>
                        )}
                    </select>
                </label>
                <button onClick={this.send}></button>
            </div>
        )
    }
}

export default CreateSignComponent;