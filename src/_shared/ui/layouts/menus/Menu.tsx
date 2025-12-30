import MenuItem from '../components/MenuItem';
import menuList from '../menu-lists/menuList';

export function Menu() { 
  const mainMenu = menuList.filter((item) => {
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
