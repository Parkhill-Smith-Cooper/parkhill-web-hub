import { SimpleGrid, Text, Spinner } from "@chakra-ui/react";
import usePrograms from "../hooks/usePrograms";
import ProgramCard from "./ProgramCard";

interface Props {
  selectedSectorId?: string;
  searchText: string;
}

const ProgramGrid = ({ selectedSectorId, searchText }: Props) => {
  const { data: programs, error, isLoading } = usePrograms(selectedSectorId);

  if (error) return <Text>Error loading programs.</Text>;
  if (isLoading) return <Spinner />;

  const filteredPrograms = programs?.filter(
    (program) =>
      program.name.toLowerCase().includes(searchText.toLowerCase()) ||
      program.developer.toLowerCase().includes(searchText.toLowerCase()) ||
      program.description.toLowerCase().includes(searchText.toLowerCase())
  );

  if (!filteredPrograms?.length) return <Text>No programs found.</Text>;

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      spacing={6}
      padding="10px"
    >
      {filteredPrograms.map((program) => (
        <ProgramCard key={program._id} program={program} />
      ))}
    </SimpleGrid>
  );
};

export default ProgramGrid;
