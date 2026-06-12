import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFiltersStore } from '../store/filtersStore';
import type { Verdict } from '../types/candidate';

type SortField = 'name' | 'total_exp' | 'createdAt';
type SortOrder = 'asc' | 'desc';

const VERDICTS: (Verdict | 'Все')[] = ['Все', 'ПОДХОДИТ', 'ЧАСТИЧНО', 'НЕ СООТВЕТСТВУЕТ'];
const SORT_FIELDS: SortField[] = ['name', 'total_exp', 'createdAt'];
const SORT_ORDERS: SortOrder[] = ['asc', 'desc'];

export const useUrlFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useFiltersStore(state => state.search);
  const verdict = useFiltersStore(state => state.verdict);
  const sortField = useFiltersStore(state => state.sortField);
  const sortOrder = useFiltersStore(state => state.sortOrder);
  const page = useFiltersStore(state => state.page);

  const setSearch = useFiltersStore(state => state.setSearch);
  const setVerdict = useFiltersStore(state => state.setVerdict);
  const setSortField = useFiltersStore(state => state.setSortField);
  const setSortOrder = useFiltersStore(state => state.setSortOrder);
  const setPage = useFiltersStore(state => state.setPage);

  // Читаем из URL при маунте
  useEffect(() => {
    const urlSearch = searchParams.get('search') ?? '';
    const urlVerdict = searchParams.get('verdict') ?? 'Все';
    const urlSortField = searchParams.get('sortField') ?? 'createdAt';
    const urlSortOrder = searchParams.get('sortOrder') ?? 'desc';
    const urlPage = Number(searchParams.get('page') ?? '1');

    if (urlSearch) setSearch(urlSearch);
    if (VERDICTS.includes(urlVerdict as Verdict | 'Все')) setVerdict(urlVerdict as Verdict | 'Все');
    if (SORT_FIELDS.includes(urlSortField as SortField)) setSortField(urlSortField as SortField);
    if (SORT_ORDERS.includes(urlSortOrder as SortOrder)) setSortOrder(urlSortOrder as SortOrder);
    if (!isNaN(urlPage) && urlPage > 0) setPage(urlPage);
  }, []);

  // Пишем в URL при изменении фильтров
  useEffect(() => {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (verdict !== 'Все') params.verdict = verdict;
    if (sortField !== 'createdAt') params.sortField = sortField;
    if (sortOrder !== 'desc') params.sortOrder = sortOrder;
    if (page > 1) params.page = String(page);
    setSearchParams(params, { replace: true });
  }, [search, verdict, sortField, sortOrder, page]);
};
