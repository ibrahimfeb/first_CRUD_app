import React from "react";
import {
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import {  gql, useQuery } from "@apollo/client";

const ReadData = () => {
  const GET_LOCATIONS = gql`
    query GetLocations {
      users {
        id
        First_Name
        Last_Name
      }
    }
  `;

  function DisplayLocations() {
    const { loading, error, data } = useQuery(GET_LOCATIONS);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error :(</Text>;

    return data.users.map(({ id, First_Name, Last_Name }) => (
      <Stack key={id}>
        <Flex w={'260px'} justifyContent={'space-between'}>
          <Text>{id}:</Text>
          <Text>{First_Name}</Text>
          <Text>{Last_Name}</Text>
        </Flex>
      </Stack>
    ));
  }

  return <DisplayLocations />;
};

export default ReadData;
