import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo_parkhill.webp";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack justifyContent={"space-between"} padding="10px">
      <Image width="125px" objectFit="contain" src={logo} alt="Parkhill Logo" />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
