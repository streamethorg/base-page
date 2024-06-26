'use client'

import React from 'react'
import { Globe, Share2 } from 'lucide-react'
import { Credenza, CredenzaTrigger } from '@/components/ui/crezenda'
import { ShareModalContent } from '@/components/ui/share-button'
import Link from 'next/link'
import { IExtendedOrganization } from '@/lib/types'

const ChannelShareIcons = ({
  organization,
}: {
  organization: IExtendedOrganization
}) => {
  return (
    <div className="flex justify-start items-center mt-auto space-x-4">
      <Credenza>
        <CredenzaTrigger>
          <Share2
            className="text-white text-muted-foreground"
            size={22}
          />
        </CredenzaTrigger>
        <ShareModalContent shareFor="channel" />
      </Credenza>

      {organization?.url && (
        <Link target="_blank" rel="noopener" href={organization?.url}>
          <Globe
            className="text-white text-muted-foreground"
            size={25}
          />
        </Link>
      )}
    </div>
  )
}

export default ChannelShareIcons
