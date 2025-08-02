export const safeBody = (body: Record<string, any>) => {
  const response = { ...body }

  delete response.password
  delete response.samePassword
  delete response.access_token

  return response
}
