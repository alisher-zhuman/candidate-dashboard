import type {
  CandidateStatus,
  SortField,
  SortOrder,
  VerdictClass,
  VerdictFilter,
} from "../types/candidate";

export const ALL_VERDICTS = "Все" as const;

// Лейблы статусов — единственный источник для select, тостов и бейджа
export const STATUS_LABELS: Record<CandidateStatus, string> = {
  new: "Новый",
  review: "На рассмотрении",
  invited: "Приглашён",
  rejected: "Отклонён",
};

export const STATUS_OPTIONS = Object.keys(STATUS_LABELS) as CandidateStatus[];

export const STATUS_BADGE_CLASS: Record<CandidateStatus, string> = {
  new: "bg-slate-100 text-slate-600",
  review: "bg-blue-50 text-blue-700",
  invited: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-600",
};

// Цвет бейджа вердикта — по vc-классу из данных кандидата
export const VERDICT_BADGE_CLASS: Record<VerdictClass, string> = {
  "verdict-green": "bg-emerald-50 text-emerald-700",
  "verdict-orange": "bg-amber-50 text-amber-700",
  "verdict-red": "bg-red-50 text-red-600",
};

// Опции фильтра по вердикту + цвет активной кнопки
export const VERDICTS: VerdictFilter[] = [
  ALL_VERDICTS,
  "ПОДХОДИТ",
  "ЧАСТИЧНО",
  "НЕ СООТВЕТСТВУЕТ",
];

export const VERDICT_FILTER_CLASS: Record<VerdictFilter, string> = {
  [ALL_VERDICTS]: "bg-slate-900 text-white",
  ПОДХОДИТ: "bg-emerald-600 text-white",
  ЧАСТИЧНО: "bg-amber-500 text-white",
  "НЕ СООТВЕТСТВУЕТ": "bg-red-500 text-white",
};

export const SORT_OPTIONS: { value: SortField; label: string }[] = [
  { value: "createdAt", label: "По дате" },
  { value: "name", label: "По имени" },
  { value: "total_exp", label: "По опыту" },
];

// Валидные значения для проверки query-параметров — выводим из источников выше
export const SORT_FIELDS = SORT_OPTIONS.map((o) => o.value);
export const SORT_ORDERS: SortOrder[] = ["asc", "desc"];

// Дефолты фильтров — общий источник для стора и URL-синхронизации
export const DEFAULT_FILTERS = {
  search: "",
  verdict: ALL_VERDICTS,
  sortField: "createdAt",
  sortOrder: "desc",
  page: 1,
} satisfies {
  search: string;
  verdict: VerdictFilter;
  sortField: SortField;
  sortOrder: SortOrder;
  page: number;
};
