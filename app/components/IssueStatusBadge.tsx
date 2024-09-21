import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

const statusMap: Record<Status, {color: 'red' | 'blue' | 'green', label: string}> = {
    OPEN: {color: 'red', label:'Open'},
    IN_PROGRESS: {color: 'blue', label:'In Progress'},
    CLOSED: {color: 'green', label:'Closed'},
}

const IssueStatusBadge = ({status} : {status: Status}) => {
  return (
    <Badge size="3" color={statusMap[status].color}>{statusMap[status].label}</Badge>
  )
}

export default IssueStatusBadge
