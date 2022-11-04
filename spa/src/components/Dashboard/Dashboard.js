import { useState, useEffect } from 'react';

import * as petService from '../../services/petService';
import PetList from '../../components/PetList';
import style from './Dashboard.module.css'

const Dashboard = ({ }) => {

    const [pets, setPets] = useState([]);

    useEffect(() => {
        petService.getAll()
            .then(result => {
                setPets(result)
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <section className={style.dashboard}>
            <h1 className={style.text} >Dashboard </h1>
            <section className={style.galery}>
                <PetList pets={pets} />
            </section>
        </section>
    );
};

export default Dashboard;