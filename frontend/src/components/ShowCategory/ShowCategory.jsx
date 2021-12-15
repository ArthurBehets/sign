import { Component, React } from "react";
import ReactPlayer from 'react-player'

class ShowCategory extends Component{
    state = {
        param :'',
        sign : [],
        category : '',
        mode : 'row',
        path : '../../videos/video-1638020145.mp4'
    }
    
    componentDidMount(){
        console.log(this.param)
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

    constructor(props){
        super(props);
        this.param = Number(props.category);
    }

    render(){
        if(this.state.mode === 'row'){
            return(
                <div className="corps container">
                    <div>
                        <h1 className="corps__title"> { this.state.category } </h1>
                        <button></button>
                    </div>
                    <div className="corps__items">
                        <div className="corps__items-list">
                            { 
                            this.state.sign.map((i) => 
                                    <div className='corps__items-list-sign row' key={i.signId}>
                                        <div className='corps__items-list-sign-traduction col-lg-4'>
                                        <div className='player-wrapper'>
                                            <ReactPlayer
                                            playing
                                            className='react-player'
                                            url= '../videos/video-1638020145.mp4'
                                            width='50%'
                                            height='50%'
                                            controls = 'true'

                                            />
                                        </div>
                                            <p className='corps__items-list-sign-traduction-p'>{i.traduction}</p>
                                        </div>
                                        <div className="col-lg-3 corps__items-list-sign-buttons">
                                            <button className="row col-lg-4 corps__items-list-sign-buttons-button">
                                                A travailler
                                            </button>
                                            <button className="row ">
                                                Connus
                                            </button>
                                        </div>
                                    </div> 
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
                    <h1 className="corps__title"> { this.state.category } </h1>
                    <div className="corps__items">
                        <div className="corps__items-list">
                            { 
                            this.state.sign.map((i) => 
                                    <div className='corps__items-list-sign row' key={i.signId}>
                                        <div className='corps__items-list-sign-videoDiv col-lg-4'>
                                            
                                        </div>
                                        <div className='corps__items-list-sign-traduction col-lg-4'>
                                            <p className='corps__items-list-sign-traduction-p'>{i.traduction}</p>
                                        </div>
                                        <div className="col-lg-3 corps__items-list-sign-buttons">
                                            <button className="row col-lg-4 corps__items-list-sign-buttons-button">
                                                A travailler
                                            </button>
                                            <button className="row ">
                                                Unknown
                                            </button>
                                        </div>
                                    </div> 
                                )
                            }
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default ShowCategory;