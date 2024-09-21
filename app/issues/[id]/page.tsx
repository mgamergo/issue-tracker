import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditButton from "./EditButton";
import IssueContents from "./IssueContents";
import DeleteButton from "./DeleteButton";

const page = async ({ params }: { params: { id: string } }) => {
  const issueDetails = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issueDetails) notFound()
  return (
    <Grid columns={{initial: "1", md: "2"}} gap="8">
      <Box>
        <IssueContents issueDetails={issueDetails} />
      </Box>
      <Flex direction="column" align="start" gap="3">
        <EditButton id={parseInt(params.id)} />
        <DeleteButton id={parseInt(params.id)} />
      </Flex>
    </Grid>
  );
};

export default page;
