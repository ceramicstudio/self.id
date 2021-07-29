# Reading public data

```tsx live
function ShowProfile() {
  const core = new Core('local-clay')
  core
    .getProfile('did:3:kjzl6cwe1jw148tatgct60tsyreuv36uxdyzn29pazvkvmyhz81w39mq70esv3t')
    .then(console.log)
  console.log('core', core)
  return <p>Hello</p>
}
```
