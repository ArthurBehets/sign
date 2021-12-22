import SignCompo from '../components/Sign'
import { useParams } from 'react-router-dom'

function Sign() {
    const { signId} = useParams();
    return (
        <div className='page'>
            <SignCompo signId ={signId} />
        </div>
    )
}

export default Sign