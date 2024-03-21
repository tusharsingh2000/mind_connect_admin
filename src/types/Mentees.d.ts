export interface Mentees {
  _id: string
  firstName: string
  lastName: string
  email: string
  isBlocked: boolean
  createdAt: string
  avatar_url: string
}

export interface Mentee {
  _id: string
  aboutYou: {
    qus: string
    answer: string
  }[]
  bankStatement: string[]
  createdAt: Date
  location: {
    country: string
    state: string
    city: string
    pinCode: string
    address: string
  }
  nomination: string[]
  social: {
    type: string
    link: string
  }[]
  status: number
  step: number
  updatedAt: Date
  userId: {
    allowedSessions: number
    _id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    countryCode: string
    countryCodeIso: string
    password: string
    role: string
    isBlocked: boolean
    isDeleted: boolean
    phone_verified: boolean
    language: string[]
    jti: string[]
    isApprovedView: boolean
    userNo: number
    createdAt: Date
    updatedAt: Date
    __v: number
    avatar_url: string
    dob: Date
    mentor: {
      firstName: string
      lastName: string
    }
    active: boolean
    timeZone: string
  }
  companyInfo: {
    name: string
    industryType: string
    companyType: string
    doe: Date
    noOfEmployee: string
    turnOver: string
    profit: string
    questions: {
      qus: string
      answer: string
    }[]
  }
  companyLocation: {
    country: string
    state: string
    city: string
    pinCode: string
    address: string
  }
  cv: string
  businessPlan: string
  certificateOfIncorp: string
  vatCertificate: string
  vatReturn: string
  cocAccept: boolean
  eSign: string
}
