/** @jsx jsx */
/** @jsxFrag */

import { Key } from "react";
import useQuery from "../../hooks/useQuery";
import { jsx } from "theme-ui";

function Tools() {
  const tools = [
    "Html",
    "CSS",
    "Javascript",
    "Nextjs",
    "Reactjs",
    "Typescript",
    "Node",
    "GitHub",
  ];

  const { svg } = useQuery();
  //console.log(svg)
  const svgList = svg
    .map((item) => {
      const name = item.url.match(/([A-Z])\w+/g);
      if (name && tools.includes(name[0])) {
        return item;
      }
      return null;
    })
    .filter(Boolean);

  return (
    <section
      sx={{
        bg: "background",
      }}
    >
      <ul
      sx={{
        display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-around",
                    listStyle: "none",
                    gap: "1rem",
                    p: ["0.5rem", "1rem"],
                    maxWidth: "1200px",
                    margin: "0 auto",
      }}
      >
        {svgList.map((item) => {
          const name = item?.url.match(/([A-Z])\w+/g)||[];
          return name?.[0] !== undefined && item? (
            <li
            key={item.id}
            >
              <img
                sx={{
                  width: ["20px","50px"],
                  height: "50px",
                }}
                src={item.url}
                alt={name?.[0]}
                title={name?.[0]}
              />
            </li>
          ):null;
        })}
      </ul>
    </section>
  );
}
export default { Tools };
