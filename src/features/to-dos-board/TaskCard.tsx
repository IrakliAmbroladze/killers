type TaskCardProps = {
  title: string | null;
  description: string | null;
};

export function TaskCard({ title, description }: TaskCardProps) {
  return (
    <div className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-500">
      <h3 className="mb-2 line-clamp-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        {title ?? "Untitled task"}
      </h3>

      {description ? (
        <p className="line-clamp-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {description}
        </p>
      ) : (
        <p className="italic text-sm text-slate-400 dark:text-slate-500">
          No description
        </p>
      )}
    </div>
  );
}
