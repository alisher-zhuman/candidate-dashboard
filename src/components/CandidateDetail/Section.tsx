import type { ReactNode } from "react";

import { cn } from "../../utils/cn";

interface SectionProps {
  title: ReactNode;
  className?: string;
  children: ReactNode;
}

// Переиспользуемая карточка-секция детальной страницы
export const Section = ({ title, className, children }: SectionProps) => (
  <div
    className={cn(
      "bg-white rounded-lg border border-slate-200 p-4",
      className
    )}
  >
    <h2 className="font-semibold text-slate-900 mb-3">{title}</h2>
    {children}
  </div>
);
