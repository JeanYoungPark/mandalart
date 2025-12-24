import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Grid } from '../components/Grid';

const meta: Meta<typeof Grid> = {
  title: 'Components/Grid',
  component: Grid,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

// 빈 그리드
export const Empty: Story = {
  args: {
    values: Array.from({ length: 9 }, () => Array(9).fill('')),
  },
};

// 중앙 블록에 값이 있는 그리드
export const WithCenterValues: Story = {
  args: {
    values: Array.from({ length: 9 }, (_, blockIndex) =>
      blockIndex === 4
        ? ['건강', '학습', '재정', '관계', '2025 목표', '취미', '커리어', '마음', '환경']
        : Array(9).fill('')
    ),
  },
};
