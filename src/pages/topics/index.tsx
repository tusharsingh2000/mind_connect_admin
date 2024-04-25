import { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Box, Button, CircularProgress, Divider } from '@mui/material'
import AddDosForm from './form'
import { Icon } from '@iconify/react'
import { del, get } from 'src/utils/AxiosMethods'
import { TOPIC } from 'src/types/General'
import UpdateDosForm from './update'
import AlertDialog from 'src/@core/components/dialog'
import { toast } from 'react-hot-toast'

const Topics = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [list, setList] = useState<TOPIC[]>([])
  const [selectedItem, setSelectedItem] = useState<string>('')

  const deleteDoDons = async () => {
    try {
      const response = await del(`/admin/topic/${selectedItem}`)
      if (response) {
        toast.success('Deleted Successfully')
        setOpen(false)
        getDoDons()
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const getDoDons = async () => {
    try {
      setIsLoading(true)
      const response = (await get(`/admin/topic`)) as TOPIC[]

      setIsLoading(false)
      if (response) {
        setList(response || [])
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    getDoDons()
  }, [])

  const DoDo = ({ dodo }: { dodo: TOPIC }) => {
    return (
      <Box display={'flex'} alignItems='center' gap={5} mb={2}>
        <img style={{ height: 80, width: 80 }} src={dodo?.image as any} />
        <Typography width={300} component='span' fontSize={14}>{`${dodo.name}`}</Typography>

        <UpdateDosForm id={dodo?._id} name={dodo.name} image={dodo.image} refetch={getDoDons} />
        <Button
          onClick={() => {
            setSelectedItem(dodo?._id)
            setOpen(true)
          }}
        >
          <Icon fontSize={20} icon='mdi:delete' />
        </Button>
      </Box>
    )
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box display={'flex'} justifyContent='space-between' alignItems='center'>
          <Typography fontSize={32} fontWeight={700}>
            Topics
          </Typography>
          <AddDosForm refetch={getDoDons} />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ mt: 5 }}>
          {isLoading ? (
            <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <CircularProgress sx={{ mb: 4 }} />
              <Typography>Loading...</Typography>
            </Box>
          ) : (
            <>
              {list?.length ? (
                <Box>
                  <Box sx={{ display: 'flex', width: '50%' }} mb={5}>
                    <Box sx={{ width: '15%', textAlign: 'center' }}>
                      <Typography fontSize={16} fontWeight={600}>
                        Image
                      </Typography>
                    </Box>
                    <Box sx={{ width: '60%', textAlign: 'center' }}>
                      <Typography fontSize={16} fontWeight={600}>
                        Title
                      </Typography>
                    </Box>
                    <Box sx={{ width: '20%', textAlign: 'center' }}>
                      <Typography fontSize={16} fontWeight={600}>
                        Action
                      </Typography>
                    </Box>
                  </Box>
                  {list?.map((item, index) => (
                    <DoDo key={index} dodo={item} />
                  ))}
                </Box>
              ) : (
                <Box sx={{ display: 'flex', height: 200, alignItems: 'center', justifyContent: 'center' }}>
                  <Typography fontSize={14} m={5}>
                    No data found
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Box>
      </Grid>
      <AlertDialog
        open={open}
        setOpen={setOpen}
        onOk={deleteDoDons}
        title='Hold On!'
        description='Are you sure you want to delete this item?'
      />
    </Grid>
  )
}

export default Topics
