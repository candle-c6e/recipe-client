import { ResponseServer } from "../types"

export const client = async (path: string, data?: any, otherHeaders?: any): Promise<ResponseServer> => {
  let headers: any = {}
  let body: any = null

  if (path === 'uploads') {
    body = data
  } else {
    headers = { 'Content-Type': 'application/json' }
    body = JSON.stringify({ ...data })
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
    method: data ? 'POST' : 'GET',
    credentials: 'include',
    headers,
    ...otherHeaders,
    body
  })

  return response.json()
}