'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function TestPage() {
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<string[]>([])

  const handleIncrement = () => {
    setCount(count + 1)
  }

  const handleDecrement = () => {
    setCount(count - 1)
  }

  const handleReset = () => {
    setCount(0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      setMessages([...messages, inputValue])
      setInputValue('')
    }
  }

  const clearMessages = () => {
    setMessages([])
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
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>カウンター機能</h2>
          <div className={styles.counterContainer}>
            <button
              className={styles.button}
              onClick={handleDecrement}
              aria-label="減らす"
            >
              -
            </button>
            <span className={styles.counter}>{count}</span>
            <button
              className={styles.button}
              onClick={handleIncrement}
              aria-label="増やす"
            >
              +
            </button>
          </div>
          <button
            className={`${styles.button} ${styles.resetButton}`}
            onClick={handleReset}
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
            />
            <button type="submit" className={styles.button}>
              送信
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
                {messages.map((message, index) => (
                  <li key={index} className={styles.messageItem}>
                    {message}
                  </li>
                ))}
              </ul>
              <button
                className={`${styles.button} ${styles.clearButton}`}
                onClick={clearMessages}
              >
                すべて削除
              </button>
            </>
          )}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>システム情報</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>フレームワーク:</span>
              <span className={styles.infoValue}>Next.js</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>React:</span>
              <span className={styles.infoValue}>18.3.1</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>レンダリング:</span>
              <span className={styles.infoValue}>Client Component</span>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© 2024 テスト画面</p>
      </footer>
    </div>
  )
}

