import { Text } from "@chakra-ui/react";
import usePrograms from "../hooks/usePrograms";

const ProgramsGrid = () => {
  const { programs, error } = usePrograms();

  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {programs.map((program) => (
          <li key={program.id}>{program.name}</li>
        ))}
      </ul>
    </>
  );
};

export default ProgramsGrid;
