import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../pages/Welcome/Index.vue'
import About from '../pages/About.vue'
import Contact from '../pages/Contact.vue'
import License from '../pages/Welcome/License.vue'
import PrivacyPolicy from '../pages/Welcome/PrivacyPolicy.vue'
import CompanyInfo from '../pages/Welcome/CompanyInfo.vue'
import OnumanCombobox from '../pages/Welcome/Combo.vue'
import ToolTip from '../components/ToolTip.vue'
import ToolTipPage from '../pages/Welcome/ToolTipPage.vue'

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
    path: '/Combobox',
    name: 'Combobox',
    component: OnumanCombobox
  },
  {
    path: '/tooltip',
    name: 'Tooltip',
    component: ToolTipPage
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
