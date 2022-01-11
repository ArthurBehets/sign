import { Component } from "react";


class ListComponent extends Component{
    state = {
        param : ''
    }

    componentDidMount(){
        // TODO 
        fetch('http://localhost:3001/api/sign/get' + this.param + '/')
        .then(res =>{
            if(res.ok){
                return res.json()
            }
        })
        .then(response =>{
            console.log(response)
        })
    }

    constructor(props){
        super(props);
        this.param = props.list;
    }
    render(){
        if(this.param === 'known'){
            return(
                <div></div>
            )   
        }
        if(this.param === 'toWork'){
            return(
                <div></div>
            )   
        }
    }
}

export default ListComponent;