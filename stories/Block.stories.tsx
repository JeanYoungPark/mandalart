import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Block } from '../components/Block';

const meta: Meta<typeof Block> = {
  title: 'Components/Block',
  component: Block,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '250px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Block>;

// 기본 블록 (빈 상태)
export const Default: Story = {
  args: {
    values: Array(9).fill(''),
  },
};

// 값이 있는 블록
export const WithValues: Story = {
  args: {
    values: ['목표1', '목표2', '목표3', '목표4', '중앙', '목표6', '목표7', '목표8', '목표9'],
  },
};

// 중앙 블록
export const CenterBlock: Story = {
  args: {
    values: ['건강', '학습', '재정', '관계', '핵심목표', '취미', '커리어', '마음', '환경'],
    isCenter: true,
  },
};

// 비활성화된 블록
export const Disabled: Story = {
  args: {
    values: ['목표1', '목표2', '목표3', '목표4', '중앙', '목표6', '목표7', '목표8', '목표9'],
    disabled: true,
  },
};
