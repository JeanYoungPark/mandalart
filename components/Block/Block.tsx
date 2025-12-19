import { Cell } from '../Cell';
import { BlockProps } from './Block.types';

export const Block = ({
  values,
  onChange,
  isCenter = false,
  disabled = false,
}: BlockProps) => {
  return (
    <div className={`
      grid grid-cols-3 gap-0.5 p-1.5 rounded-xl
      ${isCenter ? 'bg-slate-300' : 'bg-slate-200'}
    `}>
      {Array.from({ length: 9 }).map((_, index) => (
        <Cell
          key={index}
          value={values[index] || ''}
          onChange={(value) => onChange?.(index, value)}
          isCenter={index === 4}
          isMainCenter={isCenter && index === 4}
          disabled={disabled}
        />
      ))}
    </div>
  );
};
