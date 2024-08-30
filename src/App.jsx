import React, {useState, useEffect} from "react";
import "./index.css"

const App = () => {
  const [data, setData] = useState([{
    name: "rakshank",
    email: "rakshankverma@gmail.com",
    phone: "8955982674",
    ticketType: "Stag",
    totalTickets: 1,
    totalPrice: 1499,
    attendence: "confirm",
    confirm: true,
    registerAt: {
      $date: "2024-08-25T05:00:52.300Z"
    },
  }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="flex flex-wrap gap-4">
        {data.map(item => (
          <div className="bg-white shadow-md rounded-lg p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            <h2 className="text-xl font-semibold mb-2">User Details</h2>
            <div className="space-y-2">
              <div>
                <span className="font-semibold">Name:</span> {item.name}
              </div>
              <div>
                <span className="font-semibold">Email:</span> {item.email}
              </div>
              <div>
                <span className="font-semibold">Phone:</span> {item.phone}
              </div>
              <div>
                <span className="font-semibold">Ticket Type:</span> {item.ticketType}
              </div>
              <div>
                <span className="font-semibold">Total Tickets:</span> {item.totalTickets}
              </div>
              <div>
                <span className="font-semibold">Attendence</span> {item.totalTickets}
              </div>
              <div>
                <span className="font-semibold">Confirm</span> {item.totalTickets}
              </div>
              <div>
                <span className="font-semibold">Total Price:</span> ${item.totalPrice}
              </div>
              <div>
                <span className="font-semibold">Registered At:</span> {new Date(item.registerAt.$date).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}
  export default App