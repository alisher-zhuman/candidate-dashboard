interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/icons/logo.svg" alt="logo" className="w-7 h-7" />
            <span className="font-semibold text-slate-900">Candidate Dashboard</span>
          </div>
          <span className="text-sm text-slate-400">HR Dashboard</span>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </div>
    </div>
  );
};
