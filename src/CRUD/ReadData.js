import {
  Box,
  Flex,
  TableContainer,
  Table,
  Tbody,
  Thead,
  Stack,
  Tr,
  Th,
  Text,
  Td,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogFooter,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";
import { useRef } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { EditIcon } from "@chakra-ui/icons";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";

const ReadData = () => {
  const GET_DEMO_USERS = gql`
    query get_demo_users {
      demo_users {
        id
        first_name
        last_name
        age
        country
        created_on
        created_by
      }
    }
  `;
  const INSERT_DEMO_USERS = gql`
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
  // update query
  const UPDATE_DEMO_USERS = gql`
    mutation UpdateDemoUsers(
      $id: Int!
      $first_name: String!
      $last_name: String!
      $age: Int!
      $country: String!
    ) {
      update_demo_users_by_pk(
        pk_columns: { id: $id }
        _set: {
          id: $id
          first_name: $first_name
          last_name: $last_name
          age: $age
          country: $country
        }
      ) {
        id
      }
    }
  `;
  // End update query

  // delete data
const DELETE_DEMO_USERS = gql`
    mutation deleteDemoUsers($id: Int!) {
      delete_demo_users_by_pk(id: $id) {
        id
      }
    }
  `;
  // End delete data

  // delete function
  function DeleteDemoUsers(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [deleteDemoUsers] = useMutation(DELETE_DEMO_USERS);
    const toast = useToast();

    const cancelRef = useRef(null);

    const onDeleteHandler = () => {
      deleteDemoUsers({
        variables: {
          id: props.id,
        },
        refetchQueries: [{ query: GET_DEMO_USERS }],
      });

      onClose();
      toast({
        title: `${props.first_name} Deleted.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    };
    return (
      <>
        <Button
          colorScheme="red"
          onClick={onOpen}
          size="md"
          p={1}
          mb={0.5}
          w="fit-content"
        >
          <DeleteIcon />
        </Button>

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Demo User
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You want to delete{" "}
                <Box
                  textTransform="capitalize"
                  display="inline"
                  fontWeight="bolder"
                >
                  {props.first_name}
                </Box>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={onDeleteHandler} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    );
  }

  // End delete function

  // Update Section
  const UpdateDemoUsers = (props) => {
    const [updateId,setUpdateId] = useState(props.id)
    const [updateFirstName, setUpdateFirstName] = useState(props.first_name);
    const [updateLastName, setUpdateLastName] = useState(props.last_name);
    const [updateAge, setUpdateAge] = useState(props.age);
    const [updateCountry, setUpdateCountry] = useState(props.country);
    const toast = useToast();
    const {
      isOpen: isUpdateOpen,
      onOpen: onUpdateOpen,
      onClose: onUpdateClose,
    } = useDisclosure();
 
    const [updateDemoUsers, { loading, error, reset }] =
      useMutation(UPDATE_DEMO_USERS);

    const onUpdateHandler = () => {
      updateDemoUsers({
        variables: {
          id:updateId,
          first_name: updateFirstName,
          last_name: updateLastName,
          age: updateAge,
          country: updateCountry,
        },
        refetchQueries: [{ query: GET_DEMO_USERS }],
      });
      if (loading) {
        console.log("Submitting");
      } else if (error) {
        toast({
          title: `${error.message}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        reset();
        onUpdateClose();
        toast({
          title: `${props.first_name} Updated`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    return (
      <>
        <Button
          onClick={onUpdateOpen}
          bg="#294652"
          color="white"
          size="md"
          p={1}
          w="fit-content"
        >
          <EditIcon />
        </Button>

        {/* model */}
        <Modal isOpen={isUpdateOpen} onClose={onUpdateClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Demo User</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <SimpleGrid width="full" columns={1} columnGap={3} rowGap={6}>
                <Stack>
                  <form onSubmit={onUpdateHandler}>
                    <FormControl>
                      <FormLabel htmlFor="name">First Name</FormLabel>
                      <Input
                        type="text"
                        id="name"
                        value={updateFirstName}
                        placeholder="John Doe"
                        onChange={(e) => setUpdateFirstName(e.target.value)}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel mt={2}>Last Name</FormLabel>
                      <Input
                        value={updateLastName}
                        onChange={(e) => setUpdateLastName(e.target.value)}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel mt={2}>Age</FormLabel>
                      <Input
                        value={updateAge}
                        type="text"
                        onChange={(e) => setUpdateAge(e.target.value)}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel mt={2}>Country</FormLabel>
                      <Input
                        value={updateCountry}
                        type="text"
                        onChange={(e) => setUpdateCountry(e.target.value)}
                      />
                    </FormControl>
                    <Flex mt={3} ml="auto">
                      <Button
                        mr={2}
                        colorScheme="blue"
                        isLoading={loading}
                        type="submit"
                      >
                        Update Demo User
                      </Button>
                      <Button variant="ghost" onClick={onUpdateClose}>
                        Cancel
                      </Button>
                    </Flex>
                  </form>
                </Stack>
              </SimpleGrid>
            </ModalBody>
          </ModalContent>
        </Modal>
        {/* End model */}
      </>
    );
  };
  // End Update Section
  function DisplayLocations() {
    const { loading, error, data, refetch } = useQuery(GET_DEMO_USERS);

    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [country, setCountry] = useState("");
    const [createdOn, setCreatedOn] = useState("");
    const [createdBy, setCreatedBy] = useState("");

    const toast = useToast();
    const [addDemoUser, { loading: insertLoading }] = useMutation(
      INSERT_DEMO_USERS,
      {
        variables: {
          first_name: firstName,
          last_name: lastName,
          age: age,
          country: country,
        },
        onCompleted(res) {
          console.log(res);
          toast({
            title: "Record Added.",
            description: "Record Added Succefully.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          refetch();
          setFirstName("");
          setLastName("");
          setAge("");
          setCountry("");
        },
        onError(error) {
          console.log(error);
          toast({
            title: "Something Went Wrong.",
            description: "Fail to add.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        },
      }
    );
    const addNewUser = () => {
      console.log({ firstName });
      console.log({ lastName });
      console.log({ age });
      console.log({ country });
      addDemoUser();
    };

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error :(</Text>;

    return (
      <Stack>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>First name</Th>
                <Th>Last name</Th>
                <Th>Age</Th>
                <Th>Country</Th>
                <Th>Created on</Th>
                <Th>Created by</Th>
                <Th>Delete</Th>
                <Th>Update</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data
                ? data.demo_users.map(
                    ({
                      id,
                      first_name,
                      last_name,
                      age,
                      country,
                      created_on,
                      created_by,
                    }) => (
                      <Tr>
                        <Td>{id}</Td>
                        <Td>{first_name}</Td>
                        <Td>{last_name}</Td>
                        <Td>{age}</Td>
                        <Td>{country}</Td>
                        <Td>{created_on}</Td>
                        <Td>{created_by}</Td>
                        <Td>
                          <DeleteDemoUsers id={id} first_name={first_name} />
                        </Td>
                        <Td>
                          <UpdateDemoUsers
                            id={id}
                            first_name={first_name}
                            last_name={last_name}
                            age={age}
                            country={country}
                          />
                        </Td>
                      </Tr>
                    )
                  )
                : ""}
            </Tbody>
          </Table>
        </TableContainer>

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
      </Stack>
    );
  }

  return <DisplayLocations />;
};

export default ReadData;
