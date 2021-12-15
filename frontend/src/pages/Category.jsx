import { useParams } from 'react-router-dom'
import ShowCategory from '../components/ShowCategory/ShowCategory'
import '../scss/main.scss'
function Category(){
    const { categoryId } = useParams();


    return (
        <section className="Category">
            <div className='page'>
                <ShowCategory category={categoryId} />
            </div>
        </section>
    )
}

export default Category;