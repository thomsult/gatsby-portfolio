/** @jsx jsx */
import * as React from "react";
import { Link, HeadFC, PageProps } from "gatsby";
import Layout from "../components/layout";

import { Theme, get, jsx, css } from "theme-ui";
import theme from "../gatsby-plugin-theme-ui/index";


const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <section>
        <h1 sx={theme.styles?.h1}>Page introuvable!</h1>
        <p>
          Sorry 😔, we couldn’t find what you were looking for.
        </p>
        <Link to="/">Go home</Link>.
      </section>
    </Layout>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
