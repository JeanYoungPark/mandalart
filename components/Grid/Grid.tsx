import { Block } from '../Block';
import { GridProps } from './Grid.types';

export const Grid = ({ values, onChange, disabled = false }: GridProps) => {
  // 블록 순서: 0-8 (왼쪽 위부터 오른쪽으로)
  // 중앙 블록은 index 4
  return (
    <div className="grid grid-cols-3 gap-2 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-2xl shadow-lg h-[70vh] aspect-square">
      {Array.from({ length: 9 }).map((_, blockIndex) => (
        <Block
          key={blockIndex}
          values={values[blockIndex] || []}
          onChange={(cellIndex, value) => onChange?.(blockIndex, cellIndex, value)}
          isCenter={blockIndex === 4}
          disabled={disabled}
        />
      ))}
    </div>
  );
};
