import { forwardRef } from "react"
import {
  Tabs as MantineTabs,
  type TabsProps as MantineTabsProps,
  type TabsListProps as MantineTabsListProps,
  type TabsTabProps as MantineTabsTabProps,
  type TabsPanelProps as MantineTabsPanelProps,
} from "@mantine/core"
import type { ComponentPropsWithoutRef, ReactNode } from "react"

export interface PTabsProps
  extends MantineTabsProps,
    Omit<ComponentPropsWithoutRef<"div">, keyof MantineTabsProps> {
  children?: ReactNode
  padded?: boolean
}

/**
 * PTabs
 * - Wrapper around Mantine Tabs
 * - Adds optional `padded` prop to apply consistent padding to the root container.
 *
 * Usage:
 * <PTabs defaultValue="a" padded>
 *   <PTabsList>
 *     <PTabsTab value="a">A</PTabsTab>
 *   </PTabsList>
 *   <PTabsPanel value="a">...</PTabsPanel>
 * </PTabs>
 */
export const PTabs = forwardRef<HTMLDivElement, PTabsProps>(
  ({ children, padded, ...props }, ref) => {
    return (
      <MantineTabs
        ref={ref}
        p={padded ? "md" : (props as any).p}
        {...props}
      >
        {children}
      </MantineTabs>
    )
  }
)

PTabs.displayName = "PTabs"

// -----------------------------------------------------------------------------
// Subcomponents (re-exported with the same names)
// -----------------------------------------------------------------------------

export type PTabsListProps = MantineTabsListProps
export const PTabsList = MantineTabs.List

export type PTabsTabProps = MantineTabsTabProps
export const PTabsTab = MantineTabs.Tab

export type PTabsPanelProps = MantineTabsPanelProps
export const PTabsPanel = MantineTabs.Panel

// Optional namespace-style API: PTabs.List / PTabs.Tab / PTabs.Panel
;(PTabs as any).List = PTabsList
;(PTabs as any).Tab = PTabsTab
;(PTabs as any).Panel = PTabsPanel
