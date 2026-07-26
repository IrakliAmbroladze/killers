type TaskCardProps = {
  title: string | null;
  description: string | null;
};

export function TaskCard({ title, description }: TaskCardProps) {
  return (
    <div>
      <p className="font-medium">{title ?? "Untitled task"}</p>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
