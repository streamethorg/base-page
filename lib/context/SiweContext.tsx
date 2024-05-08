'use client'

import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { PropsWithChildren } from 'react'
import { http, createConfig, WagmiProvider } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [baseSepolia, base],
    transports: {
      // RPC URL for each chain
      [baseSepolia.id]: http(
        process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || ''
      ),
      [base.id]: http(),
    },
    ssr: true,
    // Required API Keys
    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,

    // Required App Info
    appName: 'Base',

    // Optional App Info
    appDescription: 'Base',
    appUrl: 'https://base-page-kappa.vercel.app/', // your app's url
    appIcon: 'https://base-page-kappa.vercel.app//logo.png', // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
)

const queryClient = new QueryClient()

const SiweContext = (props: PropsWithChildren) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{props.children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default SiweContext
