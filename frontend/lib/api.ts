// API接続用のユーティリティ

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// APIレスポンスの型定義
export interface CounterResponse {
  value: number
}

export interface Message {
  id?: number
  content: string
}

export interface MessagesResponse {
  messages: Message[]
}

// APIクライアントクラス
class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // ヘルスチェック
  async healthCheck(): Promise<{ status: string; service: string }> {
    return this.request('/api/health')
  }

  // カウンター関連
  async getCounter(): Promise<CounterResponse> {
    return this.request('/api/counter')
  }

  async updateCounter(value: number): Promise<CounterResponse> {
    return this.request('/api/counter', {
      method: 'POST',
      body: JSON.stringify({ value }),
    })
  }

  async incrementCounter(): Promise<CounterResponse> {
    return this.request('/api/counter/increment', {
      method: 'POST',
    })
  }

  async decrementCounter(): Promise<CounterResponse> {
    return this.request('/api/counter/decrement', {
      method: 'POST',
    })
  }

  async resetCounter(): Promise<CounterResponse> {
    return this.request('/api/counter/reset', {
      method: 'POST',
    })
  }

  // メッセージ関連
  async getMessages(): Promise<MessagesResponse> {
    return this.request('/api/messages')
  }

  async createMessage(content: string): Promise<Message> {
    return this.request('/api/messages', {
      method: 'POST',
      body: JSON.stringify({ content }),
    })
  }

  async deleteAllMessages(): Promise<{ message: string }> {
    return this.request('/api/messages', {
      method: 'DELETE',
    })
  }

  async deleteMessage(messageId: number): Promise<{ message: string; deleted: Message }> {
    return this.request(`/api/messages/${messageId}`, {
      method: 'DELETE',
    })
  }
}

// シングルトンインスタンスをエクスポート
export const apiClient = new ApiClient()

