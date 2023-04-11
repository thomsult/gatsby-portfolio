/** @jsx jsx */
/** @jsxFrag */

import React from 'react';
import {jsx} from 'theme-ui';

interface ButtonProps {
    Active: boolean;
    OnClick: () => void;
}
interface ImageChangeProps {
    nbImages: number;
    OnChange: (i: number) => void;
}



const Button:React.FC<ButtonProps> = ({Active = false,OnClick}) => {
    return (<button
        sx={{
          height: "1.2em",
          width: "1.2em",
          borderRadius: "50%",
          border: "none",
          backgroundColor: ["primary", "primary", "white"],
          opacity: Active?"1":"0.5",
          cursor: "pointer",
        }}
        onClick={OnClick}
        aria-label='next'
        />)
    }









const ImageChange:React.FC<ImageChangeProps> = ({nbImages,OnChange})=> {
    const [active, setActive] = React.useState(0);
    const NB = nbImages;
  return (
    <div
      sx={{
        position: "absolute",
        bottom: ["95%", "95%", "-50%"],
        zIndex: "100",
        right: "0",
        width: "100%",
        display: "flex",
        gap: "0.8em",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: [0,0,"0.5em"],
      }}
      >
        {
            [...Array(NB)].map((_,i) => 
            <Button key={i} Active={i===active} OnClick={
                () => {
                    setActive(i);
                    OnChange(i);
                }
                
            }/>
            )
        }
      </div>
  )
}

export default ImageChange;