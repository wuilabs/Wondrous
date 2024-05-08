import type { Meta, StoryObj } from '@storybook/react'
import Chip from '../src/Chip'

const meta: Meta<typeof Chip> = {
  title: 'Wondrous/Chip',
  component: Chip,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Chip>

export const Primary: Story = {
  args: {
    children: 'Chip',
    size: 'md',
  },
}
