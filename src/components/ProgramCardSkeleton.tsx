import { Card, Skeleton, SkeletonText } from "@chakra-ui/react";

const ProgramCardSkeleton = () => {
  return (
    <Card width="300px" borderRadius={10} overflow="hidden">
      <Skeleton height="200px" />
      <Card>
        <SkeletonText />
      </Card>
    </Card>
  );
};

export default ProgramCardSkeleton;
