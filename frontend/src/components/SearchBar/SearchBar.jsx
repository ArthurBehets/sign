import React, { Component } from 'react';

class SearchBar extends Component {
    state = {
        query: '',
        data: [],
        dataSelected : []
    }

    handleInputChange = () => {
        this.query = this.search.value;
        console.log(this.data)
        this.selectDatas()
    }

    selectDatas = () => {
        let tested = [];
        for (let i in this.data){
            if(this.data[i].categoryName.toLowerCase().startsWith(this.query.toLowerCase())){
                tested.push(this.data[i]);
            }
        }
        this.setState({
            dataSelected:tested
        })

    }
    getData = () => {
        fetch(`http://localhost:3001/api/sign/getAllCategories`)
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    dataSelected :responseData
                })
                this.data = responseData
            })
    }

    componentWillMount() {
        this.getData();
    }
    render() {
        return (
            <div className="corps__categories">
                <div className="row corps__categories-head">
                    <h2 className="col-lg-2 col-sm-6 corps__categories-head-title">
                        Catégories
                    </h2>
                    <form className="col-lg-2 col-sm-6 corps__categories-head-form">
                        <input type="text" id="search" placeholder="Trouver un catégorie" ref={input => this.search = input} onChange={this.handleInputChange}/>
                    </form>
                </div>
                <div className="corps__categories-list row">
                    {
                        this.state.dataSelected.map((i) =>
                            <a className="corps__categories-list-item col-lg-4" href={"/Category/" + i.categoryId} id={"category" + i.categoryId}>{i.categoryName}</a>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default SearchBar;