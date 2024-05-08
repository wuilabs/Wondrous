import * as React from 'react'

export type AlertSlot = 'root' | 'startDecorator' | 'endDecorator'

export interface AlertSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType
  /**
   * The component that renders the start decorator.
   * @default 'span'
   */
  startDecorator?: React.ElementType
  /**
   * The component that renders the end decorator.
   * @default 'span'
   */
  endDecorator?: React.ElementType
}

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color?: 'neutral' | 'primary' | 'danger' | 'info' | 'success' | 'warning'
  /**
   * Element placed after the children.
   */
  endDecorator?: React.ReactNode
  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role?: string
  /**
   * The size of the component.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Element placed before the children.
   */
  startDecorator?: React.ReactNode
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'soft'
   */
  variant?: 'plain' | 'outlined' | 'soft' | 'solid'
}
