import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import GroupIcon from '@mui/icons-material/Group';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Dashboard',
    apiName: 'Dashboard',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Usuarios',
    apiName: 'Usuarios',
    path: '/usuarios',
    icon: (
      <SvgIcon fontSize="small">
         <UserIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Roles',
    apiName: 'Roles',
    path:'/roles',
    icon:(
      <SvgIcon fontSize="small">
        <GroupIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Inventario',
    apiName: 'Inventario',
    path: '/inventario',
    icon: (
      <SvgIcon fontSize="small">
        <InventoryIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Clientes',
    apiName: 'Clientes',
    path: '/clientes',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Ventas',
    apiName: 'Ventas',
    path: '/ventas',
    icon: (
      <SvgIcon fontSize="small">
        <LocalMallIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Entradas / Salidas',
    apiName: 'Entradas_Salidas',
    path: '/entradasSalidas',
    icon: (
      <SvgIcon fontSize="small">
        <WarehouseIcon />
      </SvgIcon>
    )
  }
];
