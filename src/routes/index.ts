import { SheetRoute } from 'types/app';

export const sheetRoutes: SheetRoute[] = [
  {
    name: 'home',
    snapPoint: '40%',
    snapPoints: ['40%'],
  },
  {
    name: 'connecting',
    snapPoint: '30%',
    snapPoints: ['30%'],
  },
  {
    name: 'order',
    snapPoint: '40%',
    snapPoints: ['40%'],
  },
  {
    name: 'offline',
    snapPoint: '40%',
    snapPoints: ['25%', '40%'],
  },
];
