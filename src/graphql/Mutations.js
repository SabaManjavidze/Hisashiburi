import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($user_name: String!, $user_id: Int!, $picture: String!) {
    createUser(user_id: $user_id, user_name: $user_name, picture: $picture) {
      user_name
    }
  }
`;

export const REMOVE_READ_MANGA = gql`
  mutation RemoveReadManga($user_id: Float!, $manga_id: String!) {
    removeReadManga(options: { user_id: $user_id, manga_id: $manga_id })
  }
`;
export const CREATE_READ_MANGA = gql`
  mutation createReadManga(
    $user_id: Float!
    $manga_id: String!
    $last_read_chapter: String!
    $read_date: String!
  ) {
    createReadManga(
      options: { user_id: $user_id, manga_id: $manga_id }
      last_read_chapter: $last_read_chapter
      read_date: $read_date
    )
  }
`;
export const CREATE_MANGA = gql`
  mutation createManga($title: String!, $manga_id: String!) {
    createManga(title: $title, manga_id: $manga_id)
  }
`;
