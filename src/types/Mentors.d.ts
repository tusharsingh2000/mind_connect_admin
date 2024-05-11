export interface Mentors {
  _id: string
  firstName: string
  lastName: string
  email: string
  isBlocked: boolean
  profileCompleted: boolean
  createdAt: string
  active: boolean
  bookingCount: number
  mentees: [
    {
      _id: string
      firstName: string
      lastName: string
      email: string
      active: boolean
      isBlocked: false
    }
  ]
  activeMenteeCount: number
}

export interface MentorDetail {
  _id: string
  about: string
  industryType: string
  revenue: string
  companies: string
  noOfEmployee: string
  topics: {
    _id: string
    name: string
    image: string
    createdAt: string
    updatedAt: string
  }[]
  mentees: {
    _id: string
    firstName: string
    lastName: string
  }[]
  createdAt: string
  updatedAt: string
  user: {
    _id: string
    firstName: string
    lastName: string
    email: string
    avatar_url: string
    phone: string
    dob: string
    language: string[]
  }
  social: [
    {
      type: string
      link: string
    }
  ]
}
