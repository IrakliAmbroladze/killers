export const InputDate = ({
  name,
  value,
  defaultValue,
  handleChange,
}: {
  name: string;
  value?: string;
  defaultValue?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type="date"
      name={name}
      {...(value !== undefined ? { value } : { defaultValue })}
      className="bg-stone-100 dark:bg-stone-500 text-stone-800 dark:text-gray-200 px-4 py-0.5 rounded-lg"
      onChange={handleChange}
    />
  );
};
