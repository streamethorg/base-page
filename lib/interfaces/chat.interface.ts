export interface IFrom {
  identity: string
}

export interface IChat {
  stageId: string
  message: string
  from: IFrom
  timestamp: number
}
