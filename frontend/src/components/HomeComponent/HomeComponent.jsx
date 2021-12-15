import React from "react"; 
import SearchBar from "../SearchBar/SearchBar";

function HomeComponent(){
    return(
        <section className="">
            <div className="corps container">
                <h1 className="corps__title">
                    Bienvenue dans ce dictionnaire de langue des signes francophone belge !
                </h1>
                <SearchBar />
            </div>
        </section>
    )
}




export default HomeComponent