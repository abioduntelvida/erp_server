// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Types
import { TicketRowType } from 'src/types/apps/ticketTypes'

const data: { tickets: TicketRowType[] } = {
  tickets: [
    {
      id: 1,
      ticket: 'Management',
      title: 'Request for a new laptop',
      status: ['administrator'],
      owner: 'Technical Team',
      task: '',
      millstone: '',
      issues: '',
      startDate: '14 Apr 2021',
      endDate: '03 Apr 2023'
    },
    {
      id: 2,
      ticket: 'Management',
      title: 'Request for a new laptop',
      status: ['administrator'],
      owner: 'Technical Team',
      task: '',
      millstone: '',
      issues: '',
      startDate: '14 Apr 2021',
      endDate: '03 Apr 2023'
    },
    {
      id: 3,
      ticket: 'Management',
      title: 'Request for a new laptop',
      status: ['administrator'],
      owner: 'Technical Team',
      task: '',
      millstone: '',
      issues: '',
      startDate: '14 Apr 2021',
      endDate: '03 Apr 2023'
    },
    {
      id: 4,
      ticket: 'Management',
      title: 'Request for a new laptop',
      status: ['administrator'],
      owner: 'Technical Team',
      task: '',
      millstone: '',
      issues: '',
      startDate: '14 Apr 2021',
      endDate: '03 Apr 2023'
    },
    {
      id: 5,
      ticket: 'Management',
      title: 'Request for a new laptop',
      status: ['administrator'],
      owner: 'Technical Team',
      task: '',
      millstone: '',
      issues: '',
      startDate: '14 Apr 2021',
      endDate: '03 Apr 2023'
    },
    {
      id: 6,
      ticket: 'Management',
      title: 'Request for a new laptop',
      status: ['administrator'],
      owner: 'Technical Team',
      task: '',
      millstone: '',
      issues: '',
      startDate: '14 Apr 2021',
      endDate: '03 Apr 2023'
    },
    {
      id: 7,
      ticket: 'Management',
      title: 'Request for a new laptop',
      status: ['administrator'],
      owner: 'Technical Team',
      task: '',
      millstone: '',
      issues: '',
      startDate: '14 Apr 2021',
      endDate: '03 Apr 2023'
    },
    {
      id: 8,
      ticket: 'Management',
      title: 'Request for a new laptop',
      status: ['administrator'],
      owner: 'Technical Team',
      task: '',
      millstone: 'dfd',
      issues: '',
      startDate: '14 Apr 2021',
      endDate: '03 Apr 2023'
    },
    {
      id: 9,
      ticket: 'Management',
      title: 'Request for a new laptop',
      status: ['administrator'],
      owner: 'Technical Team',
      task: '',
      millstone: '',
      issues: '',
      startDate: '14 Apr 2021',
      endDate: '03 Apr 2023'
    }
  ]
}

// ------------------------------------------------
// GET: Return Permissions List
// ------------------------------------------------
mock.onGet('/apps/tickets/data').reply(config => {
  const { q = '' } = config.params
  const queryLowered = q.toLowerCase()
  const filteredData = data.tickets.filter(
    tickets =>
      tickets.ticket.toLowerCase().includes(queryLowered) ||
      tickets.title.toLowerCase().includes(queryLowered) ||
      tickets.status.some(i => i.toLowerCase().startsWith(queryLowered)) ||
      tickets.owner.toLowerCase().includes(queryLowered) ||
      tickets.millstone.toLowerCase().includes(queryLowered) ||
      tickets.issues.toLowerCase().includes(queryLowered) ||
      tickets.startDate.toLowerCase().includes(queryLowered) ||
      tickets.endDate.toLowerCase().includes(queryLowered)
  )

  return [
    200,
    {
      params: config.params,
      allData: data.tickets,
      tickets: filteredData,
      total: filteredData.length
    }
  ]
})

export default data
