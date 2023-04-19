import { Card, CardBody, Heading, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Program } from "../hooks/usePrograms";
import getCroppedImageUrl from "../services/image-url";
import CriticScore from "./CriticScore";
import PlatformIconList from "./PlatformIconList";

interface Props {
  program: Program;
}

const ProgramCard = ({ program }: Props) => {
  return (
    <Card>
      <Image src={getCroppedImageUrl(program.background_image)} />
      <CardBody>
        <HStack justifyContent="space-between" marginBottom={3}>
          <PlatformIconList
            platforms={program.parent_platforms.map((p) => p.platform)}
          />
          <CriticScore score={program.metacritic} />
        </HStack>
        <Heading fontSize="2xl">{program.name}</Heading>
      </CardBody>
    </Card>
  );
};

export default ProgramCard;
