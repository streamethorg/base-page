import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Page } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const organizationSlug =
  process.env.NEXT_PUBLIC_ORGANIZATION || ''

export const organizationId = process.env.NEXT_PUBLIC_ORGANIZATION_ID || ''
export const pages: Page[] = [
  {
    name: 'MAIN',
    href: 'main',
    bgColor: 'bg-muted',
  },
  {
    name: 'COLLECTIONS',
    href: 'collections',
    bgColor: 'bg-muted',
  },
  {
    name: 'ALL VIDEOS',
    href: 'videos',
    bgColor: 'bg-muted',
  },
]
