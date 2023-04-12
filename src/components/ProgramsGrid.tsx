import { SimpleGrid, Text } from "@chakra-ui/react";
import usePrograms from "../hooks/usePrograms";
import ProgramCard from "./ProgramCard";

const ProgramsGrid = () => {
  const { programs, error } = usePrograms();

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding="10px"
        spacing={10}
      >
        {programs.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default ProgramsGrid;
