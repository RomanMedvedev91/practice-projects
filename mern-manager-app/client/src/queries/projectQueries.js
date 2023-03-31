import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query qetProjects {
    projects {
      id
      name
      status
    }
  }
`;