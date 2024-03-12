// ** MUI Imports

import { Button } from '@mui/material'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'

const GoBackButton = () => {
  const router = useRouter()
  return (
    <Button onClick={() => router.back()} startIcon={<Icon icon='bi:arrow-left' />}>
      Back
    </Button>
  )
}

export default GoBackButton
