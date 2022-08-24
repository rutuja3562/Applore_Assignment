import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchtoCart, removeItem } from "../../Redux/product/action";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Flex,
  Tr,
  Th,
  Td,
  Button,
  TableContainer,
  Text,
  Heading,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Navigate, useNavigate } from "react-router";
import { Topnavbar } from "../Navbar/Topnavbar";
import displayRazorpay, { Rezor } from "../Rezor";
export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.products.cart);
  // console.log(cart);
  const [cart1, setCart1] = useState([]);
  const [count, setCount] = useState(1);
  useEffect(() => {
    dispatch(fetchtoCart());
    // getData();
  }, [dispatch, cart.length]);
  const handleDelet = (id) => {
    dispatch(removeItem(id));
  };
  // let count = 0;
  let Total = 0;
  let saved = 0;

  const [totalCost, setTotalCost] = useState(0);
  // var total = 0;
  const total = cart.reduce(function (acc, cv) {
    // console.log(cv.price);
    return acc + Math.floor(cv.price);
  }, 0);
  // const getData = () => {
  //   axios({
  //     url: "https://rbigbasket.herokuapp.com/vegetablecart",
  //     method: "GET",
  //   }).then((res) => {
  //     setCart1(res.data);
  //   });
  // };
//  let sum = 0;
//  for (let i = 0; i < cart1.length; i++) {
//    sum += cart1[i].price;
//  }
//  const getDataDelete = () => {
//    // const navigate=useNavigate()
//    axios({
//      url: "https://rbigbasket.herokuapp.com/vegetablecart",
//      method: "DELETE",
//    })
//      .then((res) => {
//       //  dispatch(fetchCart());
//      })
//      .then(() => {
//        navigate("/");
//        //  console.log("hello")
//      });
//  };
//  const razor = () => {
//    displayRazorpay(sum, getDataDelete);
//  };

  return (
    <Box width="100%">
      <Topnavbar />

      <Box width="75%" m={"auto"}>
        <Box
          width="100%"
          margin="auto"
          p="1rem"
          mt="1.5rem"
          border="1px solid #e8e8e8"
          // border="1px solid red"
        >
          <Text
            fontSize={"24px"}
            textAlign={"left"}
            fontWeight={300}
            borderBottom={"1px solid #e8e8e8"}
            pb={"6px"}
          >
            YOUR BASKET {cart.length}
          </Text>
          <TableContainer width="99%">
            <Table variant="simple">
              <Thead width="99%">
                <Tr
                  bg={"#555555"}
                  color={"white"}
                  justifyContent={"space-between"}
                >
                  <Th color={"white"}>ITEM DESCRIPTION</Th>
                  <Th color={"white"}>UNIT PRICE</Th>
                  <Th color={"white"}>QUANTITY</Th>
                  <Th color={"white"}>SUBTOTAL</Th>
                  <Th color={"#555555"}>......</Th>
                  <Th color={"black"} bg={"#c6cc74"}>
                    Saving
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {cart?.map((e) => {
                  {
                    saved =
                      saved +
                      (Math.floor(e.price) -
                        Math.floor(e.price - (10 * e.price) / 100));
                    // console.log("saved",saved)
                  }
                  return (
                    <Tr
                      key={e._id}
                      fontSize={"12px"}
                      justifyContent={"space-between"}
                    >
                      <Td fontSize={"12px"}>
                        {e.brand}
                        <br></br>
                        {e.title}
                      </Td>
                      <Td>
                        Rs {Math.floor(e.price - (10 * e.price) / 100)}
                        <br></br>
                        <span textDecoration={"line-through"}>
                          Rs {Math.floor(e.price)}
                        </span>
                      </Td>
                      <Td>
                        <Button
                          variant={"outline"}
                          m={"2px"}
                          onClick={() => setCount(count - 1)}
                        >
                          -
                        </Button>
                        <Button variant={"outline"} m={"2px"}>
                          {count}
                        </Button>
                        <Button
                          variant={"outline"}
                          m={"2px"}
                          onClick={() => setCount(count + 1)}
                        >
                          +
                        </Button>
                      </Td>
                      <Td>Rs {Math.floor(e.price - (10 * e.price) / 100)}</Td>
                      <Td>
                        <CloseIcon onClick={() => handleDelet(e._id)} />
                      </Td>
                      <Td>
                        {" "}
                        Rs{" "}
                        {Math.floor(
                          e.price - Math.floor(e.price - (10 * e.price) / 100)
                        )}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
          <Flex justifyContent={"space-between"} mt={8}>
            <Box width={"45%"}>
              <Button variant={"outline"} float={"left"} onClick={() => {}}>
                Empty Basket
              </Button>
            </Box>
            <Box width={"45%"} border="1px solid #e8e8e8 ">
              <Flex
                justifyContent={"space-between"}
                p="1rem"
                textAlign={"left"}
                fontSize="14px"
                fontWeight={400}
              >
                <Box>
                  <Text>SubTotal</Text>
                  <Text>Delivery Charges</Text>
                </Box>
                <Box>
                  <Text>Rs {Math.floor(total - saved)}</Text>
                  <Text>***</Text>
                </Box>
                <Box borderLeft={"1px solid #e8e8e8"} color="red" pl="2px">
                  <Text>You saved!</Text>
                  <Text>Rs {Math.floor(saved)}</Text>
                </Box>
              </Flex>
              <Flex
                textAlign={"left"}
                border={"1px solid #e8e8e8"}
                padding="2rem"
                justify={"space-around"}
              >
                <Heading as={"h6"} fontWeight="250">
                  TOTAL{" "}
                </Heading>
                <Heading as={"h6"} fontWeight="250">
                  {" "}
                  RS {Math.floor(total - saved)}
                </Heading>
              </Flex>
              <Box float={"right"}>
                <Rezor />
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
