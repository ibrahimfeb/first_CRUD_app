import React from "react";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
const CreateData = () => {
  const Add_Data = gql`
    mutation ($fname: String, $lname: String, $i_d: Int, $age: Int) {
      insert_users(
        objects: { First_Name: $fname, Last_Name: $lname, Age: $age, id: $i_d }
      ) {
        returning {
          id
        }
      }
    }
  `;
  const GetInput = ({ isPublic = false }) => {
    const [i_d, setI_d] = useState("");
    const [fname, setFirstName] = useState("");
    const [lname, setLastName] = useState("");
    const [age, setAge] = useState("");

    const [addValues] = useMutation(Add_Data);
    return (
      <Flex justifyContent={"center"} mt={"20px"}>
        <FormControl
          onSubmit={(e) => {
            e.preventDefault();
            addValues({
              variables: {
                i_d: i_d,
                fname: fname,
                lname: lname,
                age: age,
              },
            });
          }}
          w={"300px"}
        >
          <FormLabel>
            Id
            <Input value={i_d} onChange={(e) => setI_d(e.target.value)} />
          </FormLabel>

          <FormLabel>
            First Name
            <Input
              value={fname}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormLabel>

          <FormLabel>
            Last Name
            <Input
              value={lname}
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

          <Button type={"submit"} bg={"blue.300"} color={"white"} mt={"20px"}>
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
