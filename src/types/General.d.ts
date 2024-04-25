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

export type TOPIC = {
  _id: string
  image: string
  name: string
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

export type SESSIONS = {
  bookingNo: number
  sessionNo: number
  recording: {
    isRecording: false
    members: number
  }
  _id: string
  bookingDate: string
  bookingTimeStart: string
  bookingTimeEnd: string
  status: number
  isRescheduled: false
  mentor: {
    _id: string
    firstName: string
    lastName: string
    email: string
    role: string
    avatar_url: string
  }
  user: {
    _id: string
    firstName: string
    lastName: string
    email: string
    role: string
    avatar_url: string
  }
  recording: {
    isRecording: boolean
    members: number
    recordingUrl: string
    resourceId: string
    sid: string
    userJoinAt: string
    mentorLeaveAt: string
    userLeaveAt: string
  }
  createdAt: string
  updatedAt: string
  __v: 0
  acceptedAt: string
}

export interface Status {
  label: string
  color: 'default' | 'success' | 'info' | 'error' | 'primary' | 'secondary' | 'warning' | undefined
}

export interface Notifications {
  _id: string
  title: string
  body: string
  isRead: boolean
  createdAt: string
}
