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
  baseUrl: 'http://172.19.2.11:4000/api'
} as ISettings

export default settings
