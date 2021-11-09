import { AvatarPlaceholder, useConnection } from '@self.id/framework'

import logo from './logo.svg'
import './App.css'

function App() {
  const [connection, connect] = useConnection()

  const display =
    connection.status === 'connected' ? (
      <AvatarPlaceholder did={connection.selfID.id} size={120} />
    ) : (
      <button
        disabled={connection.status === 'connecting'}
        onClick={() => {
          connect()
        }}>
        Connect
      </button>
    )

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + Self.ID!</p>
        {display}
        <p>
          <a
            className="App-link"
            href="https://developers.ceramic.network/tools/self-id/overview/"
            target="_blank"
            rel="noopener noreferrer">
            Self.ID Docs
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer">
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
