export enum NftCollectionType {
  single = 'single',
  multiple = 'multiple',
}
export interface INftCollection {
  _id?: string
  name: string
  description?: string
  thumbnail?: string
  type?: NftCollectionType
  organizationId?: string
  videos?: {
    index?: number
    type: string
    sessionId?: string
    stageId?: string
    ipfsURI?: string
  }[]
  contractAddress?: string
  ipfsPath?: string
}
