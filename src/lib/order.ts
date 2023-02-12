import { sheetRoutes } from 'routes';
import { useAppStore, useOrderStore } from 'store';

export const goToHomeSheet = () => {
  if (useOrderStore.getState().orders.length)
    return useAppStore.setState({ sheet: sheetRoutes[3] });
  useAppStore.setState({ sheet: sheetRoutes[0] });
};
