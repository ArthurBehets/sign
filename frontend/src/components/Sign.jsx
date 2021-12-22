import { Component, React } from "react";
import ReactPlayer from 'react-player'

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
                <div className="corps__items ">
                    <div className="corps__items-list">
                        <div className='corps__items-list-sign row'>
                            <div className='player-wrapper col-lg-6 corps__items-list-sign-videoDiv'>
                                <ReactPlayer
                                className='react-player corps__items-list-sign-videoDiv-video'
                                url= '../videos/video-1638020145.mp4'
                                controls = {true}
                                />
                            </div>
                            <p className='corps__items-list-sign-traduction-p col-lg-3'>{this.state.sign.traduction}</p>
                            <div className="col-lg-3 corps__items-list-sign-buttons">
                                <a href="/" className="row corps__items-list-sign-buttons-button">
                                    A travailler
                                </a>
                                <a href="/" className="row corps__items-list-sign-buttons-button">
                                    Connus
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sign;