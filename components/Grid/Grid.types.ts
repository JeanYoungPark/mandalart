export interface GridProps {
  values: string[][];  // 9개 블록, 각 블록에 9개 셀
  onChange?: (blockIndex: number, cellIndex: number, value: string) => void;
}
