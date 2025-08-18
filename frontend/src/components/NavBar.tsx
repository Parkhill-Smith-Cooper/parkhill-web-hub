import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo_parkhill.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  return (
    <HStack padding="10px" spacing={5}>
      <Image width="125px" objectFit="contain" src={logo} alt="Parkhill Logo" />
      <SearchInput onSearch={onSearch} />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
