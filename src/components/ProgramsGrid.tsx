import { SimpleGrid, Text } from "@chakra-ui/react";
import { ProgramQuery } from "../App";
import { Genre } from "../hooks/useGenres";
import usePrograms, { Platform } from "../hooks/usePrograms";
import ProgramCard from "./ProgramCard";
import ProgramCardContainer from "./ProgramCardContainer";
import ProgramCardSkeleton from "./ProgramCardSkeleton";

interface Props {
  programQuery: ProgramQuery;
}

const ProgramsGrid = ({ programQuery }: Props) => {
  const { data, error, isLoading } = usePrograms(programQuery);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
            <ProgramCardContainer key={skeleton}>
              <ProgramCardSkeleton />
            </ProgramCardContainer>
          ))}
        {data.map((program) => (
          <ProgramCardContainer key={program.id}>
            <ProgramCard program={program} />
          </ProgramCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default ProgramsGrid;
