import { Component, React } from "react";
import ReactPlayer from 'react-player'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'

library.add(fab, faArrowLeft)

class Sign extends Component{
    state = {
        param :'',
        sign : {},
        signId : '',
        mode : 'col'
    }
    
    componentDidMount(){
        fetch("http://localhost:3001/api/sign/getOne/" + this.param)
        .then(res =>{
            if(res.ok){
                return res.json()
            }
        })
        .then(values =>{
            console.log(values)
            this.setState({
                sign : values[0]
            })
        })
    }

    constructor(props){
        super(props);
        this.param = (props.signId);
    }
    render(){
        return(
            <div className="corps container">
                <a href={"/category/" + this.state.sign.categoryId} className="corps__back"><FontAwesomeIcon icon="arrow-left" /></a>
                <div className="row corps__elements-head">
                    <h1 className="col-lg-3 col-sm-6 corps__elements-head-title"> { this.state.sign.categoryName + " : " + this.state.sign.traduction } </h1>
                </div>
                <div className="corps__items ">
                    <div className="corps__items-list">
                        <div className='corps__items-list-sign row'>
                            <div className='player-wrapper col-lg-8 col-xl-6 corps__items-list-sign-videoDiv'>
                                <ReactPlayer
                                className='react-player corps__items-list-sign-videoDiv-video'
                                url= '../videos/video-1638020145.mp4'
                                controls = {true}
                                width="100%"
                                />
                            </div>
                            <div className='corps__items-list-sign-rightDiv col-lg-4 col-xl-6'>
                                <p className='corps__items-list-sign-rightDiv-traduction'>{this.state.sign.traduction}</p>
                                <div className="corps__items-list-sign-rightDiv-buttons">
                                    <button  onClick={this.handleToWork} className="row corps__items-list-sign-rightDiv-buttons-button">
                                        A travailler
                                    </button >
                                    <button onClick={this.handleKnown} className="row corps__items-list-sign-rightDiv-buttons-button">
                                        Connus
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sign;