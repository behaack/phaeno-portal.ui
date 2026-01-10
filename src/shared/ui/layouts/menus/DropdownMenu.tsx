import { useEffect, useMemo, useRef } from 'react'
import { Burger, Collapse } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { authLogout } from '@/auth/auth.logout'
import { CanRole } from '@/auth/CanRole'
import { IHandles, SettingsPageModal } from '@/features/settings/SettingsPage.Modal'
import { useDeviceSize } from '@/shared/hooks/useDeviceSize'
import { CurrentUser } from '../components/CurrentUser'
import { SelectedCustomer } from '../components/SelectedCustomer'
import { Subtype } from '../types/IMenuListItem'
import { userMenuList } from './menu-lists/menuList'
import { MenuItem } from './MenuItem'

export interface IProps {
  baseRoute: string
}

export function DropdownMenu({ baseRoute }: IProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const [width] = useDeviceSize()
  const [opened, { close, toggle }] = useDisclosure(false)
  const settingsModal = useRef<IHandles>(null)

  const buttonHndl = (buttonType: Subtype) => {
    toggle()
    switch (buttonType) {
      case 'settings':
        settingsModal.current?.open()
        return
      case 'signout':
        authLogout()
        return
      default:
        break
    }
  }

  const filteredMenuList = useMemo(() => {
    const isNarrow = width < 575

    return userMenuList.filter((item) => {
      let retValue = false
      retValue = isNarrow ? true : !item.isMain
      return retValue
    })
  }, [width]) //[width, showManageUser, showApiKeys]);

  useEffect(() => {
    if (!opened || !menuRef.current) {
      return
    }

    const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href]:not([tabindex="-1"]), button:not([disabled])'
    )

    const first = focusableElements[0]
    const last = focusableElements[focusableElements.length - 1]

    first?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      const elements = Array.from(focusableElements)
      const index = elements.indexOf(document.activeElement as HTMLElement)

      if (e.key === 'Escape') {
        close()
        burgerRef.current?.focus()
      }

      if (e.key === 'Tab' && focusableElements.length > 0) {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        const nextIndex = (index + 1) % focusableElements.length
        focusableElements[nextIndex].focus()
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        const prevIndex = (index - 1 + focusableElements.length) % focusableElements.length
        focusableElements[prevIndex].focus()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !burgerRef.current?.contains(e.target as Node)
      ) {
        close()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [opened, close])

  return (
    <nav className="relative">
      <SettingsPageModal ref={settingsModal} />
      <Burger
        ref={burgerRef}
        className="menu-burger"
        color="black"
        opened={opened}
        lineSize={baseRoute === 'manage-users' ? 4 : 2}
        onClick={toggle}
        aria-label="Toggle navigation"
      />
      <div ref={menuRef} className="dropdown-menu-container">
        <Collapse in={opened} transitionDuration={150} transitionTimingFunction="linear">
          <div>
            <div className="bg-black">
              <CurrentUser />
              <CanRole role={['phaeno-admin', 'phaeno-user']}>
                <SelectedCustomer onSelectCustomer={() => close()} />
              </CanRole>
            </div>
            <ul className="dropdown-menu">
              {filteredMenuList.map((item) => (
                <CanRole key={item.index} role={item.roles}>
                  <MenuItem item={item} onClick={() => buttonHndl(item.subtype)} />
                </CanRole>
              ))}
            </ul>
          </div>
        </Collapse>
      </div>
    </nav>
  )
}
