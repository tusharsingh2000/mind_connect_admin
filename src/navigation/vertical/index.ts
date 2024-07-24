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
      title: 'Users',
      path: '/mentees',
      icon: 'teenyicons:users-solid'
    },
    {
      title: 'Consultants',
      path: '/mentors',
      icon: 'carbon:user-filled'
    },
    {
      title: 'Categories',
      path: '/',
      icon: 'carbon:category'
    },
    {
      title: 'Sub-Categories',
      path: '/',
      icon: 'carbon:category'
    },
    {
      title: `Do's & Dont's`,
      path: '/dos-dons',
      icon: 'mdi:sign-routes'
    },
    {
      title: 'FAQs',
      path: '/faqs',
      icon: 'mdi:faq'
    },
    {
      title: 'Topics',
      path: '/topics',
      icon: 'icon-park-solid:topic'
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
      path: '/settings',
      title: 'Settings',
      icon: 'lets-icons:setting-alt-fill'
    },
    {
      path: '/cms',
      title: 'Cms',
      icon: 'ph:note-fill'
    }
  ]
}

export default navigation
