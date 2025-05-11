import { createApp, h, reactive } from 'vue'
import ToastNotification from '../components/Toast.vue'

interface ToastOptions {
  message: string
  type: 'success' | 'error' | 'info'
  duration: number
  position: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'
  transition?: 'slide' | 'fade' | 'bounce'
  icon?: boolean
  showClose?: boolean
  showProgress?: boolean
  closeOnClick?: boolean
}

interface ToastInstance {
  id: number
  options: ToastOptions
  app: ReturnType<typeof createApp>
  container: HTMLDivElement
}

export function useToast() {
  const toasts: ToastInstance[] = reactive([])
  let toastId = 0

  const showToast = (
    type: 'success' | 'error' | 'info',
    message: string,
    duration = 3000,
    position: 'right-bottom' | 'right-top' | 'left-top' | 'left-bottom' = 'right-bottom'
  ) => {
    // Map position to internal format
    const positionMap: Record<string, 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'> = {
      'right-bottom': 'bottom-right',
      'right-top': 'top-right',
      'left-top': 'top-left',
      'left-bottom': 'bottom-left'
    }

    const toastOptions: ToastOptions = {
      type,
      message,
      duration,
      position: positionMap[position] || 'bottom-right',
      transition: 'slide',
      icon: true,
      showClose: true,
      showProgress: true,
      closeOnClick: false
    }

    const id = toastId++
    const toastState = reactive({
      message: toastOptions.message,
      type: toastOptions.type,
      duration: toastOptions.duration,
      visible: true,
      position: toastOptions.position,
      transition: toastOptions.transition,
      icon: toastOptions.icon,
      showClose: toastOptions.showClose,
      showProgress: toastOptions.showProgress,
      closeOnClick: toastOptions.closeOnClick
    })

    const container = document.createElement('div')
    document.body.appendChild(container)

    const app = createApp({
      render() {
        return h(ToastNotification, {
          message: toastState.message,
          type: toastState.type,
          duration: toastState.duration,
          visible: toastState.visible,
          position: toastState.position,
          transition: toastState.transition,
          icon: toastState.icon,
          showClose: toastState.showClose,
          showProgress: toastState.showProgress,
          closeOnClick: toastState.closeOnClick
        })
      }
    })

    app.mount(container)

    const toastInstance: ToastInstance = { id, options: toastOptions, app, container }
    toasts.push(toastInstance)

    // Auto-remove after duration
    setTimeout(() => {
      toastState.visible = false
      setTimeout(() => {
        const index = toasts.findIndex((t) => t.id === id)
        if (index !== -1) {
          toasts[index].app.unmount()
          document.body.removeChild(toasts[index].container)
          toasts.splice(index, 1)
        }
      }, 300) // Wait for animation
    }, toastOptions.duration)
  }

  return { showToast }
}
