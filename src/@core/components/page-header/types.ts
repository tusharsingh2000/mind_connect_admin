import { Dispatch, ReactNode, SetStateAction } from 'react'

export type PageHeaderProps = {
  title: ReactNode
  subtitle?: ReactNode
  value?: string
  hide?: boolean
  onChange?: any
  onCross?: () => void
  searchTerm: string
  paginationModel: { page: number; pageSize: number }
  setDebouncedSearchTerm: Dispatch<SetStateAction<string>>
  setPaginationModel: Dispatch<SetStateAction<{ page: number; pageSize: number }>>
}
