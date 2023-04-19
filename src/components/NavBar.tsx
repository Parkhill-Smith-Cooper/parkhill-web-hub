import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo_parkhill.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";

const NavBar = () => {
  return (
    <HStack padding="10px">
      <Image width="125px" objectFit="contain" src={logo} alt="Parkhill Logo" />
      <SearchInput />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
