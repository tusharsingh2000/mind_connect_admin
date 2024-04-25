import { useEffect } from 'react'

// ** MUI Imports
import { Icon } from '@iconify/react'
import { Box, InputAdornment, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import CustomTextField from '../mui/text-field'

// ** Types
import { PageHeaderProps } from './types'

const PageHeader = (props: PageHeaderProps) => {
  // ** Props
  const {
    title,
    subtitle,
    searchTerm,
    setDebouncedSearchTerm,
    onChange,
    paginationModel,
    setPaginationModel,
    value,
    hide
  } = props

  useEffect(() => {
    if (searchTerm) {
      const delay = 1000 // Debounce delay in milliseconds
      const timerId = setTimeout(() => {
        setDebouncedSearchTerm(searchTerm)
        setPaginationModel({
          page: 0,
          pageSize: paginationModel.pageSize
        })
      }, delay)

      return () => {
        clearTimeout(timerId) // Clear the timeout on cleanup
      }
    }
  }, [searchTerm])

  return (
    <Grid margin='2px 5px' container spacing={6}>
      <Grid item xs={8}>
        <Typography fontSize={32} fontWeight={700}>
          {title}
        </Typography>
        {subtitle || null}
      </Grid>
      <Grid item xs={4} display='flex' alignItems={'center'}>
        <CustomTextField
          id='icons-start-adornment'
          fullWidth
          style={{ visibility: hide ? 'hidden' : 'visible' }}
          value={value}
          onChange={onChange}
          placeholder='Search...'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Icon icon='iconamoon:search-light' />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='start'>
                {value?.length ? (
                  <Box onClick={() => onChange({ target: { value: '' } })} sx={{ cursor: 'pointer' }}>
                    <Icon icon='pajamas:clear' />
                  </Box>
                ) : null}
              </InputAdornment>
            )
          }}
        />
      </Grid>
    </Grid>
  )
}

export default PageHeader
