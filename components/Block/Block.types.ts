export interface BlockProps {
  values: string[];
  onChange?: (index: number, value: string) => void;
  isCenter?: boolean;
  disabled?: boolean;
}
