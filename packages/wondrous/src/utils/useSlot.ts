import * as React from 'react'
import { ClassValue } from 'clsx'

interface SlotOptions {
  /**
   * Component ClassName
   */
  className: ClassValue | ClassValue[]
}

export default function useSlot<ElementType extends React.ElementType>(
  component: ElementType,
  options: any
) {
  return [component, options] as [ElementType, any]
}
