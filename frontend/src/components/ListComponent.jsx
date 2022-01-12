import { Component } from "react";


class ListComponent extends Component{
    state = {
        param : '',
        signs : []
    }

    componentDidMount(){
        console.log('je fonctionne')
        fetch('http://localhost:3001/api/sign/get' + this.param + '/' ,{
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body : JSON.stringify({'userId' : localStorage.getItem('userId')})
        })
        .then(res =>{
            if(res.ok){
                return res.json()
            }
        })
        .then(response =>{
            this.setState({
                signs : response
            })
            console.log(this.state.signs)
        })
    }

    constructor(props){
        super(props);
        this.param = props.list;
    }
    render(){
        if(this.param === 'Known'){
            return(
                <div className="corps container">
                    <div className="row corps__elements-head">
                        <h1 className="col-lg-3 col-sm-6 corps__elements-head-title"> Ma liste "Connus" </h1>
                        <div   className=" col corps__elements-head-button">
                        </div>
                        <a href={"/quizz/" + this.param} className="col" >Passer le quizz</a>
                    </div>
                    <div className="corps__element">
                        <div className="corps__elements-list row">
                            { 
                            this.state.signs.map((sign) => 
                                <a className="corps__elements-list-item col-6 col-md-4 col-lg-2" key={sign.signId} href={"/Sign/" + sign.signId} id={"sign" + sign.signId}>{sign.traduction}</a>
                                )
                            }
                        </div>
                    </div>
                </div>
            )  
        }
        if(this.param === 'ToWork'){
            return(
                <div className="corps container">
                    <div className="row corps__elements-head">
                        <h1 className="col-lg-3 col-sm-6 corps__elements-head-title"> Ma liste "A travailler"  </h1>
                        <div   className=" col corps__elements-head-button">
                        </div>
                        <a href={"/quizz/" + this.param} className="col" >Passer le quizz</a>
                    </div>
                    <div className="corps__element">
                        <div className="corps__elements-list row">
                            { 
                            this.state.signs.map((sign) => 
                                <a className="corps__elements-list-item col-6 col-md-4 col-lg-2" key={sign.signId} href={"/Sign/" + sign.signId} id={"sign" + sign.signId}>{sign.traduction}</a>
                                )
                            }
                        </div>
                    </div>
                </div>
            ) 
        }
    }
}

export default ListComponent;