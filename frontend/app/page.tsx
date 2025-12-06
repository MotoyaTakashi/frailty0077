'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function TestPage() {
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState('')

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
      console.log('送信されたメッセージ:', inputValue)
      setInputValue('')
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
      </main>

      <footer className={styles.footer}>
        <p>© 2024 テスト画面です。</p>
      </footer>
    </div>
  )
}

