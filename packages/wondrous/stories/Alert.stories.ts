import type { Meta, StoryObj } from '@storybook/react'
import Alert from '../src/Alert'

const meta: Meta<typeof Alert> = {
  title: 'Wondrous/Alert',
  component: Alert,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Basic: Story = {
  args: {
    children: 'This is a Wondrous UI Alert — check it out!',
  },
}

export const Primary: Story = {
  args: {
    children: 'This is primary Alert - check it out!',
    color: 'primary',
  },
}
