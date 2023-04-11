/** @jsx jsx */
/** @jsxFrag */

import { jsx } from "theme-ui";

import ImageHalf from "../utils/imageHalfSection";
import Button from "../utils/button";
const Formulaire = (props) => {
  return (
    <section
      id="Contact"
      sx={{
        maxWidth: "1400px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        "&>div:nth-of-type(2)": {
          display: "none",
        },
        "@media screen and (min-width: 1000px)": {
          flexDirection: "row",
          "&>div:nth-of-type(2)": {
            display: "flex",
            marginLeft: "1em",
          },
        },
      }}
    >
      <FormulaireForm />
      {props.children}
    </section>
  );
};

const FormulaireForm = () => {
  return (
    <div
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",

        paddingTop: "5em",
        marginBottom: "2em",
        "@media screen and (min-width: 1000px)": {
          justifyContent: "center",
          alignItems: "center",
          marginRight: "1em",
        },
      }}
    >
      <div
        sx={{
          width: "100%",
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          padding: "1em",

          borderRadius: "5px",
          bg: "background",
          "@media screen and (min-width: 1000px)": {
            marginLeft: "1rem",
            height: "100vh",
            border: "1px solid rgba(0,0,0,0.1)",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            maxWidth: "800px",
          },
        }}
      >
        <h1
          sx={{
            maxWidth: "fit-content",
            color: "text",
            fontSize: "2em",
            textAlign: "center",
            padding: "1em 0.5em",
          }}
        >
          Contactez-moi
        </h1>
        <form
          action="https://getform.io/f/2bae6736-aa2c-4f3a-a12e-adf9d2937c79" method="POST"
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.5em",
            fontSize: "1.2em",
            "& > div": {
              display: "flex",
              flexDirection: "column",
              padding: "0.5em",
              "& > label": {
                marginBottom: "0.5em",
                color: "text",
              },
              "& > input": {
                padding: "1.5em",
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: "5px",
                outline: "none",
                color: "text",
              },
              "& > textarea": {
                width: "100%",
                height: "100%",
                padding: "1em 1em",
                marginBottom: "0.8em",
                border: "#e0e0e0 solid 1px",
                fontSize: "1em",
                borderRadius: "5px",
                color: "#333",
                outline: "#5e5e5e",
              },
            },
            "& > button": {
              bg: "primary",
              border: "none",
              color: "background",
              alignSelf: "flex-end",
            },
          }}
        >
          <input type="hidden" name="_gotcha" style={{
            display: "none!important"
          }}/>
          <div>
            <label htmlFor="user_Name">Nom</label>
            <input
              type="text"
              id="user_Name"
              name="user_Name"
              placeholder="Votre nom"
              pattern="[a-zA-Z]{3,}"
            />
          </div>
          <div>
            <label htmlFor="user_email">Email</label>
            <input
              type="user_email"
              id="user_email"
              name="user_email"
              placeholder="Votre email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            />
          </div>
          <div
            sx={{
              flex: "1",
            }}
          >
            <label htmlFor="user_message">Message</label>
            <textarea id="user_message" name="user_message" placeholder="Votre message" />
          </div>
          <Button
            options={{
              color: "primary",
              type: "submit",
            }}
          >
            Envoyer
          </Button>
        </form>
      </div>
    </div>
  );
};

export default { Formulaire };
