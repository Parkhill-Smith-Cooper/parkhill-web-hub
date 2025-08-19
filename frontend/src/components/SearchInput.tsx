import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { useRef } from "react";

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        // search will trigger immediately as the program name is typed or
        deleted text in the search bar
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="Search programs..."
          variant="filled"
          onChange={(event) => onSearch(event.target.value)}
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
