import ogImage from '../images/opengraph-large.png'

const title = 'Self.ID'
const description =
  'Self.ID is your universal profile and avatar for the Web3 metaverse – 100% owned by you.'

export default function OpenGraphMeta() {
  return (
    <>
      <meta name="twitter:site" content="@mySelfID" />
      <meta name="twitter:title" content={title} />
      <meta property="og:title" content={title} />
      <meta name="description" content={description} />
      <meta name="twitter:description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage.src} />
      <meta name="twitter:image:alt" content="Be Your Self" />
      <meta property="og:image" content={ogImage.src} />
    </>
  )
}
