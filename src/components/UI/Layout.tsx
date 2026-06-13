import { useLocation, useNavigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate("/candidates")}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-150"
          >
            <img src="/icons/logo.svg" alt="logo" className="w-7 h-7" />
            <span className="font-semibold text-slate-900">Candidate Dashboard</span>
          </button>
          <span className="text-sm text-slate-400">HR Dashboard</span>
        </div>
      </header>
      <div key={pathname} className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 animate-fade-in">
        {children}
      </div>
    </div>
  );
};
