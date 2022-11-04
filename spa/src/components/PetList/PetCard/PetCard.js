import { Link } from 'react-router-dom';
import style from './PetCard.module.css';
import heart from '../../../Heart.svg.png';


const PetCard = ({ pet }) => {
    return (
        <li className={style.otherPet}>
            <h3>Name: {pet.name}</h3>
        
                <Link to={`/details/${pet._id}`} >
                <img className={style.img} src={pet.imageUrl} />
                </Link>
            
            {/* <Link to={`/details/${pet._id}`} className="button">
                Details
            </Link> */}
             <p className={style.category} > Category: {pet.category}</p>
            <div className="likes">
                <img className="hearts" style={{ width: "20px" ,float:'left'}} src={heart} alt="Heart" />
                <span className={style.totalLikes} > Likes: {pet.likes?.length || 0}</span>
            </div>
            <p className={style.creator}> Creator: {pet.creator}</p>
        </li>
    );
}

export default PetCard;