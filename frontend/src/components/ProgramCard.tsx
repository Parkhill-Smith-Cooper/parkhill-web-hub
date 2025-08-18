import {
  Card,
  CardBody,
  Heading,
  Image,
  Text,
  HStack,
  Tag,
  useColorModeValue,
  Button,
  Link,
  Box,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Program } from "../services/api-client";

interface Props {
  program: Program;
}

const ProgramCard = ({ program }: Props) => {
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Card
      backgroundColor={cardBg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      height="100%"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "lg",
        transition: "all 0.2s",
      }}
    >
      <VStack height="100%" align="stretch" spacing={0}>
        <Box height="200px" overflow="hidden">
          {" "}
          {/* Fixed height container */}
          <Image
            src={program.imageUrl}
            alt={program.name}
            width="100%"
            height="200px"
            objectFit="cover"
            objectPosition="center"
          />
        </Box>
        <CardBody display="flex" flexDirection="column" flex="1">
          <Box flex="1">
            <Heading fontSize="2xl">{program.name}</Heading>
            <Text color="red.500" fontSize="lg" fontWeight="semibold">
              {program.developer}
            </Text>
            <Text marginY={2}>{program.description}</Text>
            <HStack marginY={3} spacing={2} flexWrap="wrap">
              {program.sectors.map((sector) => (
                <Tag
                  key={sector._id}
                  colorScheme="red"
                  size="md"
                  borderRadius="full"
                >
                  {sector.name}
                </Tag>
              ))}
            </HStack>
          </Box>
          {program.websiteUrl && (
            <Link
              href={program.websiteUrl}
              isExternal
              display="flex"
              justifyContent="center"
              marginTop={4}
              _hover={{ textDecoration: "none" }}
            >
              <Button
                rightIcon={<ExternalLinkIcon />}
                colorScheme="red"
                variant="outline"
                size="sm"
                borderRadius="full"
                px={6}
              >
                Website
              </Button>
            </Link>
          )}
        </CardBody>
      </VStack>
    </Card>
  );
};

export default ProgramCard;
