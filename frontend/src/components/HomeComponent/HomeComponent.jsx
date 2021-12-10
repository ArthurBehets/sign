import React from "react"; 
// import ReactPlayer from "react-player"
// import Video from '../../videos/video-1638020145.mp4'
import './HomeComponent.scss'
import SearchBar from "../SearchBar/SearchBar";

function HomeComponent(){
    return(
        <section className="homeComponent">
            <div className="corps container">
                <h1 className="corps__title">
                    Bienvenue dans ce dictionnaire de langue des signes français !
                </h1>
                <SearchBar />
            </div>
        </section>
    )
}




export default HomeComponent