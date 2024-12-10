import Link from 'next/link'

import { UserButton } from './user-button'

export function Header() {
  return (
    <header className="flex w-full items-center justify-between bg-primary-foreground p-4">
      <div className="flex items-center space-x-4">
        <Link
          href="/"
          className="rounded px-3 py-2 text-primary hover:bg-secondary-foreground hover:text-secondary"
        >
          Home
        </Link>
      </div>

      <UserButton />
    </header>
  )
}
