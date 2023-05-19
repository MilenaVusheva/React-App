const Search = ({ setSearch }) => {
    return (
        <div className={style.searchForm}>
            <input input className={style.searchInput}
                type="text"
                placeholder ="Search ..."
                onChange={({ currentTarget: input }) => setSearch(input.value)}
            />
        </div>
    );
};
export default Search;
