// Jestのセットアップファイル
import '@testing-library/jest-dom'

// fetchのモック（必要に応じて）
global.fetch = jest.fn()

// テスト後のクリーンアップ
afterEach(() => {
  jest.clearAllMocks()
})

