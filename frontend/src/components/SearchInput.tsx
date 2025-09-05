import { Input, InputGroup, InputLeftElement, InputRightElement, IconButton } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { useRef, useState } from "react";

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState("");

  const handleClear = () => {
    setSearchText("");
    onSearch(""); // Clear the search results
    if (ref.current) {
      ref.current.value = ""; // Clear the input field
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={20} // Matches the search bar's edge radius
          placeholder="Search programs..."
          variant="filled"
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
            onSearch(event.target.value);
          }}
        />
        {searchText && (
          <InputRightElement>
            <IconButton
              aria-label="Clear search"
              icon={<MdClose />}
              size="sm"
              variant="ghost"
              borderRadius={20} // Ensures the button matches the search bar's radius
              onClick={handleClear}
            />
          </InputRightElement>
        )}
      </InputGroup>
    </form>
  );
};

export default SearchInput;
