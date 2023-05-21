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
  baseUrl: 'https://new-telvida-erp.onrender.com/api/v1'
} as ISettings

export default settings
