import { gql } from "@apollo/client";

export const USER_REGISTER = gql`
  mutation UserRegister($input: UserInput!) {
    createUser(input: $input) {
      ok
      message
      data
    }
  }
`;

export const LOGIN = gql`
  mutation SingUp($input: LoginUserInput!) {
    login(input: $input) {
      ok
      message
      token
    }
  }
`;

export const USER_GET = gql`
  query getUser($username: String) {
    getUser(username: $username) {
      id
      name
      username
      email
      photo
      updateAt
      createAt
      lastLogin
      status
    }
  }
`;
