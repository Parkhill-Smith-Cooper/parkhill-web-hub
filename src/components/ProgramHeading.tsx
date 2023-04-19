import { Heading } from "@chakra-ui/react";
import { ProgramQuery } from "../App";

interface Props {
  programQuery: ProgramQuery;
}

const ProgramHeading = ({ programQuery }: Props) => {
  //Games
  //Action Games
  //Xbox Games
  //Xbox Action Games
  const heading = `${programQuery.platform?.name || ""} ${
    programQuery.genre?.name || ""
  } Programs`;

  return (
    <Heading as="h1" marginY={5} fontSize="5xl">
      {heading}
    </Heading>
  );
};

export default ProgramHeading;
