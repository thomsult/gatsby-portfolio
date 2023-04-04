/** @jsx jsx */
/** @jsxFrag */
import { jsx,Image } from "theme-ui";

const IconWithName =(props: { name:string,url:string,image:string,img?:{url:string,id:string}}) => {
 const {name,url,img} = props
        return (
            <a sx={{
                color: "#5e5e5e",
                fontSize: "0.9em",
                display: "flex",
                gap: "0.5em",
                margin: "1em 0.5em",
                textDecoration: "none",
                maxWidth: "8em",
                cursor: "pointer",
                "&:hover": {
                    color: "#000",
                }
            }} href={url}>
                 <Image
                    src={img?.url}
                    sx={{
                        width: "1.6em",
                        height: "100%",
                    }}
                    alt={name}
                /> 
                <span
                sx={{
                    display: "none",
                    '@media screen and (min-width: 768px)': {
                        display: "flex",
                    }
                }}
                >{name}</span>
            </a>
        );
}

export default IconWithName;
