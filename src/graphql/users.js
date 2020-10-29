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
