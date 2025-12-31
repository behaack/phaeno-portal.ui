import { MenuItem } from "./MenuItem";
import { userMenuList } from "../menu-lists/menuList";

export function Menu() { 
  const mainMenu = userMenuList.filter((item) => {
    return item.isMain === true;
  });  

  return (
    <ul className="main-menu">
      {mainMenu.map((item) => (
        <MenuItem key={item.index} item={item} />
      ))}
    </ul>
  );
}
