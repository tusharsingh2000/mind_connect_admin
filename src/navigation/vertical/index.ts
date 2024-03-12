// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      path: '/home',
      icon: 'mage:dashboard-fill'
    },
    {
      title: 'Mentees',
      path: '/mentees',
      icon: 'teenyicons:users-solid'
    },
    {
      title: 'Mentors',
      path: '/mentors',
      icon: 'carbon:user-filled'
    },
    {
      title: `Do's & Don's`,
      path: '/dos-dons',
      icon: 'mdi:sign-routes'
    },
    {
      path: '/setting',
      title: 'Settings',
      icon: 'lets-icons:setting-alt-fill'
    }
  ]
}

export default navigation
