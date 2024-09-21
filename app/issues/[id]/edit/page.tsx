import prisma from '@/prisma/client'
import IssueForm from '../../_components/IssueForm'
import { notFound } from 'next/navigation'

const EditIssuePage = async ({params} : {params: {id: string}}) => {
  const issueDetails = await prisma.issue.findUnique({
    where : {id : parseInt(params.id)}
  })

  if (!issueDetails) notFound()

  const propObject = {title: issueDetails!.title, description: issueDetails!.description}

  return (
    <IssueForm props={issueDetails} />
  )
}

export default EditIssuePage
