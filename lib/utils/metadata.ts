import { Metadata } from 'next'
import { IExtendedSession, IExtendedStage } from '../types'

const BASE_IMAGE = 'https://streameth.org/streameth_banner.png'
const appUrl = 'https://app.ufo.fm'

export const farcasterSessionMetadata = ({
  session,
}: {
  session: IExtendedSession
}): any => {
  return {
    version: 'next',
    imageUrl: session.coverImage,
    button: {
      title: 'Watch ' + session.name + ' now on ufo.fm',
      action: {
        type: 'launch_frame',
        url: appUrl + '/watch/' + session._id,
        name: 'UFO.fm',
        splashImageUrl: appUrl + '/logo.png',
        splashBackgroundColor: '#f5f0ec',
      },
    },
  }
}

export const SessionMetadata = ({
  session,
}: {
  session: IExtendedSession
}): Metadata => {
  const imageUrl = session.coverImage
    ? session.coverImage
    : BASE_IMAGE

  return {
    title: `${session.name}`,
    description: `${session.description}`,
    openGraph: {
      title: `${session.name}`,
      siteName: 'ufo.fm',
      description: `${session.description}`,
      images: {
        url: imageUrl,
        alt: 'ufo.fm Logo',
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: `${session.name}`,
      description: `${session.description}`,
      images: {
        url: imageUrl,
        alt: 'ufo.fm Logo',
      },
    },
    other: {
      'fc:frame': JSON.stringify(
        farcasterSessionMetadata({ session: session })
      ),
    },
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/en-US',
      },
    },
  }
}

export const farcasterStreamMetadata = ({
  stage,
  imageUrl,
}: {
  stage: IExtendedStage
  imageUrl: string
}): any => {
  return {
    version: 'next',
    imageUrl: imageUrl,
    button: {
      title: 'Watch now on ufo.fm',
      action: {
        type: 'launch_frame',
        url: appUrl + '/livestream/' + stage._id,
        name: 'UFO.fm',
        splashImageUrl: appUrl + '/logo.png',
        splashBackgroundColor: '#f5f0ec',
      },
    },
  }
}

export const StreamMetadata = ({
  stage,
  timeLeft = 0,
}: {
  stage: IExtendedStage
  timeLeft: number
}): Metadata => {
  const imageUrl =
    appUrl + '/og?thumbnail=' +
    stage.thumbnail +
    '&title=' +
    stage.name +
    '&timeLeft=' +
    timeLeft
  return {
    title: stage.name,
    description: stage.description,
    openGraph: {
      title: stage.name,
      description: 'Join the live stream now on ufo.fm',
      images: [imageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: stage.name,
      description: 'Join the live stream now on ufo.fm',
      images: [imageUrl],
    },
    other: {
      'fc:frame': JSON.stringify(
        farcasterStreamMetadata({ stage: stage, imageUrl: imageUrl })
      ),
    },
  }
}

export const farcasterGeneMetadata = {
  version: 'next',
  imageUrl: BASE_IMAGE,
  button: {
    title: 'Watch now on ufo.fm',
    action: {
      type: 'launch_frame',
      url: appUrl + '/',
      name: 'UFO.fm',
      splashImageUrl: appUrl + '/logo.png',
      splashBackgroundColor: '#f5f0ec',
    },
  },
}

export const generalMetadata = {
  title: 'UFO.fm',
  description:
    'UFO.fm is a platform for streaming and watching videos.',
  openGraph: {
    title: 'UFO.fm',
    description:
      'UFO.fm is a platform for streaming and watching videos.',
    images: {
      url: BASE_IMAGE,
      alt: 'UFO.fm Logo',
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UFO.fm',
    description:
      'UFO.fm is a platform for streaming and watching videos.',
    images: {
      url: BASE_IMAGE,
      alt: 'UFO.fm Logo',
    },
  },
  other: {
    'fc:frame': JSON.stringify(farcasterGeneMetadata),
  },
}
