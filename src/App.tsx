import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CandidatesPage } from './pages/CandidatesPage';
import { CandidateDetailPage } from './pages/CandidateDetailPage';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/candidates" replace />} />
        <Route path="/candidates" element={<CandidatesPage />} />
        <Route path="/candidate/:id" element={<CandidateDetailPage />} />
        <Route path="*" element={<div>404 — Страница не найдена</div>} />
      </Routes>
    </BrowserRouter>
  );
};
