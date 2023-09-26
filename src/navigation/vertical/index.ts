// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboards',
      icon: 'bx:home-circle',
      badgeContent: 'new',
      badgeColor: 'error',
      children: [
        {
          title: 'Analytics',
          path: '/dashboards/analytics'
        },
        {
          title: 'CRM',
          path: '/dashboards/crm'
        },
        {
          title: 'eCommerce',
          path: '/dashboards/ecommerce'
        }
      ]
    },
    {
      sectionTitle: 'Apps & Pages'
    },

    {
      title: 'Task',
      icon: 'bx:food-menu',
      children: [
        {
          title: 'Open Task',
          path: '/apps/tasks/open-task'
        },
        {
          title: 'Paused Task',
          path: '/apps/tasks/pause-task'
        },
        {
          title: 'Rejected Task',
          path: '/apps/invoice/add'
        }
      ]
    },
    {
      title: 'Ticket',
      icon: 'bx:dock-top',
      children: [
        {
          title: 'Create New Ticket',
          path: '/tickets/create-ticket'
        },
        {
          title: 'My Ticket',
          path: '/tickets'
        }
      ]
    },
    {
      title: 'Projects',
      icon: 'bx:spreadsheet',
      children: [
        {
          title: 'Create',
          path: '/apps/project/create'
        },
        {
          title: 'View',
          path: '/apps/project/view'
        }
      ]
    },
    {
      title: 'User',
      icon: 'bx:user',
      children: [
        {
          title: 'List',
          path: '/apps/user/list'
        }
      ]
    },

    {
      title: 'Account Management',
      icon: 'bx:check-shield',
      children: [
        {
          title: 'Roles',
          path: '/apps/roles'
        },
        {
          title: 'Permissions',
          path: '/apps/permissions'
        }
      ]
    }
  ]
}

export default navigation
