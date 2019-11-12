require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const myQuery = `{
  POSTS: allMarkdownRemark(
    filter: { fileAbsolutePath: { regex: "/pages/blog/" } }
  ) {
    edges {
      node {
        objectID: id
        frontmatter {
          title
          permalink
          date(formatString: "MMM D, YYYY")
          tags
          image{
            publicURL
            childImageSharp {
              id
            }
          }          
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`;

const queries = [
  {
    query: myQuery,
    transformer: ({ data }) => data.POSTS.edges.map(({ node }) => node), // optional
    indexName: 'Posts', // overrides main index name, optional
    settings: {
      // optional, any index settings
    },
  },
];

module.exports = {
  siteMetadata: {
    title: 'Cobuild Lab | Software development in Miami, Florida',
    author: '4geeks.co',
    description: 'Software development in Miami, Florida',
    siteUrl: process.env.URL,
    twitterHandle: '@cobuildlab',
  },
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 720,
              linkImagesToOriginal: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-component',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'code-x-language-',
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-105326682-1',
      },
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Cobuild Lab`,
        short_name: `Cobuild`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#e76c29`,
        display: `minimal-ui`,
        icon: `src/resources/icocobuildlab.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    // {
    //   resolve: 'gatsby-plugin-typography',
    //   options: {
    //     // pathToConfigModule: 'src/utils/typography',
    //   }
    // },
    // {
    //   resolve: 'gatsby-plugin-mailchimp',
    //   options: {
    //     endpoint:
    //       'https://4geeks.us5.list-manage.com/subscribe/post?u=05c88e36fa1e947ec0bf94453&amp;id=02c69b216a', // see instructions section below
    //   },
    // },
    `gatsby-remark-copy-linked-files`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: 'GTM-PFDRR5V',
      },
    },
    {
      resolve: `gatsby-plugin-amp`,
      options: {
        analytics: {
          type: 'gtag',
          dataCredentials: 'include',
          config: {
            vars: {
              gtag_id: 'GTM-PFDRR5V',
              config: {
                'GTM-PFDRR5V': {
                  page_location: '{{pathname}}',
                },
              },
            },
          },
        },
        canonicalBaseUrl: 'https://cobuildlab.com/',
        components: ['amp-form'],
        excludedPaths: ['/404*', '/'],
        pathIdentifier: '/amp/',
        relAmpHtmlPattern: '{{canonicalBaseUrl}}{{pathname}}{{pathIdentifier}}',
        useAmpClientIdApi: true,
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries,
        chunkSize: 10000, // default: 1000
      },
    },
    `gatsby-plugin-styled-components`,
  ],
}