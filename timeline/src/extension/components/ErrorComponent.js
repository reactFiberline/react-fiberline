import React from 'react'

export function ErrorComponent() {
  return (
    <div style={{ fontWeight: 500, padding: '8px' }}>
      An error occurred while collecting the measures. This is possibly due to
      <ul>
        <li>
          absence of register observer hook in your project.
        </li>
        <br />
        <li>your project is not using React.</li>
      </ul>
      <p>
        If above solutions don't work, then try reloading the plugin or close
        and reopen the inspected window.
      </p>
    </div>
  )
}
