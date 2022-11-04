import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {

    // const defaultCategories = [
    //     { value: 'cats', text: 'Cat' },
    //     { value: 'dog', text: 'Dog' },
    //     { value: 'parrot', text: 'Parrot' },
    //     { value: 'horse', text: 'Horse' },
    //     { value: 'other', text: 'Other' },
    // ];

    // const [categoryList, setCategoryList] = useState([]);
    // const [selectedCategory, setSelectedCategory] = useState();

    // useEffect(() => {
    //     setCategoryList(defaultCategories);
    // }, []);

    // function getFilteredList() {
    //     // Avoid filter when selectedCategory is null
    //     if (!selectedCategory) {
    //         return categoryList;
    //     }
    //     return categoryList.filter((pet) => pet.category === selectedCategory);
    // };

    // const filteredList = useMemo(getFilteredList, [selectedCategory, categoryList]);

    // function handleCategoryChange(event) {
    //     setSelectedCategory(event.target.value);
    // }


    return (
        <nav className="categories">

            <ul>

                <li><Link to="/category/all">All</Link></li>
                <li><Link to="/category/cats">Cats</Link></li>
                <li><Link to="/category/dogs">Dogs</Link></li>
                <li><Link to="/category/parrots">Parrots</Link></li>
                <li><Link to="/category/horses">Horses</Link></li>
                <li><Link to="/category/other">Other</Link></li>

            </ul>
        </nav>

    )
}

export default Categories;