// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

import AccountGroup from 'mdi-material-ui/AccountGroup';

// import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
const SuperAdminMenu = [
  {
    title: 'Dashboard',
    icon: HomeOutline,
    path: '/'
  },
  {
    title: 'Account Settings',
    icon: AccountCogOutline,
    path: '/account-settings'
  },

  // {
  //   title: 'Activity Log',
  //   icon: AccountGroup ,
  //   path: '/activity'
  // },
  
  {
    sectionTitle: 'Pages'
  },    
  {
    title: 'Managers',
    icon: AccountGroup ,
    path: '/teams'
  },
  {
    title: 'Stores',
    icon: AccountGroup ,
    path: '/stores'
  },
  {
    title: 'Verification',
    icon: AccountGroup ,
    path: '/verification'
  },
  {
    title: 'Orders',
    icon: AccountGroup ,
    path: '/order'
  },
  {
    title: 'Products',
    icon: AccountGroup ,
    path: '/products'
  },
  {
    title: 'Riders',
    icon: AccountGroup ,
    path: '/riders'
  },
  {
    title: 'Customers',
    icon: AccountGroup ,
    path: '/customers'
  },
  {
    title: 'Logistics',
    icon: AccountGroup ,
    path: '/logistics'
  },
  {
    title: 'Wallet',
    icon: AccountGroup ,
    path: '/wallet'
  },
  {
    title: 'Earnings',
    icon: AccountGroup ,
    path: '/earnings'
  }
];

const AdminMenu = [
  {
    title: 'Dashboard',
    icon: HomeOutline,
    path: '/'
  },
  {
    title: 'Account Settings',
    icon: AccountCogOutline,
    path: '/account-settings'
  },
  {
    sectionTitle: 'Pages'
  },    
  {
    title: 'Stores',
    icon: AccountGroup ,
    path: '/stores'
  },
  {
    title: 'Verification',
    icon: AccountGroup ,
    path: '/verification'
  },
  {
    title: 'Orders',
    icon: AccountGroup ,
    path: '/order'
  },
  {
    title: 'Products',
    icon: AccountGroup ,
    path: '/products'
  },
  {
    title: 'Riders',
    icon: AccountGroup ,
    path: '/riders'
  },
  {
    title: 'Customers',
    icon: AccountGroup ,
    path: '/customers'
  },
  {
    title: 'Logistics',
    icon: AccountGroup ,
    path: '/logistics'
  },
  {
    title: 'Earnings',
    icon: AccountGroup ,
    path: '/earnings'
  }
]

export const SuperNavigation = () => {
  return SuperAdminMenu;
}

export const AdminNavigation = () => {
  return AdminMenu;
}

