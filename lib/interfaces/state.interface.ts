export enum SheetType {
  gsheet = 'gsheet',
  pretalx = 'pretalx',
}

export enum StateStatus {
  pending = 'pending',
  completed = 'completed',
  canceled = 'canceled',
  sync = 'sync',
}

export enum StateType {
  event = 'event',
  video = 'video',
}

export interface IState {
  _id?: string
  eventId?: string
  organizationId?: string
  sessionId?: string
  eventSlug?: string
  sessionSlug?: string
  sheetType?: SheetType
  status?: StateStatus
  type?: StateType
}
