import { lazy } from 'react'

const AdminRoutes = [
  {
    path: '/admin/project',
    component: lazy(() => import('../../views/pages/admin/project/list')),
    exact: true,
    meta: {
        action:'all',
        manage: 'all'
    }
   
  },
  {
    path: '/admin/project/create',
    component: lazy(() => import('../../views/pages/admin/project/create/index')),
    exact: true,
    meta: {
        action:'all',
        manage: 'all'
    }
  },
  {
    path: '/admin/project/edit/:id',
    component: lazy(() => import('../../views/pages/admin/project/create')),
    exact: true,
    meta: {
        action:'all',
        manage: 'all'
    }
   
  },
  {
    path: '/admin/questions/:projectId',
    component: lazy(() => import('../../views/pages/admin/questions/list')),
    exact: true,
    meta: {
        action:'all',
        manage: 'all'
    }
  },
  {
    path: '/admin/project/question/add/:projectId',
    component: lazy(() => import('../../views/pages/admin/questions/create')),
    exact: true,
    meta: {
        action:'all',
        manage: 'all'
    }
  }
  
]

export default AdminRoutes
