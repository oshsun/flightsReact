import React from 'react'

const Flight = (props) => {
  return (
    <li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold">flight from {origin_country_id} to {destination_country_id}</div>
      
    </div>
    <span class="badge bg-primary rounded-pill">14</span>
  </li>
  )
}

export default Flight