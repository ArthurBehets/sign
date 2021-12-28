import { useParams } from 'react-router-dom'
import '../scss/main.scss'
import QuizzComponent from "../components/QuizzComponent"



function Quizz(){
    const { category } = useParams();

    
    return(
        <div className='page'>
            <QuizzComponent category= {category} />
        </div>
    )
    
}

export default Quizz;