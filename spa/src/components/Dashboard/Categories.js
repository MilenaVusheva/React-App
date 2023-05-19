const Categories = ({ selectedCategory, setSelectedCategory }) => {
    const defaultCategories = [
        'cat',
        'dog',
        'parrot',
        'horse',
        'other',
    ];
    const handleCategoryChange = ({ currentTarget: input }) => {
        if (input.checked) {
            const state = [...selectedCategory, input.value]
            setSelectedCategory(state)
        } else {
            const state = selectedCategory.filter((val) => val !== input.value)
            setSelectedCategory(state)
        };
    }
    return (
        <div className={style.categoryContainer}>
            <p> Filter by Category: </p>
            {defaultCategories.map((category) => (
      <div key={category}  className={style.checked}>
      < input
      type="checkbox"
      value={category}
      onChange={handleCategoryChange}
  />
   <p className={style.text}> {category} </p>
  </div>
    ))}
</div>
)
};
export default Categories;
