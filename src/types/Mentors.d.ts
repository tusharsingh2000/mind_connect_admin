export interface Mentors {
  _id: string
  firstName: string
  lastName: string
  email: string
  isBlocked: boolean
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
