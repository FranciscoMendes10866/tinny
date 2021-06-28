export interface Token {
  _id: string
  iat: number
  exp: number
}

export interface getPayloadTypes {
  isExpired: boolean
  payload: Token
}
