interface MessageStateAction {
  label: string;
  onClick: () => void;
}

interface MessageStateProps {
  title: string;
  code?: string;
  description?: string;
  action?: MessageStateAction;
}

// Центрированное состояние-заглушка: 404, "не найдено" и т.п.
export const MessageState = ({
  title,
  code,
  description,
  action,
}: MessageStateProps) => (
  <div className="text-center py-24">
    {code && <p className="text-7xl font-bold text-slate-200 mb-4">{code}</p>}

    <h2 className="text-xl font-semibold text-slate-900 mb-2">{title}</h2>

    {description && (
      <p className="text-slate-500 mb-8 text-sm">{description}</p>
    )}

    {action && (
      <button
        onClick={action.onClick}
        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
      >
        {action.label}
      </button>
    )}
  </div>
);
