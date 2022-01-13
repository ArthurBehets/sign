import { Component, React } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {faGripLinesVertical, faGripHorizontal} from '@fortawesome/free-solid-svg-icons'
import AddToList from "./AddToLists";

library.add(fab, faGripLinesVertical, faGripHorizontal)

let known =  [];
let toWork = [];

class ShowCategory extends Component{
    state = {
        param :'',
        sign : [],
        category : '',
        categoryId : '',
        mode : 'col'
    }
    
    componentDidMount(){
        fetch('http://localhost:3001/api/sign/getToWork/',{
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body : JSON.stringify({'userId' : localStorage.getItem('userId')})
        })
        .then(res => {
            if(res.ok){
                return res.json()
            }
        })
        .then(response =>{
            for(let i in response){
                toWork.push(response[i].signId)
            }
        })
        fetch('http://localhost:3001/api/sign/getKnown/',{
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body : JSON.stringify({'userId' : localStorage.getItem('userId')})
        })
        .then(res => {
            if(res.ok){
                return res.json()
            }
        })
        .then(response =>{
            for(let i in response){
                known.push(response[i].signId)
            }
        })
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
            this.setState({
                category : results[0].categoryName
            })
            this.setState({
                categoryId : results[0].categoryId
            })
        })
    }

    changeDisplay = () => {
        if(this.state.mode === "col"){
            this.setState({
                mode : "block"
            })
        }
        else if(this.state.mode === "block"){
            this.setState({
                mode : "col"
            })
        }
    }

    constructor(props){
        super(props);
        this.param = Number(props.category);
    }

    render(){
        if(this.state.mode === 'col'){
            return(
                <div className="corps container">
                    <div className="row corps__elements-head">
                        <h1 className="col-lg-1 col-sm-6 corps__elements-head-title"> { this.state.category } </h1>
                        <div   className=" col corps__elements-head-button">
                            <button onClick={this.changeDisplay}><FontAwesomeIcon icon="grip-lines-vertical" className="corps__elements-head-button-icon" /></button>
                        </div>
                        <a href={"/quizz/" + this.state.categoryId} className="col corps__elements-head-link" >Passer le quizz</a>
                    </div>
                    <div className="corps__element">
                        <div className="corps__elements-list row">
                            { 
                            this.state.sign.map((i) => 
                                <a className="corps__elements-list-item col-6 col-md-4 col-lg-2" key={i.signId} href={"/Sign/" + i.signId} id={"sign" + i.signId}>{i.traduction}</a>
                                )
                            }
                        </div>
                    </div>
                </div>
            )
        }
        else if(this.state.mode === 'block'){
            return(
                <div className="corps container">
                    <div className="row corps__elements-head">
                        <h1 className="col-lg-2 col-sm-4 corps__elements-head-title"> { this.state.category } </h1>
                        <div   className=" col-sm-2 corps__elements-head-button">
                            <button onClick={this.changeDisplay}><FontAwesomeIcon icon="grip-horizontal" /></button>
                        </div>
                        <a href={"/quizz/" + this.state.category} className="col" >Passer le quizz</a>
                    </div>
                    <div className="corps__items">
                        <div className="corps__items-list">
                            { 
                            this.state.sign.map((i) => 
                                    <div className='corps__items-list-sign row' key={i.signId}>
                                        <div className='player-wrapper col-lg-8 col-xl-6 corps__items-list-sign-videoDiv'>
                                            <iframe width="100%" height="100%" src={i.videoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                        </div>
                                        <div className='corps__items-list-sign-rightDiv col-lg-4 col-xl-6'>
                                            <p className='corps__items-list-sign-rightDiv-traduction'>{i.traduction}</p>
                                                {(known.indexOf(i.signId) !== -1) ? ( 
                                                    (toWork.indexOf(i.signId) !== -1) ? (
                                                        <AddToList signId={i.signId} known={true} toWork={true} />
                                                    ) : (
                                                        <AddToList signId={i.signId} known={true} toWork={false} />
                                                    )
                                                ): (
                                                    (toWork.indexOf(i.signId) !== -1) ? (
                                                        <AddToList signId={i.signId} known={false} toWork={true} />
                                                    ) : (
                                                        <AddToList signId={i.signId} known={false} toWork={false} />
                                                    )
                                                )}
                                        </div>
                                    </div> 
                                )
                            }
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <p>Page indisponible</p>
            )
        }
    }
}

export default ShowCategory;

