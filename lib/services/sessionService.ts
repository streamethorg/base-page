import { IExtendedSession } from '../types'
import { apiUrl } from '@/lib/utils/utils'
import { Livepeer } from 'livepeer'
import { ISession } from '../interfaces/session.interface'
import { revalidatePath } from 'next/cache'
import { IPagination } from '../types'
import { Asset } from 'livepeer/dist/models/components'

interface ApiParams {
  event?: string;
  organizationId?: string;
  stageId?: string;
  page?: number;
  size?: number;
  onlyVideos?: boolean;
  published?: string;
  speakerIds?: string[];
  itemDate?: string;
  type?: string;
  itemStatus?: string;
  clipable?: boolean;
}

function constructApiUrl(baseUrl: string, params: ApiParams): string {
  const queryParams = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      const formattedValue = Array.isArray(value) ? value.join(',') : value;
      return `${encodeURIComponent(key)}=${encodeURIComponent(formattedValue)}`;
    })
    .join('&');
  return `${baseUrl}?${queryParams}`;
}

export async function fetchAllSessions({
  event,
  organizationId,
  stageId,
  speakerIds,
  onlyVideos,
  published,
  page = 1,
  limit,
  searchQuery = '',
  type,
  itemStatus,
  itemDate,
  clipable,
}: {
  event?: string;
  organizationId?: string;
  stageId?: string;
  speakerIds?: string[];
  onlyVideos?: boolean;
  published?: string;
  page?: number;
  limit?: number;
  searchQuery?: string;
  type?: string;
  itemStatus?: string;
  itemDate?: string;
  clipable?: boolean;
}): Promise<{
  sessions: IExtendedSession[];
  pagination: IPagination;
}> {
  const params: ApiParams = {
    event,
    organizationId,
    stageId,
    page,
    size: searchQuery ? 0 : limit,
    onlyVideos,
    published,
    speakerIds,
    type,
    itemStatus,
    itemDate,
    clipable,
  };
  const response = await fetch(
    constructApiUrl(`${apiUrl()}/sessions`, params),
    {
      cache: 'no-cache',
      next: {
        tags: [`sessions-${organizationId}`],
      },
    }
  );
  const a = await response.json();
  if (a.status === 500) {
    return {
      sessions: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        limit: 0,
      },
    };
  }
  return a.data;
}

export const fetchAsset = async ({
  assetId,
}: {
  assetId: string;
}): Promise<Asset | null> => {
  try {
    const response = await fetch(`${apiUrl()}/streams/asset/${assetId}`, {
      next: { revalidate: 100 },
    });
    if (!response.ok) {
      console.log('error in fetchAsset', await response.json())
      return null;
    }

    const data = await response.json();
    console.log('data fetchAsset', data)
    return data.data;
  } catch (e) {
    console.log(e);
    throw 'Error fetching event session';
  }
};

export const createSession = async ({
  session,
  authToken,
}: {
  session: ISession
  authToken: string
}): Promise<ISession> => {
  try {
    const response = await fetch(`${apiUrl()}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(session),
    })
    if (!response.ok) {
      console.log('error in createSession', await response.json())
      throw 'Error updating session'
    }
    revalidatePath('/studio')
    return (await response.json()).data
  } catch (e) {
    console.log('error in updateSession', e)
    throw e
  }
}
export const fetchSession = async ({
  session,
}: {
  session: string;
}): Promise<IExtendedSession | null> => {
  try {
    const response = await fetch(`${apiUrl()}/sessions/${session}`, {
      cache: 'no-store',
    });
    if (!response.ok) {
      return null;
    }
    const data: IExtendedSession = (await response.json()).data;
    return data;
  } catch (e) {
    console.log(e);
    throw 'Error fetching event session';
  }
};


export const updateSession = async ({
  session,
  authToken,
}: {
  session: IExtendedSession
  authToken: string
}): Promise<ISession> => {
  const modifiedSession = (({ _id, slug, autoLabels, ...rest }) =>
    rest)(session)

  try {
    const response = await fetch(
      `${apiUrl()}/sessions/${session._id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(modifiedSession),
      }
    )
    if (!response.ok) {
      console.log('error in updateSession', await response.json())
      throw 'Error updating session'
    }
    return (await response.json()).data
  } catch (e) {
    console.log('error in updateSession', e)
    throw e
  }
}

export const deleteSession = async ({
  sessionId,
  organizationId,
  authToken,
}: {
  sessionId: string
  organizationId: string
  authToken: string
}) => {
  try {
    const response = await fetch(
      `${apiUrl()}/sessions/${sessionId}`,
      {
        method: 'DELETE',
        body: JSON.stringify({ organizationId }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      }
    )

    if (!response.ok) {
      console.log('error in deleteSession', await response.json())
      throw 'Error deleting session'
    }
    return await response.json()
  } catch (e) {
    console.log('error in deleteSession', e)
    throw e
  }
}
