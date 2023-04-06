/** @jsx jsx */
/** @jsxFrag */


import {StaticImage} from 'gatsby-plugin-image';
import {jsx} from 'theme-ui';

const PhoneMockup = ({ children }) => {
    return (
      <div
        sx={{
          height: "auto",
          Width: "100%",
          aspectRatio: "1/2",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          
        }}
      >
        <StaticImage
          sx={{
            position: ["relative", "absolute", "absolute"],
            display: ["none", "flex", "flex"],
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: "1",
            filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 0.562))"
          }}
          src="../../images/mock/google_pixel_3___not_pink.png"
          alt=""
        />
        <div
          sx={{
            width: ["100%", "85%", "85%"],
            height: ["100%", "85%", "85%"],
            display: ["flex", "none", "flex"],
            justifyContent: "center",
          }}
        >
          {children}
        </div>
      </div>
    );
  };
  




  const TabletMockup = ({ children }) => {
    return (
      <div
        sx={{
          height: ["auto","100%","auto"],
          aspectRatio: ["none","none","3/2"],
            maxWidth: ["100%", "100vw", "540px"],
          display: ["none", "block", "flex"],
          justifyContent: ["center", "none", "center"],
          alignItems: ["center", "none", "flex-start"],
          position: ["relative", "inherit", "relative"],
        }}
      >
        <StaticImage
          sx={{
            position: ["absolute", "relative", "absolute"],
            display: ["none", "none", "flex"],
            width: "100%",
            height: "auto",
            zIndex: "1",
            filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 0.562))"
            
          }}
          src="../../images/mock/microsoft_surface_book.png"
          alt=""
        />
        <div
          sx={{
            width: ["100%","100","73%"],
            height: "auto",
            display: "flex",
            justifyContent: "center",
            transform: ["translateY(0%)", "translateY(0%) scale(1)", "translateY(9%)"],
          }}
        >
          {children}
        </div>
      </div>
    );
  };

  const DesktopMockup = ({ children }) => {
    return (
      <div
        sx={{
          height: "auto",
          aspectRatio: "1.2",
            width: "540px",
          display: ["none", "none", "flex"],
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          
        }}
      >
        <StaticImage
          sx={{
            position: "absolute",
            width: "100%",
            height: "auto",
            zIndex: "1",
            filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 0.562))"
          }}
          src="../../images/mock/apple_imac_retina.png"
          alt=""
        />
        <div
          sx={{
            aspectRatio: "16/9",
            width: "93%",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            overflow: "hidden",
            transform: "translateY(-21%)",
          }}
        >
          {children}
        </div>
      </div>
    );
  };





  export { PhoneMockup,TabletMockup,DesktopMockup}