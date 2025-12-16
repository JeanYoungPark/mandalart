import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Cell } from '../components/Cell';

const meta: Meta<typeof Cell> = {
  title: 'Components/Cell',
  component: Cell,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Cell>;

// 기본 셀
export const Default: Story = {
  args: {
    placeholder: '목표 입력',
  },
};

// 값이 있는 셀
export const WithValue: Story = {
  args: {
    value: '운동하기',
  },
};

// 중앙 셀 (메인 목표)
export const Center: Story = {
  args: {
    value: '건강해지기',
    isCenter: true,
  },
};
