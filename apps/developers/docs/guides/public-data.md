# Reading public data

```tsx live noInline
// import { usePublicRecord } from '@self.id/framework'

function ShowProfileName({ did }) {
  const profileRecord = usePublicRecord('basicProfile', did)

  const text = profileRecord.isLoading
    ? 'Loading...'
    : profileRecord.content
    ? `Hello ${profileRecord.content.name || 'stranger'}`
    : 'No profile to load'
  return <p>{text}</p>
}

render(
  <ShowProfileName did="did:3:kjzl6cwe1jw148tatgct60tsyreuv36uxdyzn29pazvkvmyhz81w39mq70esv3t" />
)
```
