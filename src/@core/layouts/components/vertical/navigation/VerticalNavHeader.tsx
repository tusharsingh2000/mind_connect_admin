// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Type Import
import { LayoutProps } from 'src/@core/layouts/types'

// ** Custom Icon Import
import Icon from 'src/@core/components/icon'

interface Props {
  navHover: boolean
  collapsedNavWidth: number
  hidden: LayoutProps['hidden']
  navigationBorderWidth: number
  toggleNavVisibility: () => void
  settings: LayoutProps['settings']
  saveSettings: LayoutProps['saveSettings']
  navMenuBranding?: LayoutProps['verticalLayoutProps']['navMenu']['branding']
  menuLockedIcon?: LayoutProps['verticalLayoutProps']['navMenu']['lockedIcon']
  menuUnlockedIcon?: LayoutProps['verticalLayoutProps']['navMenu']['unlockedIcon']
}

// ** Styled Components
const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(3.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

const HeaderTitle = styled(Typography)<TypographyProps>({
  fontWeight: 700,
  lineHeight: '24px',
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
})

const LinkStyled = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

const VerticalNavHeader = (props: Props) => {
  // ** Props
  const {
    hidden,
    navHover,
    settings,
    saveSettings,
    collapsedNavWidth,
    toggleNavVisibility,
    navigationBorderWidth,
    menuLockedIcon: userMenuLockedIcon,
    navMenuBranding: userNavMenuBranding,
    menuUnlockedIcon: userMenuUnlockedIcon
  } = props

  const { navCollapsed } = settings

  const menuCollapsedStyles = navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 }

  const menuHeaderPaddingLeft = () => {
    if (navCollapsed && !navHover) {
      if (userNavMenuBranding) {
        return 0
      } else {
        return (collapsedNavWidth - navigationBorderWidth - 34) / 8
      }
    } else {
      return 6
    }
  }

  const MenuLockedIcon = () => userMenuLockedIcon || <Icon icon='tabler:circle-dot' />

  const MenuUnlockedIcon = () => userMenuUnlockedIcon || <Icon icon='tabler:circle' />

  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: menuHeaderPaddingLeft() }}>
      {userNavMenuBranding ? (
        userNavMenuBranding(props)
      ) : (
        <LinkStyled href='/'>
          <svg width="60" height="72" viewBox="0 0 843 921" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.61" d="M842.915 804.844C847.279 857.842 682.487 908.709 474.924 918.402C267.26 928.096 95.5729 892.952 91.2091 839.987C86.8786 786.789 251.537 736.056 459.267 726.362C666.798 716.702 838.585 751.712 842.915 804.844Z" fill="url(#paint0_radial_510_10462)" fill-opacity="0.4"/>
<path d="M19.1232 352.241C7.99713 411.868 77.1851 384.086 2.43414 484.987C-7.12622 497.745 13.5935 507.305 27.8841 510.47C42.9742 514.467 37.3779 518.431 35.8123 528.791C33.4805 539.118 30.2825 551.843 32.681 557.406C34.2133 562.136 58.8638 559.005 52.5346 559.771C45.3727 561.37 39.0102 572.496 42.9743 579.658C46.9384 586.054 66.8586 599.511 66.8586 615.434C68.4575 738.653 205.234 577.259 222.756 648.046C230.718 682.257 263.329 660.738 305.502 653.609C311.065 559.804 288.746 518.431 194.908 445.28C-83.4427 229.854 489.981 12.7302 618.863 20.6916C863.835 35.815 509.901 374.526 555.238 230.587C583.886 140.78 419.194 166.196 466.962 239.348C467.762 241.747 469.327 243.345 470.194 244.944C481.286 271.993 365.163 266.397 357.234 266.397C356.435 274.325 340.479 402.374 368.327 389.683C370.726 388.816 372.325 387.284 374.656 386.451C452.638 334.019 470.96 469.897 381.019 448.477C338.08 437.318 388.214 553.442 393.777 566.966C407.302 561.403 529.788 504.141 516.297 547.046C487.615 636.92 627.657 609.072 579.921 535.953C578.322 534.388 576.69 532.789 575.924 530.39C565.598 503.341 696.012 511.303 703.973 511.303C704.739 503.375 720.662 373.726 692.048 386.485C690.482 387.284 688.084 388.85 686.518 390.482C630.821 427.824 606.171 369.762 628.423 341.148C661.068 298.243 672.227 314.099 715.932 227.456C918.666 -179.677 59.6632 20.6916 19.1232 352.241ZM299.073 680.625C261.697 680.625 232.283 710.838 232.283 748.214C232.283 785.589 261.697 815.037 299.073 815.037C336.481 815.037 366.695 785.623 366.695 748.247C366.695 710.872 336.481 680.625 299.073 680.625Z" fill="url(#paint1_linear_510_10462)"/>
<defs>
<radialGradient id="paint0_radial_510_10462" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(467.047 822.391) rotate(-2.67796) scale(376.028 96.3367)">
<stop/>
<stop offset="0.0049" stop-color="#030303"/>
<stop offset="0.1219" stop-color="#3D3D3D"/>
<stop offset="0.2419" stop-color="#717171"/>
<stop offset="0.362" stop-color="#9C9C9C"/>
<stop offset="0.4825" stop-color="#C0C0C0"/>
<stop offset="0.6034" stop-color="#DCDCDC"/>
<stop offset="0.7248" stop-color="#EFEFEF"/>
<stop offset="0.8473" stop-color="#FBFBFB"/>
<stop offset="0.9726" stop-color="white"/>
</radialGradient>
<linearGradient id="paint1_linear_510_10462" x1="373.426" y1="0" x2="373.426" y2="815.037" gradientUnits="userSpaceOnUse">
<stop stop-color="#194795"/>
<stop offset="1" stop-color="#5480CC"/>
</linearGradient>
</defs>
</svg>

          <HeaderTitle variant='h4' sx={{ ...menuCollapsedStyles, ...(navCollapsed && !navHover ? {} : { ml: 2.5 }) }}>
            Mind Connect
          </HeaderTitle>
        </LinkStyled>
      )}

      {hidden ? (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={toggleNavVisibility}
          sx={{ p: 0, color: 'text.secondary', backgroundColor: 'transparent !important' }}
        >
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </IconButton>
      ) : userMenuLockedIcon === null && userMenuUnlockedIcon === null ? null : (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={() => saveSettings({ ...settings, navCollapsed: !navCollapsed })}
          sx={{
            p: 0,
            color: 'text.primary',
            backgroundColor: 'transparent !important',
            '& svg': {
              fontSize: '1.25rem',
              ...menuCollapsedStyles,
              transition: 'opacity .25s ease-in-out'
            }
          }}
        >
          {navCollapsed ? MenuUnlockedIcon() : MenuLockedIcon()}
        </IconButton>
      )}
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
