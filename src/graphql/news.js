import { gql } from "@apollo/client";

export const GET_NEWS = gql`
  query GetNews {
    news {
      id
      title
      description
      image
      date
    }
  }
`;
