import { CellProps } from './Cell.types';

export const Cell = ({
  value = '',
  onChange,
  isCenter = false,
  isMainCenter = false,
  placeholder = ''
}: CellProps) => {
  const getCellStyle = () => {
    if (isMainCenter) {
      return 'bg-slate-600 border border-slate-700';
    }
    if (isCenter) {
      return 'bg-slate-100 border border-slate-300';
    }
    return 'bg-white hover:bg-slate-100 border border-slate-200';
  };

  const getTextStyle = () => {
    if (isMainCenter) {
      return 'font-semibold text-white placeholder:text-slate-300';
    }
    if (isCenter) {
      return 'font-medium text-slate-700 placeholder:text-slate-400';
    }
    return 'text-slate-700 placeholder:text-slate-400';
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
        className={`
          w-full h-full resize-none text-center text-xs
          bg-transparent outline-none
          leading-tight pt-[35%]
          ${getTextStyle()}
        `}
      />
    </div>
  );
};
