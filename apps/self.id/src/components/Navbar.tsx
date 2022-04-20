import { Box } from 'grommet'
import dynamic from 'next/dynamic'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { forwardRef } from 'react'
import type { ForwardedRef, MouseEventHandler } from 'react'

import logo from '../images/logo.svg'

const AccountButton = dynamic(() => import('./client/AccountButton'), {
  ssr: false,
})

type LogoProps = {
  onClick?: MouseEventHandler<HTMLAnchorElement>
  href?: string
}

const Logo = forwardRef(function LogoImage(
  { onClick, href }: LogoProps,
  ref: ForwardedRef<HTMLAnchorElement>
) {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      <Image src={logo as StaticImageData} alt="Self.ID" />
    </a>
  )
})

export default function Navbar() {
  return (
    <Box background="white" direction="row" height="80px" pad={{ horizontal: 'medium' }}>
      <Box flex={false} align="center" justify="center">
        <Link href="/" passHref>
          <Logo />
        </Link>
      </Box>
      <Box flex="grow" align="end" justify="center">
        <AccountButton />
      </Box>
    </Box>
  )
}
