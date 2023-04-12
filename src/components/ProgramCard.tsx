import { Card, CardBody, Heading, Image } from "@chakra-ui/react";
import React from "react";
import { Program } from "../hooks/usePrograms";

interface Props {
  program: Program;
}

const ProgramCard = ({ program }: Props) => {
  return (
    <Card borderRadius={10} overflow="hidden">
      <Image src={program.background_image} />
      <CardBody>
        <Heading fontSize="2xl">{program.name}</Heading>
      </CardBody>
    </Card>
  );
};

export default ProgramCard;
