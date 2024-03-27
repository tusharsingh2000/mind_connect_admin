export type FAQ = {
  _id: string
  question: string
  answer: string
  type: string
}

export type DODON = {
  _id: string
  type: number
  heading: string
  description: string
}

export type QUERY = {
  _id: string
  name: string
  email: string
  message: string
  userId: {
    _id: string
    avatar_url: string
    email: string
    firstName: string
    lastName: string
    role: string
  }
  createdAt: string
}
