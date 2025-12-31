import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MandalartEditor } from '../components/MandalartEditor';

const meta: Meta<typeof MandalartEditor> = {
  title: 'Components/MandalartEditor',
  component: MandalartEditor,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MandalartEditor>;

// 기본 에디터
export const Default: Story = {};
