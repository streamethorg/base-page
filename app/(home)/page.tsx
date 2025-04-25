'use server'

import { Metadata, ResolvingMetadata } from 'next'
import { fetchOrganization } from '@/lib/services/organizationService'
import { ChannelPageParams } from '@/lib/types'
import { organizationSlug, organizationId } from '@/lib/utils'
import { pages } from '@/lib/utils'
import Navbar from '@/components/layout/Navbar'
import PlayerArea from './components/PlayerArea'
import { notFound } from 'next/navigation'
const Home = async ({ searchParams }: ChannelPageParams) => {
  if (!organizationSlug || !organizationId) return notFound()
    //await sdk.actions.ready();

  return (
    <div className="flex flex-col mx-auto w-full">
      <Navbar searchParams={searchParams} pages={pages} />
      <PlayerArea />
    </div>
  )
}

export async function generateMetadata(
  { params }: ChannelPageParams,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const organizationInfo = await fetchOrganization({
    organizationSlug: organizationSlug,
  })

  if (!organizationInfo) {
    return {
      title: 'Organization not found',
      description: 'Organization not found',
    }
  }

  const imageUrl = organizationInfo.logo
  try {
    return {
      title: organizationInfo.name,
      description: organizationInfo.description,
      openGraph: {
        images: [imageUrl],
      },
    }
  } catch (e) {
    console.log(e)
    return {
      title: organizationInfo.name,
      description: organizationInfo.description,
    }
  }
}

export default Home
