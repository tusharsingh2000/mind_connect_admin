// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import MuiAccordionDetails, { AccordionDetailsProps } from '@mui/material/AccordionDetails'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// Styled component for Accordion component
const Accordion = styled(MuiAccordion)<AccordionProps>(({ theme }) => ({
  margin: 0,
  borderRadius: 0,
  padding: '0px !important',
  boxShadow: 'none !important',
  '&:before': {
    display: 'none'
  },
  '&.Mui-expanded': {
    margin: 'auto'
  },
  '&:first-of-type': {
    '& .MuiButtonBase-root': {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius
    }
  },
  '&:last-of-type': {
    '& .MuiAccordionSummary-root:not(.Mui-expanded)': {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius
    }
  }
}))

// Styled component for AccordionSummary component
const AccordionSummary = styled(MuiAccordionSummary)<AccordionSummaryProps>(({ theme }) => ({
  marginBottom: -1,
  padding: theme.spacing(0, 4),
  minHeight: theme.spacing(12),
  transition: 'min-height 0.15s ease-in-out',
  '& .MuiAccordionSummary-content': {
    alignItems: 'center',
    '&.Mui-expanded': {
      margin: '13px 0'
    }
  },
  '& .MuiTypography-root': {
    fontWeight: 400
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: theme.palette.text.secondary
  }
}))

// Styled component for AccordionDetails component
const AccordionDetails = styled(MuiAccordionDetails)<AccordionDetailsProps>(({ theme }) => ({
  padding: `${theme.spacing(4)} !important`
}))

const Questions = ({
  questions
}: {
  questions: {
    qus: string
    answer: string
  }[]
}) => {
  // ** State
  const [expanded, setExpanded] = useState<number | false>(0)

  const handleChange = (panel: number) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const expandIcon = (value: number) => <Icon icon={expanded === value ? 'tabler:minus' : 'tabler:plus'} />

  return (
    <div>
      {questions?.map((item, index) => (
        <Accordion key={index} expanded={expanded === index} onChange={handleChange(index)}>
          <AccordionSummary
            id='customized-panel-header-1'
            expandIcon={expandIcon(index)}
            aria-controls='customized-panel-content-1'
          >
            <Typography>{item?.qus || ''}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item?.answer || ''}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}

export default Questions
