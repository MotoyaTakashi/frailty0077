'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'
import { apiClient, type Message } from '../lib/api'

export default function TestPage() {
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 初期化時にカウンターとメッセージを取得
  useEffect(() => {
    loadCounter()
    loadMessages()
  }, [])

  const loadCounter = async () => {
    try {
      const response = await apiClient.getCounter()
      setCount(response.value)
    } catch (err) {
      console.error('カウンターの取得に失敗しました:', err)
      setError('API接続エラー: バックエンドサーバーが起動しているか確認してください')
    }
  }

  const loadMessages = async () => {
    try {
      const response = await apiClient.getMessages()
      setMessages(response.messages)
    } catch (err) {
      console.error('メッセージの取得に失敗しました:', err)
    }
  }

  const handleIncrement = async () => {
    try {
      setLoading(true)
      const response = await apiClient.incrementCounter()
      setCount(response.value)
      setError(null)
    } catch (err) {
      console.error('カウンターの増加に失敗しました:', err)
      setError('API接続エラー')
    } finally {
      setLoading(false)
    }
  }

  const handleDecrement = async () => {
    try {
      setLoading(true)
      const response = await apiClient.decrementCounter()
      setCount(response.value)
      setError(null)
    } catch (err) {
      console.error('カウンターの減少に失敗しました:', err)
      setError('API接続エラー')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async () => {
    try {
      setLoading(true)
      const response = await apiClient.resetCounter()
      setCount(response.value)
      setError(null)
    } catch (err) {
      console.error('カウンターのリセットに失敗しました:', err)
      setError('API接続エラー')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      try {
        setLoading(true)
        await apiClient.createMessage(inputValue.trim())
        setInputValue('')
        await loadMessages()
        setError(null)
      } catch (err) {
        console.error('メッセージの送信に失敗しました:', err)
        setError('メッセージの送信に失敗しました')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Next.js テスト画面</h1>
        <p className={styles.description}>
          このページはNext.jsの動作確認用のテスト画面です
        </p>
      </header>

      <main className={styles.main}>
        {error && (
          <section className={styles.section}>
            <div style={{ padding: '1rem', background: '#fee', color: '#c33', borderRadius: '8px' }}>
              <strong>エラー:</strong> {error}
            </div>
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>カウンター機能</h2>
          <div className={styles.counterContainer}>
            <button
              className={styles.button}
              onClick={handleDecrement}
              aria-label="減らす"
              disabled={loading}
            >
              -
            </button>
            <span className={styles.counter}>{count}</span>
            <button
              className={styles.button}
              onClick={handleIncrement}
              aria-label="増やす"
              disabled={loading}
            >
              +
            </button>
          </div>
          <button
            className={`${styles.button} ${styles.resetButton}`}
            onClick={handleReset}
            disabled={loading}
          >
            リセット
          </button>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>入力フォーム</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="メッセージを入力..."
              className={styles.input}
              disabled={loading}
            />
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? '送信中...' : '送信'}
            </button>
          </form>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>メッセージ一覧</h2>
          {messages.length === 0 ? (
            <p className={styles.emptyMessage}>メッセージがありません</p>
          ) : (
            <>
              <ul className={styles.messageList}>
                {messages.map((message) => (
                  <li key={message.id} className={styles.messageItem}>
                    {message.content}
                  </li>
                ))}
              </ul>
              <button
                className={`${styles.button} ${styles.clearButton}`}
                onClick={async () => {
                  try {
                    setLoading(true)
                    await apiClient.deleteAllMessages()
                    await loadMessages()
                    setError(null)
                  } catch (err) {
                    console.error('メッセージの削除に失敗しました:', err)
                    setError('メッセージの削除に失敗しました')
                  } finally {
                    setLoading(false)
                  }
                }}
                disabled={loading}
              >
                すべて削除
              </button>
            </>
          )}
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© 2024 テスト画面です。</p>
      </footer>
    </div>
  )
}

