function OutlinedField({
  id,
  label,
  value,
  error,
  alwaysFloat = false,
  as: Tag = 'input',
  children,
  ...props
}) {
  const hasValue = value !== '' && value !== null && value !== undefined;
  const floated = alwaysFloat || hasValue || Tag === 'select';

  return (
    <div>
      <div className="relative">
        {floated && (
          <label
            htmlFor={id}
            className="absolute -top-2.5 left-3 z-10 bg-white px-1 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400"
          >
            {label}
          </label>
        )}
        <Tag
          id={id}
          value={value}
          aria-label={label}
          placeholder={Tag === 'input' && !floated ? label : undefined}
          className="w-full rounded-md border border-slate-400 bg-transparent px-4 py-3 text-base text-slate-900 placeholder:text-slate-500 focus:border-cyan-700 focus:outline-none focus:ring-1 focus:ring-cyan-700 dark:border-slate-500 dark:text-slate-100 dark:placeholder:text-slate-400"
          {...props}
        >
          {children}
        </Tag>
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default OutlinedField;
