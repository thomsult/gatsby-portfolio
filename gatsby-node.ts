import { GatsbyNode } from "gatsby";

const path = require("path");
const PageTemplate = path.resolve("./src/templates/pages.tsx");

const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;
  const result = (await graphql(`
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
            projectImage {
              childrenImageSharp {
                gatsbyImageData
              }
            }
            projectImageMobile {
              childrenImageSharp {
                gatsbyImageData
              }
            }
          }
          id
          internal {
            contentFilePath
          }
        }
      }
    }
  `)) as any;

  if (result.errors) {
    reporter.panicOnBuild("Error loading MDX result", result.errors);
  }
  if (!result.data) {
    reporter.panicOnBuild("Error loading MDX result", Error("No data"));
  }
  // Create blog post pages.
  const posts = result.data.allMdx.nodes;

  // you'll call `createPage` for each result
  posts.forEach((node :any ) => {
    if(!node.frontmatter.name) return;
    createPage({
      // As mentioned above you could also query something else like frontmatter.title above and use a helper function
      // like slugify to create a slug
      path: node.frontmatter.name,
      // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
      component: `${PageTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    });
  });
};

exports.createPages = createPages;
