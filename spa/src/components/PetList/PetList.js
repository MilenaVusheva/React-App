import PetCard from "./PetCard";
import style from './PetList.module.css'

const PetList = ({
    pets
}) => {
    return (
        <>
            {pets.length > 0
                ? (
                    <ul className={style.petsList}>
                        {pets.map(x => <PetCard key={x._id} pet={x} />)}
                    </ul>
                ) 
                : <p className={style.noPets}>Страницата не е намерена!</p>
            }
        </>
    );
}

export default PetList;

