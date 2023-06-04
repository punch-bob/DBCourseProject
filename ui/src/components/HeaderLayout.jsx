import { Outlet } from 'react-router-dom';
import Header from './Header';

const HeaderLayout = () => {
  return (
    <div className='wrapper'>
        <Header />
        <Outlet />
    </div>
  );
};

export default HeaderLayout;