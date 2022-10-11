import React from "react";
import { useState } from "react";
import { gql, useMutation, mutation } from "@apollo/client";
import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
export const INSERT_DEMO_USERS = gql`
  mutation InsertDemoUsers(
    $first_name: String!
    $last_name: String!
    $age: Int!
    $country: String!
  ) {
    insert_demo_users_one(
      object: {
        first_name: $first_name
        last_name: $last_name
        age: $age
        country: $country
      }
    ) {
      id
      first_name
    }
  }
`;

const CreateData = () => {
  const GetInput = ({ isPublic = false }) => {
    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [country, setCountry] = useState("");
    const [createdOn, setCreatedOn] = useState("");
    const [createdBy, setCreatedBy] = useState("");

    const toast = useToast()
    const [addDemoUser, { loading }] = useMutation(INSERT_DEMO_USERS, {
      variables: {
        first_name: firstName,
        last_name: lastName,
        age: age,
        country: country,
      },
      onCompleted(res) {
        console.log(res);
        toast({
          title: 'Record Added.',
          description: "Record Added Succefully.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      },
      onError(error){
        console.log(error);
        toast({
          title: 'Something Went Wrong.',
          description: "Fail to add.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
    });
    const addNewUser = () => {
      console.log({ firstName });
      console.log({ lastName });
      console.log({ age });
      console.log({ country });
      addDemoUser();
    };
    return (
      <Flex justifyContent={"center"} mt={"20px"}>
        <FormControl w={"300px"}>

          <FormLabel>
            First Name
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormLabel>

          <FormLabel>
            Last Name
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormLabel>

          <FormLabel>
            Age
            <Input
              placeholder="20..."
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </FormLabel>
          <FormLabel>
            Country
            <Input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </FormLabel>

          <Button
            onClick={addNewUser}
            bg={"blue.300"}
            color={"white"}
            mt={"20px"}
            isLoading={loading}
          >
            Submit
          </Button>
        </FormControl>
      </Flex>
    );
  };
  return (
    <>
      <GetInput />
    </>
  );
};
export default CreateData;
