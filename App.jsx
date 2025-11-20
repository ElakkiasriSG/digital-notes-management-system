import React, { useState } from 'react'
import axios from 'axios'

export default function App() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await axios.post('http://localhost:5000/predict', { text })
      setResult(res.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>Fake News Detection (Demo)</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste social media post or news text here"
          rows={6}
        />
        <div>
          <button type="submit" disabled={loading || !text.trim()}>
            {loading ? 'Checking…' : 'Check'}
          </button>
        </div>
      </form>

      {error && <div className="error">Error: {error}</div>}

      {result && (
        <div className="result">
          <h2>Prediction: {result.label}</h2>
          <h3>Probabilities</h3>
          <ul>
            {result.probabilities.map(p => (
              <li key={p.label}>
                {p.label}: {p.value.toFixed(4)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
