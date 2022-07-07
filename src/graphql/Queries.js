import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers($user_id: Int!) {
    getUsers(user_id: $user_id) {
      user_id
      user_name
      manga {
        manga_details {
          title
          manga_id
          img_url
        }
        read_date
        last_read_chapter
      }
    }
  }
`;

export const GET_READ_MANGA = gql`
  query GetReadManga($manga_id: String!, $user_id: Float!) {
    getReadManga(options: { user_id: $user_id, manga_id: $manga_id }) {
      manga_id
      user_id
      read_date
      last_read_chapter
    }
  }
`;
