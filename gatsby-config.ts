import type { GatsbyConfig } from "gatsby";
const path = require('path')
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const config: GatsbyConfig = {
  pathPrefix: '/gatsby-portfolio',
  siteMetadata: {
    title: "Portfolio Thomas Sultan",
    description: "A portfolio website built with React and Gatsby",
    siteUrl: process.env.SITE_URL,
    image: "/images/icon.png",
    menuLinks: [
      {
        name: 'Home',
        type: 'internal',
        link: '#Home'
      },
      {
        name: 'About',
        type: 'internal',
        link: '#About'
      },
      {
        name: 'Projects',
        type: 'internal',
        link: '#Projects'
      },
      {
        name: 'Contact',
        type: 'internal',
        link: '#Contact'
      },
      {
        name: 'Mon CV',
        type: 'external',
        link: 'http://cv.thomassultan.fr'
      }
    
    
    ],
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-theme-ui", "gatsby-plugin-image", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  }, "gatsby-plugin-mdx", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  },{
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "projets",
      "path": "./src/pages/projects/"
    },
    __key: "projects"
  },{
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: "gatsby-plugin-alias-imports",
      options: {
        alias: {
          "@components": path.resolve(__dirname, 'src/components'),
            "@pages": path.resolve(__dirname, 'src/pages'),
"            @hooks": path.resolve(__dirname, 'src/hooks'),

        },
        extensions: []
      }
    }
  ]
};

export default config;
