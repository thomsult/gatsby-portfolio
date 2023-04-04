
/** @jsx jsx */
/** @jsxFrag */
import { jsx } from "theme-ui";
import {GatsbyImage, StaticImage, getImage} from 'gatsby-plugin-image';
import React from "react";

interface ImageHalfProps {
    caption?: string;
}





const ImageToulouse = () => {
  return (<><StaticImage
    sx={{
      height: "100%",
      objectFit: "cover",
      width: "auto",
    }}
    src={"https://images.unsplash.com/photo-1541792344043-3f5b1630e42d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"}
    alt="image Toulouse"
  /><figcaption
  sx={{
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    padding: "0.5em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  {<a
    sx={{
      textAlign: "end",
      fontSize: "0.6em",
      textDecoration: "none",
      color: "rgba(255, 255, 255, 0.8)",
      paddingRight: "0.5em",
      "&:hover": {
        textDecoration: "underline",
      },
      "@media screen and (min-width: 768px)": {
        fontSize: "0.6em",
        color: "rgba(255, 255, 255, 0.8)",
        width: "100%",
      },
    }}
    href="https://unsplash.com/fr/@life_of_marion"
  >
    © life of marion - Unsplash.com
  </a>}
</figcaption></>
  )
}


const ImageInfo = ({caption}) => {
  return (<><StaticImage
    sx={{
      height: "100%",
      objectFit: "cover",
      width: "auto",
    }}
    src={"../../images/md-mahdi-nPVhtHtF-TI-unsplash.jpg"}
    alt="image informatique"
  />
  <figcaption
            sx={{
              position: "absolute",
              bottom: "0",
              left: "0",
              width: "100%",
              padding: "0.5em",
            }}
          >
            {<a
              sx={{
                fontSize: "0.6em",
                textDecoration: "none",
                color: "rgba(255, 255, 255, 0.8)",
                "&:hover": {
                  textDecoration: "underline",
                },
                "@media screen and (min-width: 768px)": {
                  fontSize: "0.6em",
                  color: "rgba(0, 0, 0, 0.8)",
                },
              }}
              href={caption.href}
            >
              {caption.name}
            </a>}
          </figcaption></>
  )
}










const ImageHalf:React.FC<ImageHalfProps> = (props) => {
    const caption = props.caption&&JSON.parse(props.caption) as { name: string; href: string };
  
    return (
      <div
        sx={{
          
          height: "5em",
          width: "100%",
          minHeight: "200px",
          "@media screen and (min-width: 768px)": {
            height: "auto",
            width: "50%",
            maxWidth: "40em",
            minHeight: "max-content",
          },
        }}
      >
        <figure
          sx={{
            height: "100%",
            width: "100%",
            
            position: "relative",
          }}
        >
          {caption?<ImageInfo caption={caption}/>:<ImageToulouse/>}
        </figure>
      </div>
    );
  };

export default ImageHalf  ;