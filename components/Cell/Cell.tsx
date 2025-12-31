import { CellProps } from './Cell.types';

export const Cell = ({
  value = '',
  onChange,
  isCenter = false,
  isMainCenter = false,
  placeholder = '',
  disabled = false
}: CellProps) => {
  const getCellStyle = () => {
    if (isMainCenter) {
      return 'bg-slate-600 dark:bg-slate-500 border border-slate-700 dark:border-slate-400';
    }
    if (isCenter) {
      return 'bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600';
    }
    return 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600';
  };

  const getTextStyle = () => {
    if (isMainCenter) {
      return 'font-semibold text-white placeholder:text-slate-300';
    }
    if (isCenter) {
      return 'font-medium text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500';
    }
    return 'text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500';
  };

  return (
    <div
      className={`
        w-full aspect-square flex items-center justify-center
        rounded-lg p-1
        ${getCellStyle()}
      `}
    >
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full h-full resize-none text-center text-xs
          bg-transparent outline-none
          leading-tight pt-[35%]
          ${getTextStyle()}
          ${disabled ? 'cursor-default' : 'cursor-text'}
        `}
      />
    </div>
  );
};
