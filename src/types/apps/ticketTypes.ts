export type TicketRowType = {
  id: number
  ticket_no: string
  title: string
  status: string
  priority: string
  start_date: string
  end_date: string
}

export type SupportRowType = {
  id: number
  ticket_no: string
  title: string
  priority: string
  client_email: string
}

export type ProjectRowType = {
  id: number
  customer_name: string
  start_date: string
  end_date: string
  deadline: string
  status: string
}

export type ProjectTicketRowType = {
  id: number
  customer_name: string
  start_date: string
  end_date: string
  deadline: string
  status: string
}
