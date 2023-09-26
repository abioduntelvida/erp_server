// let settings = {}

interface ISettings {
  apiUrl: string
  appName: string
  subject: string
  baseUrl: string
}

const settings = {
  apiUrl: '',
  appName: 'ERP Platform',
  subject: 'ERP Platform',
  baseUrl: 'https://57ea-102-88-35-128.ngrok-free.app/api'
} as ISettings

export default settings
