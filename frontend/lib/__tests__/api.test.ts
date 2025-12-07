import { apiClient, type CounterResponse, type Message, type MessagesResponse } from '../api'

// fetchをモック
global.fetch = jest.fn()

describe('ApiClient', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear()
  })

  describe('healthCheck', () => {
    it('ヘルスチェックが成功する', async () => {
      const mockResponse = { status: 'healthy', service: 'backend-api' }
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await apiClient.healthCheck()

      expect(result).toEqual(mockResponse)
      expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/health', {
        headers: { 'Content-Type': 'application/json' },
      })
    })
  })

  describe('カウンター関連', () => {
    it('カウンターの値を取得できる', async () => {
      const mockResponse: CounterResponse = { value: 5 }
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await apiClient.getCounter()

      expect(result).toEqual(mockResponse)
      expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/counter', {
        headers: { 'Content-Type': 'application/json' },
      })
    })

    it('カウンターの値を更新できる', async () => {
      const mockResponse: CounterResponse = { value: 10 }
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await apiClient.updateCounter(10)

      expect(result).toEqual(mockResponse)
      expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/counter', {
        method: 'POST',
        body: JSON.stringify({ value: 10 }),
        headers: { 'Content-Type': 'application/json' },
      })
    })

    it('カウンターを増やすことができる', async () => {
      const mockResponse: CounterResponse = { value: 6 }
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await apiClient.incrementCounter()

      expect(result).toEqual(mockResponse)
      expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/counter/increment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    })

    it('カウンターを減らすことができる', async () => {
      const mockResponse: CounterResponse = { value: 4 }
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await apiClient.decrementCounter()

      expect(result).toEqual(mockResponse)
      expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/counter/decrement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    })

    it('カウンターをリセットできる', async () => {
      const mockResponse: CounterResponse = { value: 0 }
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await apiClient.resetCounter()

      expect(result).toEqual(mockResponse)
      expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/counter/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    })
  })

  describe('メッセージ関連', () => {
    it('メッセージ一覧を取得できる', async () => {
      const mockResponse: MessagesResponse = {
        messages: [
          { id: 1, content: 'テストメッセージ1' },
          { id: 2, content: 'テストメッセージ2' },
        ],
      }
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await apiClient.getMessages()

      expect(result).toEqual(mockResponse)
      expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/messages', {
        headers: { 'Content-Type': 'application/json' },
      })
    })

    it('メッセージを作成できる', async () => {
      const mockResponse: Message = { id: 1, content: '新しいメッセージ' }
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await apiClient.createMessage('新しいメッセージ')

      expect(result).toEqual(mockResponse)
      expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/messages', {
        method: 'POST',
        body: JSON.stringify({ content: '新しいメッセージ' }),
        headers: { 'Content-Type': 'application/json' },
      })
    })

    it('すべてのメッセージを削除できる', async () => {
      const mockResponse = { message: 'すべてのメッセージを削除しました' }
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await apiClient.deleteAllMessages()

      expect(result).toEqual(mockResponse)
      expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/messages', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
    })

    it('指定されたメッセージを削除できる', async () => {
      const mockDeleted: Message = { id: 1, content: '削除されるメッセージ' }
      const mockResponse = { message: 'メッセージを削除しました', deleted: mockDeleted }
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await apiClient.deleteMessage(1)

      expect(result).toEqual(mockResponse)
      expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/messages/1', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
    })
  })

  describe('エラーハンドリング', () => {
    it('APIエラー時に適切にエラーをスローする', async () => {
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })

      await expect(apiClient.getCounter()).rejects.toThrow('API Error: 404 Not Found')
    })

    it('ネットワークエラー時に適切にエラーをスローする', async () => {
      ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      await expect(apiClient.getCounter()).rejects.toThrow('Network error')
    })
  })
})

