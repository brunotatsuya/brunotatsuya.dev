'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

type TabsContextValue = {
  value: string
  setValue: (value: string) => void
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

type TabsProps = React.HTMLAttributes<HTMLDivElement> & {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    { className, defaultValue, value, onValueChange, orientation, ...props },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      defaultValue ?? ''
    )
    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue

    const setValue = React.useCallback(
      (next: string) => {
        if (!isControlled) {
          setInternalValue(next)
        }
        onValueChange?.(next)
      },
      [isControlled, onValueChange]
    )

    return (
      <TabsContext.Provider value={{ value: currentValue, setValue }}>
        <div
          ref={ref}
          data-orientation={orientation ?? 'horizontal'}
          className={cn('flex flex-col gap-4', className)}
          {...props}
        />
      </TabsContext.Provider>
    )
  }
)
Tabs.displayName = 'Tabs'

const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="tablist"
      className={cn(
        'border-border/70 bg-card/60 flex flex-wrap items-center gap-2 rounded-full border p-1',
        className
      )}
      {...props}
    />
  )
)
TabsList.displayName = 'TabsList'

type TabsTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => {
    const context = React.useContext(TabsContext)
    if (!context) {
      throw new Error('TabsTrigger must be used within Tabs')
    }
    const isActive = context.value === value

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      props.onClick?.(event)
      if (!event.defaultPrevented) {
        context.setValue(value)
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        data-state={isActive ? 'active' : 'inactive'}
        tabIndex={isActive ? 0 : -1}
        className={cn(
          'text-muted-foreground hover:text-foreground rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] transition',
          'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
          className
        )}
        onClick={handleClick}
        {...props}
      />
    )
  }
)
TabsTrigger.displayName = 'TabsTrigger'

type TabsContentProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const context = React.useContext(TabsContext)
    if (!context) {
      throw new Error('TabsContent must be used within Tabs')
    }
    const isActive = context.value === value

    return (
      <div
        ref={ref}
        role="tabpanel"
        data-state={isActive ? 'active' : 'inactive'}
        hidden={!isActive}
        className={cn('focus-visible:outline-none', className)}
        {...props}
      />
    )
  }
)
TabsContent.displayName = 'TabsContent'

export { Tabs, TabsList, TabsTrigger, TabsContent }
