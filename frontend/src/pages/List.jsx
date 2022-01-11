import '../scss/main.scss'
import { useParams } from 'react-router-dom'
import ListComponent from '../components/ListComponent'

function List(){
    const { list } = useParams();

    return(
        <section className="List">
            <div className='page'>
                <ListComponent list={list} />
            </div>
        </section>
    )
}

export default List;