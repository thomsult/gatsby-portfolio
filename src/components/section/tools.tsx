/** @jsx jsx */
/** @jsxFrag */

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
          return (
            <li
            key={item.id}
            >
              <img
                sx={{
                  width: ["20px","50px"],
                  height: "50px",
                }}
                src={item.url}
                alt={item.url.match(/([A-Z])\w+/g)}
                title={item.url.match(/([A-Z])\w+/g)}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
export default { Tools };
