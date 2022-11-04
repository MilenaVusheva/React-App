
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';

import * as petService from '../../services/petService';

import PetList from '../PetList';
import style from './MyPets.module.css'

const MyPets = () => {
    const [pets, setPets] = useState([]);
    const {user} = useAuthContext();

    useEffect(() => {
        petService.getMyPets(user._id)
            .then(petResult => {
                setPets(petResult);
            });
    }, [user._id]);

    return (
        <section className={style.galery}>
            <h1 className={style.text} >My Pets </h1>
              <PetList pets={pets} />  
        </section> 
    );
}

export default MyPets;