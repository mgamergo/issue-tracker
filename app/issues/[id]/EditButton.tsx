import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const EditButton = ({id} : {id: number}) => {
  return (
    <Link href={`/issues/${id}/edit`}>
        <Button style={{cursor: "pointer", paddingInline: "2.2rem"}}>
            <Pencil2Icon />
            Edit
        </Button>
    </Link>
  )
}

export default EditButton
