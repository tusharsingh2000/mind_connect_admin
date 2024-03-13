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
      title: 'FAQs',
      path: '/faqs',
      icon: 'mdi:faq'
    },
    {
      title: 'Sessions',
      path: '/sessions',
      icon: 'bxs:calendar'
    },
    {
      title: 'Queries',
      path: '/queries',
      icon: 'material-symbols-light:contact-support'
    },
    {
      path: '/setting',
      title: 'Settings',
      icon: 'lets-icons:setting-alt-fill'
    }
  ]
}

export default navigation
