import { CanRole } from "@/auth/CanRole";
import { MenuItem } from "./MenuItem";
import { userMenuList } from "./menu-lists/menuList";

export function Menu() { 
  const mainMenu = userMenuList.filter((item) => {
    return item.isMain === true;
  });  

  return (
    <ul className="main-menu">
      {mainMenu.map((item) => (
        <CanRole key={item.index} role={item.roles}>
          <MenuItem item={item} />
        </CanRole>
      ))}
    </ul>
  );
}
