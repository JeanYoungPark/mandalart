import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Header } from '../components/Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

// 비로그인 상태
export const LoggedOut: Story = {
  args: {
    isLoggedIn: false,
  },
};

// 로그인 상태
export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
  },
};
