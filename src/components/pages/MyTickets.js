import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import Table from "react-bootstrap/esm/Table";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);

  const handleTicketDelete = (ticket_id) => {
    console.log("in handle delete");
    axiosInstance
      .delete(`remove/tickets/${ticket_id}`)
      .then((res) => {
        getTicket();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTicket();
  }, []);

  const getTicket = () => {
    axiosInstance.get("getticketsbycustomer").then((res) => {
      setTickets(res.data);
    });
  };

  let displayTicketss = [];
  if (tickets) {
    displayTicketss = tickets.map((ticket, index) => {
      return (
        <tr key={index}>
          <td>{ticket.flight_id.airline_company_id.name}</td>
          <td>{ticket.flight_id.origin_country_id.name}</td>
          <td>{ticket.flight_id.destination_country_id.name}</td>

          <td>
            Date: {ticket.flight_id.departure_time.slice(0, 10)} Time:{" "}
            {ticket.flight_id.departure_time.slice(11, 16)}
          </td>

          <td>
            Date: {ticket.flight_id.landing_time.slice(0, 10)} Time:{" "}
            {ticket.flight_id.landing_time.slice(11, 16)}
          </td>

          <button onClick={() => handleTicketDelete(ticket.id)}>
            Delete Tickets
          </button>
        </tr>
      );
    });
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Origin Country</th>
            <th>Destination Country</th>
            <th>Departure Time</th>
            <th>Landing Time</th>
          </tr>
        </thead>
        <tbody> {displayTicketss}</tbody>
      </Table>
    </div>
  );
};

export default MyTickets;
