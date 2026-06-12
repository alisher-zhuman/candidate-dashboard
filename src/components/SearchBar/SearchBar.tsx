import { useFiltersStore } from '../../store/filtersStore';

export const SearchBar = () => {
  const search = useFiltersStore(state => state.search);
  const setSearch = useFiltersStore(state => state.setSearch);

  return (
    <input
      type="text"
      value={search}
      onChange={e => setSearch(e.target.value)}
      placeholder="Поиск по ФИО..."
      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  );
};
