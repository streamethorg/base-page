import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Page } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const organizationSlug =
  process.env.NEXT_PUBLIC_ORGANIZATION || ''

export const organizationId =
  process.env.NEXT_PUBLIC_ORGANIZATION_ID || ''
export const pages: Page[] = [
  {
    name: 'EXPLORE',
    href: 'main',
    bgColor: 'bg-muted',
  }
]
