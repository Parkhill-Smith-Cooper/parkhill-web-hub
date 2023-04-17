import { SimpleGrid, Text } from "@chakra-ui/react";
import usePrograms from "../hooks/usePrograms";
import ProgramCard from "./ProgramCard";
import ProgramCardSkeleton from "./ProgramCardSkeleton";

const ProgramsGrid = () => {
  const { programs, error, isLoading } = usePrograms();
  const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding="10px"
        spacing={10}
      >
        {isLoading &&
          skeletons.map((skeleton) => <ProgramCardSkeleton key={skeleton} />)}
        {programs.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default ProgramsGrid;
