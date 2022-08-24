import React, { useEffect } from "react";
import { addOrder, fetchtoCart } from "../Redux/product/action";
import { useDispatch, useSelector } from "react-redux";
import { Box ,Text} from "@chakra-ui/react";

export const CartLength = () => {
  let data={
    name:"rutuja",
    id:1,
  }
  const cart = useSelector((state) => state.products.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchtoCart());
    // if(cart.length!==0){
    
    // }
  }, []);
  return <Box><Text>{cart.length}</Text></Box>;
};
