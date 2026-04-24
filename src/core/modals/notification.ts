export interface Notification {
  id: string
  recipientName: string
  recipientId: number
  fragment: string // -- e.g., "order", "product", "user"
  sendTo: string
  subject: string
  retryCount: number
  channelType: string
  priority: number // -- Higher number means higher priority
  status: string // -- e.g., "pending", "sent", "failed"
  payload: Record<string, unknown>
  mailBody: Record<string, unknown>
  failureReason: string
  scheduledAt: string // -- For delayed notifications
  createdAt: string
  updatedAt: string
}
