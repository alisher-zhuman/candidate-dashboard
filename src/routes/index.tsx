import { createBrowserRouter, Navigate } from 'react-router-dom';
import { CandidatesPage } from '../pages/CandidatesPage';
import { CandidateDetailPage } from '../pages/CandidateDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/candidates" replace />,
  },
  {
    path: '/candidates',
    element: <CandidatesPage />,
  },
  {
    path: '/candidate/:id',
    element: <CandidateDetailPage />,
  },
  {
    path: '*',
    element: <div>404 — Страница не найдена</div>,
  },
]);
