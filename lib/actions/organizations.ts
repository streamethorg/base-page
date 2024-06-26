'use server'
import {
  createOrganization,
  updateOrganization,
} from '@/lib/services/organizationService'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { IOrganization } from '../interfaces/organization.interface'
import { redirect } from 'next/navigation'
import { IExtendedOrganization } from '../types'

export const createOrganizationAction = async ({
  organization,
}: {
  organization: IOrganization
}) => {
  const authToken = cookies().get('user-session')?.value
  if (!authToken) {
    throw new Error('No user session found')
  }
  const response = await createOrganization({
    organization: organization,
    authToken,
  })

  if (!response) {
    throw new Error('Error creating organization')
  }
  revalidatePath('/studio')
  return response
}

export const updateOrganizationAction = async ({
  organization,
}: {
  organization: IExtendedOrganization
}) => {
  const authToken = cookies().get('user-session')?.value
  if (!authToken) {
    throw new Error('No user session found')
  }
  const response = await updateOrganization({
    organization: organization,
    authToken,
  })

  if (!response) {
    throw new Error('Error updating organization')
  }
  revalidatePath('/studio')
  return response
}
