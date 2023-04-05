
/** @jsx jsx */
/** @jsxFrag */

import React, { FC, SetStateAction } from 'react';
import NavBar from '../../components/navBar';
import {jsx} from 'theme-ui';



interface IProps {
  children: React.ReactNode;
  location: {
    pathname: string;
  }
}

interface IHeaderContext {
  isOpen: Boolean;
  toggleMenu:(bool?:Boolean)=>void;
}


const defaultState = {
  isOpen: false,
  toggleMenu: () => {},
};



const Context = React.createContext<IHeaderContext>(defaultState)


export const useHeaderContext = () => React.useContext(Context)



const Overlay:React.FC<IProps> = ({children,location}) => {
  const [isOpen, setIsOpen] = React.useState(defaultState.isOpen);
  const toggleMenu = (bool:Boolean = !isOpen) => setIsOpen(Boolean(bool));

  const {pathname} = location
  return (<Context.Provider value={{isOpen,toggleMenu}}>
    <div 
    onClick={() => setIsOpen(false)}
    onKeyDown={() => setIsOpen(false)}
    sx={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: isOpen? 1000 : -1000,
      opacity: isOpen? 0.5 : 0,
      bg:"black",
      transition: "opacity 0.3s ease-in-out",
    }}>
     </div>
     <NavBar path={pathname}/>
     {children}</Context.Provider>
  )
}

export default Overlay