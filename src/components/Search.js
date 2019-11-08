import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, SearchBox, connectHits } from 'react-instantsearch-dom'
import {
  Title,
  Subtitle,
  Column,
  Card,
  CardContent,
  Content,
  Tag,
} from 'bloomer'
import { Link } from 'gatsby'
// import { FONTS } from '../constants' // an object of the font family strings in my app
// import { bs } from '../shevy'
import { Icon } from 'react-icons-kit'
import { clockO } from 'react-icons-kit/fa/clockO'

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
)

const Hits = connectHits(({ hits }) => (
  <div css={{ display: 'flex', flexWrap: 'wrap' }}>
    {/* Always use a ternary when coercing an array length */}
    {/* otherwise you might print out "0" to your UI */}
    {hits.length ? (
      <>
        {/* I wanted to give a little explanation of the search here */}
        {/* <div
          css={{
            fontFamily: FONTS.catamaran,
            fontSize: '.85rem',
            fontStyle: 'italic',
            marginBottom: bs(),
            maxWidth: '30rem'
          }}
        >
          These are the results of your search. The title and excerpt are
          displayed, though your search may have been found in the content of
          the post as well.
        </div> */}

        {/* Here is the crux of the component */}
        {hits.map((hit, index) => {
          console.log("hit", hit)            
          // const image =
          //   get(node, 'frontmatter.image.publicURL') || defaultImg
          const splitTags = hit.frontmatter.tags
            ? hit.frontmatter.tags.split(', ')
            : undefined
          const title = hit.frontmatter.title
          return (
            <Column key={index} isSize="1/3">
              {/* <Link to={hit.permalink}> */}
                <Card className="card-p">
                  <CardContent
                    className="card-post"
                    // style={{
                    //   backgroundImage: `url(${image})`,
                    // }}
                  />
                  <Content className="title-post">
                    <small>
                      {' '}
                      <Icon
                        icon={clockO}
                        style={{ paddingTop: 5 }}
                      />{' '}
                      {hit.date}
                    </small>
                    <Subtitle hasTextColor="white">{title}</Subtitle>
                  </Content>
                  <Content className="tag-content">
                    {splitTags && splitTags.length > 0
                      ? splitTags.map((tag, index) => {
                        return (
                          <p className="p-content" key={index}>
                            <Tag className="tag-category">{tag}</Tag>
                          </p>
                        )
                      })
                      : null}
                  </Content>
                </Card>
              {/* </Link> */}
            </Column>
          )
        })}
      </>
    ) : (
        <Column hasTextAlign="centered">
          <Title isSize={3} tag="h3">
            There's no posts in this category
          </Title>
        </Column>
      )}
  </div>
))

const Search = () => {
  return (
    <InstantSearch
      indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
      searchClient={searchClient}
    >
      <SearchBox />
      <Hits />
    </InstantSearch>
  )
}

export default Search;