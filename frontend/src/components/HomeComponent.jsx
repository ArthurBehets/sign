import React from "react"; 
import SearchBar from "./SearchBar";

function HomeComponent(){
    return(
        <section className="">
            <div className="corps container">
                <h1 className="corps__title">
                    Bienvenue dans ce dictionnaire de langue des signes francophone belge !
                </h1>
                <p>
                    *Ce dictionnaire est en cours de lancement et n'a donc pas encore beaucoup de mots.<br />
                    Si vous souhaitez proposer un nouveau signe, rendez-vous en bas de page.
                </p>
                <SearchBar />
            </div>
        </section>
    )
}




export default HomeComponent