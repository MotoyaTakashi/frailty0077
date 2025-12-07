import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TestPage from '../page'
import { apiClient } from '../../lib/api'

// APIクライアントをモック
jest.mock('../../lib/api', () => ({
  apiClient: {
    getCounter: jest.fn(),
    getMessages: jest.fn(),
    incrementCounter: jest.fn(),
    decrementCounter: jest.fn(),
    resetCounter: jest.fn(),
    createMessage: jest.fn(),
    deleteAllMessages: jest.fn(),
  },
}))

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>

describe('TestPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockApiClient.getCounter.mockResolvedValue({ value: 0 })
    mockApiClient.getMessages.mockResolvedValue({ messages: [] })
  })

  it('ページが正しくレンダリングされる', async () => {
    render(<TestPage />)

    expect(screen.getByText('Next.js テスト画面')).toBeInTheDocument()
    expect(screen.getByText('このページはNext.jsの動作確認用のテスト画面です')).toBeInTheDocument()
    expect(screen.getByText('カウンター機能')).toBeInTheDocument()
    expect(screen.getByText('入力フォーム')).toBeInTheDocument()
    expect(screen.getByText('メッセージ一覧')).toBeInTheDocument()
  })

  it('初期化時にカウンターとメッセージを取得する', async () => {
    render(<TestPage />)

    await waitFor(() => {
      expect(mockApiClient.getCounter).toHaveBeenCalledTimes(1)
      expect(mockApiClient.getMessages).toHaveBeenCalledTimes(1)
    })
  })

  it('カウンターを増やすことができる', async () => {
    mockApiClient.incrementCounter.mockResolvedValue({ value: 1 })
    render(<TestPage />)

    await waitFor(() => {
      expect(screen.getByText('0')).toBeInTheDocument()
    })

    const incrementButton = screen.getByLabelText('増やす')
    await userEvent.click(incrementButton)

    await waitFor(() => {
      expect(mockApiClient.incrementCounter).toHaveBeenCalledTimes(1)
      expect(screen.getByText('1')).toBeInTheDocument()
    })
  })

  it('カウンターを減らすことができる', async () => {
    mockApiClient.getCounter.mockResolvedValue({ value: 5 })
    mockApiClient.decrementCounter.mockResolvedValue({ value: 4 })
    render(<TestPage />)

    await waitFor(() => {
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    const decrementButton = screen.getByLabelText('減らす')
    await userEvent.click(decrementButton)

    await waitFor(() => {
      expect(mockApiClient.decrementCounter).toHaveBeenCalledTimes(1)
      expect(screen.getByText('4')).toBeInTheDocument()
    })
  })

  it('カウンターをリセットできる', async () => {
    mockApiClient.getCounter.mockResolvedValue({ value: 10 })
    mockApiClient.resetCounter.mockResolvedValue({ value: 0 })
    render(<TestPage />)

    await waitFor(() => {
      expect(screen.getByText('10')).toBeInTheDocument()
    })

    const resetButton = screen.getByText('リセット')
    await userEvent.click(resetButton)

    await waitFor(() => {
      expect(mockApiClient.resetCounter).toHaveBeenCalledTimes(1)
      expect(screen.getByText('0')).toBeInTheDocument()
    })
  })

  it('メッセージを送信できる', async () => {
    const newMessage = { id: 1, content: 'テストメッセージ' }
    mockApiClient.createMessage.mockResolvedValue(newMessage)
    mockApiClient.getMessages
      .mockResolvedValueOnce({ messages: [] })
      .mockResolvedValueOnce({ messages: [newMessage] })

    render(<TestPage />)

    const input = screen.getByPlaceholderText('メッセージを入力...')
    const submitButton = screen.getByText('送信')

    await userEvent.type(input, 'テストメッセージ')
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(mockApiClient.createMessage).toHaveBeenCalledWith('テストメッセージ')
      expect(mockApiClient.getMessages).toHaveBeenCalledTimes(2)
    })
  })

  it('メッセージ一覧が表示される', async () => {
    const messages = [
      { id: 1, content: 'メッセージ1' },
      { id: 2, content: 'メッセージ2' },
    ]
    mockApiClient.getMessages.mockResolvedValue({ messages })

    render(<TestPage />)

    await waitFor(() => {
      expect(screen.getByText('メッセージ1')).toBeInTheDocument()
      expect(screen.getByText('メッセージ2')).toBeInTheDocument()
    })
  })

  it('メッセージがない場合に適切なメッセージを表示する', async () => {
    mockApiClient.getMessages.mockResolvedValue({ messages: [] })

    render(<TestPage />)

    await waitFor(() => {
      expect(screen.getByText('メッセージがありません')).toBeInTheDocument()
    })
  })

  it('すべてのメッセージを削除できる', async () => {
    const messages = [{ id: 1, content: '削除されるメッセージ' }]
    mockApiClient.getMessages
      .mockResolvedValueOnce({ messages })
      .mockResolvedValueOnce({ messages: [] })
    mockApiClient.deleteAllMessages.mockResolvedValue({ message: '削除しました' })

    render(<TestPage />)

    await waitFor(() => {
      expect(screen.getByText('削除されるメッセージ')).toBeInTheDocument()
    })

    const deleteButton = screen.getByText('すべて削除')
    await userEvent.click(deleteButton)

    await waitFor(() => {
      expect(mockApiClient.deleteAllMessages).toHaveBeenCalledTimes(1)
      expect(screen.getByText('メッセージがありません')).toBeInTheDocument()
    })
  })

  it('APIエラー時にエラーメッセージを表示する', async () => {
    mockApiClient.incrementCounter.mockRejectedValue(new Error('API接続エラー'))

    render(<TestPage />)

    const incrementButton = screen.getByLabelText('増やす')
    await userEvent.click(incrementButton)

    await waitFor(() => {
      expect(screen.getByText(/API接続エラー/)).toBeInTheDocument()
    })
  })

  it('ローディング中にボタンが無効化される', async () => {
    mockApiClient.incrementCounter.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ value: 1 }), 100))
    )

    render(<TestPage />)

    const incrementButton = screen.getByLabelText('増やす')
    await userEvent.click(incrementButton)

    expect(incrementButton).toBeDisabled()

    await waitFor(() => {
      expect(incrementButton).not.toBeDisabled()
    })
  })
})

