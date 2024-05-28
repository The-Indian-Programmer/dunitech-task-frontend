import { lazy } from 'react'

const DashboardRoutes = [
  {
    path: '/dashboard',
    component: lazy(() => import('../../views/pages/admin/Dashboard')),
    exact: true,
    meta: {
      action: 'read',
      resource: 'ACL'
    }
   
  }
]

export default DashboardRoutes
