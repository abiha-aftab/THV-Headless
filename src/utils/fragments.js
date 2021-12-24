import { graphql } from 'gatsby'

export const query = graphql`
  fragment page on kontent_item_page {
    system {
      id
      codename
      type
      language
    }
    elements {
      url {
        value
      }
      title {
        value
      }
      show_in_navigation {
        value {
          name
        }
      }
    }
  }
  fragment page_event_landing on kontent_item_event_landing {
    system {
      id
      codename
      type
      language
    }
    elements {
      seo__title {
        value
      }
      seo__slug {
        value
      }
    }
  }
  fragment image on kontent_item_image {
    elements {
      image_alt {
        value
      }
      image {
        value {
          url
          width
          height
        }
      }
    }
  }
  fragment link on kontent_item_link {
    elements {
      title {
        value
      }
      url {
        value
      }
    }
  }
`
