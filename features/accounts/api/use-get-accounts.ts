import { useQuery } from '@tanstack/react-query'

import { client } from '@/lib/hono'

export const useGetAccounts = () => {
  const query = useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      // not same as axios, this is a fetch call
      const response = await client.api.accounts.$get()

      // we need to check if the response is ok
      if (!response.ok) {
        throw new Error('Failed to fetch accounts')
      }

      // we need to parse the response as json
      const { data } = await response.json()

      return data
    }
  })
  return query
}

