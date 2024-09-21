import NextLink from 'next/link';
import { Link as RadixLink } from '@radix-ui/themes'; 

interface Props {
    href: string;
    childern: string;
}

const Link = ({href, childern}: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
        <RadixLink>
            {childern}
        </RadixLink>
    </NextLink>
  )
}

export default Link
