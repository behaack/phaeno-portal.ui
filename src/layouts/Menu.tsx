import MenuItem from './components/MenuItem';
import menuList from './components/menuList';

export default function Menu() { 
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
