
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
    };
    return (
        <div>
            <p> Filter by Category: </p>
            {defaultCategories.map((category) => (
      <div key={category}>
      < input
      type="checkbox"
      value={category}
      onChange={handleCategoryChange}
  />
   <p  > {category} </p>
  </div>
    ))}
</div>
)
};
export default Categories;
