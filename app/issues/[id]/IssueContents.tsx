import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Issue } from '@prisma/client'
import { Heading, Flex, Card, Text } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const IssueContents = ({issueDetails} : {issueDetails: Issue}) => {
  return (
    <>
     <Heading>{issueDetails.title}</Heading>
        <Flex gap="4" my="3" align="center">
          <IssueStatusBadge status={issueDetails!.status} />
          <Text size="2" ml="3">
            {issueDetails.createdAt.toDateString()}
          </Text>
        </Flex>
        <Card mt="7">
          <ReactMarkdown className="prose">
            {issueDetails.description}
          </ReactMarkdown>
        </Card> 
    </>
  )
}

export default IssueContents
