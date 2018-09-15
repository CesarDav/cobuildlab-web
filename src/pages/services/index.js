import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import {
  Hero,
  HeroBody,
  Container,
  Title,
  HeroFooter,
  Tabs,
  TabList,
  Tab,
  TabLink,
  Subtitle,
  Columns,
  Column,
  Card,
  CardContent,
  Content,
  Tag,
} from 'bloomer'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = 'Services | Cobuild Lab'
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )

    return (
      <React.Fragment>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />

        <Hero isColor="info" isSize="small">
          <HeroBody>
            <Container hasTextAlign="centered">
              <Columns isCentered>
                <Column>
                  <Title isSize={1} hasTextColor="black">
                    Our Services
                  </Title>
                  <hr />
                </Column>
              </Columns>
            </Container>
          </HeroBody>
        </Hero>

        <Container>
          <Columns>
            <Column>
              <Title isSize={2} hasTextColor="black">
                Cobuild: Product Development
              </Title>
              <Subtitle isSize={5}>
                Cobuild Is the process of transforming an idea in a sustainable
                business, through the combination and collaboration of the areas
                of Lean Entrepreneurship, Business Strategy, Technological
                Innovation, and Exponential Growth.
              </Subtitle>
              <p>
                In this process, we evaluate your idea and help you shape it
                into a Value Proposition, and test it if necessary. After that,
                we design together the first version of your product with the
                purpose of Market Validation, or Product Market Fit to test if
                we satisfy the need that we intend to satisfy and to acquire our
                first Customers. From this point and forward we focus on
                improving the experience, acquire customer and growth.
              </p>
            </Column>
          </Columns>

          <Columns>
            <Column>
              <Title isSize={2} hasTextColor="black">
                Software Development
              </Title>
              <Subtitle isSize={5}>
                We transform requirements into computer programs. We specialize
                in building websites, web applications, and mobiles
                applications.
              </Subtitle>
              <p>
                Software development is the process of conceiving, specifying,
                designing, programming, documenting, testing, and bug fixing
                involved in creating and maintaining applications, frameworks,
                or other software components. Software development is a process
                of writing and maintaining the source code, but in a broader
                sense, it includes all that is involved between the conception
                of the desired software through to the final manifestation of
                the software, sometimes in a planned and structured process With
                our streamlined, lean and phased Process we achieve incredible
                results. Since day one, our technique is focused on early
                results and transparent communication.
              </p>
            </Column>
          </Columns>

          <Columns>
            <Column>
              <Title isSize={2} hasTextColor="black">
                Digital Transformation
              </Title>
              <Subtitle isSize={5}>
                Digital transformation is the process of innovative revolution
                driven by the rapid adoption of technologies in all aspects of
                our daily life.
              </Subtitle>
              <p>
                Leverage the technology to disrupt current processes could be a
                challenging job, this is where experience and innovation merge
                to produce a highly efficient outcome to move your company
                forward in the market.
              </p>
            </Column>
          </Columns>
        </Container>
      </React.Fragment>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
