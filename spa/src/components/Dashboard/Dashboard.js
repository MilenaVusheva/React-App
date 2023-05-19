import { useState, useEffect } from 'react';

import * as petService from '../../services/petService';
import PetList from '../../components/PetList';
import Categories from './Categories';
import Search from './Search';
import style from './Dashboard.module.css'

const Dashboard = ({ }) => {

    const [pets, setPets] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [search, setSearch] = useState('');
    
    useEffect(() => {
        petService.getAll(selectedCategory, search)
            .then(result => {
                setPets(result)
            })
            .catch(err => {
                console.log(err);
            })
    }, [selectedCategory, search]);
    
    return (
        <section className={style.dashboard}>
            <h1 className={style.text} >Dashboard </h1>
            <section className={style.galery}>
                 <Categories selectedCategory={selectedCategory}
                setselectedCategory={(category) => setSelectedCategory(category)} />
                 <Search setSearch={(search) => (setSearch(search))} />
                <PetList pets={pets} />
            </section>
        </section>
    );
};

export default Dashboard;
