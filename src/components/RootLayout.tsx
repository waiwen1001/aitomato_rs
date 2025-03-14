import { Outlet } from "react-router-dom";
import AppInitializer from "./AppInitializer";

const RootLayout = () => {
  return (
    <AppInitializer>
      <Outlet />
    </AppInitializer>
  );
};

export default RootLayout;
