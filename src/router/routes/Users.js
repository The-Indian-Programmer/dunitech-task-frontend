import { lazy } from 'react'

const UserRoutes = [
  {
    path: '/dashboard',
    component: lazy(() => import('../../views/pages/users/Dashboard')),
    exact: true,
    meta: {
      action: 'read',
      resource: 'ACL'
    }
   
  },
  {
    path: '/project/:projectId',
    component: lazy(() => import('../../views/pages/users/project/index')),
    exact: true,
    meta: {
      action: 'read',
      resource: 'ACL'
    }
   
  },
  {
    path: '/project/result/:projectId',
    component: lazy(() => import('../../views/pages/users/result/index')),
    exact: true,
    meta: {
      action: 'read',
      resource: 'ACL'
    }
   
  },
  
]

export default UserRoutes
