import React from "react";
import { useQuery } from "@apollo/client";
import { USER_GET } from "../graphql/users";

const Profile = ({username}) => {
  const { data, loading, error } = useQuery(USER_GET, {
    variables: { username: "israelito" },
  });
  if (loading) return null;
  //if (error) return <p>Usuario no encontrado</p>;
  console.log(data);
  return (
    <div>
      desde profile
      <p>otro linea</p>
    </div>
  );
};

export default Profile;
