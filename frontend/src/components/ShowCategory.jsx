import { Component, React } from "react";
import ReactPlayer from 'react-player'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {faGripLinesVertical, faGripHorizontal} from '@fortawesome/free-solid-svg-icons'

library.add(fab, faGripLinesVertical, faGripHorizontal)

class ShowCategory extends Component{
    state = {
        param :'',
        sign : [],
        category : '',
        mode : 'col'
    }
    
    componentDidMount(){
        fetch('http://localhost:3001/api/sign/getOneCategory/' + this.param)
        .then(res =>{
            if(res.ok){
                return res.json()
            }
        })
        .then(results =>{
            console.log(results);
            this.setState({
                sign : results
            })
            this.setState({
                category : results[0].categoryName
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
                            <button onClick={this.changeDisplay}><FontAwesomeIcon icon="grip-lines-vertical" /></button>
                        </div>
                    </div>
                    <div className="corps__element">
                        <div className="corps__elements-list row">
                            { 
                            this.state.sign.map((i) => 
                                <a className="corps__elements-list-item col-lg-2" key={i.signId} href={"/Sign/" + i.signId} id={"sign" + i.signId}>{i.traduction}</a>
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
                        <h1 className="col-lg-1 col-sm-6 corps__elements-head-title"> { this.state.category } </h1>
                        <div   className=" col corps__elements-head-button">
                            <button onClick={this.changeDisplay}><FontAwesomeIcon icon="grip-horizontal" /></button>
                        </div>
                    </div>
                    <div className="corps__items">
                        <div className="corps__items-list">
                            { 
                            this.state.sign.map((i) => 
                                    <div className='corps__items-list-sign row' key={i.signId}>
                                        <div className='player-wrapper col-lg-6 corps__items-list-sign-videoDiv'>
                                            <ReactPlayer
                                            className='react-player corps__items-list-sign-videoDiv-video'
                                            url= '../videos/video-1638020145.mp4'
                                            controls = {true}

                                            />
                                        </div>
                                        <p className='corps__items-list-sign-traduction-p col-lg-3'>{i.traduction}</p>
                                        <div className="col-lg-3 corps__items-list-sign-buttons">
                                            <a href="/" className="row corps__items-list-sign-buttons-button">
                                                A travailler
                                            </a>
                                            <a href="/" className="row corps__items-list-sign-buttons-button">
                                                Connus
                                            </a>
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