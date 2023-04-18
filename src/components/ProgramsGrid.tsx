import { SimpleGrid, Text } from "@chakra-ui/react";
import usePrograms from "../hooks/usePrograms";
import ProgramCard from "./ProgramCard";
import ProgramCardContainer from "./ProgramCardContainer";
import ProgramCardSkeleton from "./ProgramCardSkeleton";

const ProgramsGrid = () => {
  const { data, error, isLoading } = usePrograms();
  const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding="10px"
        spacing={3}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <ProgramCardContainer>
              <ProgramCardSkeleton key={skeleton} />
            </ProgramCardContainer>
          ))}
        {data.map((program) => (
          <ProgramCardContainer>
            <ProgramCard key={program.id} program={program} />
          </ProgramCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default ProgramsGrid;
