import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../pages/Welcome/Index.vue'
import License from '../pages/Welcome/License.vue'
import PrivacyPolicy from '../pages/Welcome/PrivacyPolicy.vue'
import CompanyInfo from '../pages/Welcome/CompanyInfo.vue'
import ToolTipPage from '../pages/Welcome/ToolTipPage.vue'
import Welcome from '../pages/Welcome/welcome.vue'
import Dashboard from '../pages/Dashboard/Index.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/license',
    name: 'License',
    component: License
  },
  {
    path: '/PrivacyPolicy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  },
  {
    path: '/CompanyInfo',
    name: 'CompanyInfo',
    component: CompanyInfo
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: Welcome
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
