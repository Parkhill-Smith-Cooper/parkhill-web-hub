import { Card, CardBody, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Program } from "../hooks/usePrograms";
import PlatformIconList from "./PlatformIconList";

interface Props {
  program: Program;
}

const ProgramCard = ({ program }: Props) => {
  return (
    <Card borderRadius={10} overflow="hidden">
      <Image src={program.background_image} />
      <CardBody>
        <Heading fontSize="2xl">{program.name}</Heading>
        <PlatformIconList
          platforms={program.parent_platforms.map((p) => p.platform)}
        />
      </CardBody>
    </Card>
  );
};

export default ProgramCard;
