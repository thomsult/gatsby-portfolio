import fs from "fs";
import { GatsbyNode } from "gatsby";

const path = require("path");
const PageTemplate = path.resolve("./src/templates/pages.tsx");




interface MdxNode {
  id: string;
  internal: {
    contentFilePath: string;
  };
  frontmatter: {
    name: string;
    title: string;
    school: string;
    category: string;
    description: string;
    date: string;
    liveUrl: string;
    gitHubUrl: string;
  };
}


interface MdxResult{
  errors?: Error;
  data?: {
    allMdx: {
      nodes: MdxNode[];
    };
  };
}








const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;
  const result:MdxResult = (await graphql(`
  query {
    allMdx(
      filter: { frontmatter: { category: { eq: "Project" } } }
      sort: { frontmatter: { title: ASC } }
    ) {
      nodes {
        frontmatter {
          name
          title
          school
          category
          description
          date
          liveUrl
          gitHubUrl
        }
        id
        internal {
          contentFilePath
        }
      }
    }
  }
`));

if (result.errors) {
  reporter.panicOnBuild("Error loading MDX result", result.errors);
  return;
}
if (!result.data) {
  reporter.panicOnBuild("Error loading MDX result", Error("No data"));
  return;
}

const posts = result.data.allMdx.nodes;

// you'll call `createPage` for each result
posts.forEach((node: MdxNode) => {
  if (!node.frontmatter.name) return;
  const image = `/src/images/project/${node.frontmatter.name.replace(/ /g, "")}/`

  createPage({
    // As mentioned above you could also query something else like frontmatter.title above and use a helper function
    // like slugify to create a slug
    path: node.frontmatter.name,

    // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
    component: `${PageTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
    // You can use the values in this context in
    // our page layout component
    context: { 
      id: node.id ,
      image:image
    },
  });
});
};

exports.createPages = createPages;


exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  if(page.path === "/projects/"){
  deletePage(page)
  // You can access the variable "house" in your page queries now
  }
}