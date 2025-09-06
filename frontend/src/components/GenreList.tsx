import {
  List,
  ListItem,
  Heading,
  Text,
  Spinner,
  Button,
  Divider,
} from "@chakra-ui/react";
import useSectors from "../hooks/useSectors";

interface Props {
  onSelectSector: (sectorId: string | undefined) => void;
  selectedSectorId?: string;
}

const GenreList = ({ onSelectSector, selectedSectorId }: Props) => {
  const { data: sectors, error, isLoading } = useSectors();

  if (error) return null;
  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading fontSize="2xl" marginBottom={3}>
        Sectors
      </Heading>
      <List>
        <ListItem paddingY="5px">
          <Button
            whiteSpace="normal"
            textAlign="left"
            fontWeight={!selectedSectorId ? "bold" : "normal"}
            onClick={() => onSelectSector(undefined)}
            variant="link"
            fontSize="lg"
          >
            All Sectors
          </Button>
        </ListItem>
        <Divider my={2} />
        {sectors?.map((sector) => (
          <ListItem key={sector._id} paddingY="5px">
            <Button
              whiteSpace="normal"
              textAlign="left"
              fontWeight={sector._id === selectedSectorId ? "bold" : "normal"}
              onClick={() => onSelectSector(sector._id)}
              variant="link"
              fontSize="lg"
            >
              {sector.name}
            </Button>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
