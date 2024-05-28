// ** Routes Imports
import PagesRoutes from './Pages'
// import DashboardRoutes from './Dashboards'
import UserRoutes from './Users'
import AdminRoutes from './Admin'

// ** Document title
const TemplateTitle = 'Dunitech - Project Management'

// ** Default Route
const DefaultRoute = '/dashboard'


// ** Merge Routes
const Routes = [
  // ...DashboardRoutes,
  ...PagesRoutes,
  ...UserRoutes,
  ...AdminRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
