import React, { useState, useEffect } from "react";
import "./index.css";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/get-registered"); // Replace with your API endpoint
        // const response = await fetch("https://event-r4pe.onrender.com/get-registered"); // Replace with your API endpoint

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  console.log("data", data);
  
  const handleShowScreenshot = (imageUrl) => {
    setModalImage(imageUrl);
  };

  const handleConfirm = async (ticketCode,index) => {
    console.log("ticket",ticketCode)
    try {
      const response = await fetch(`http://localhost:5000/confirm/${ticketCode}`, {
        method: "PUT",
        
      });
      if (!response.ok) {
        throw new Error("Failed to confirm");
      }
      // alert("Confirmation successful!");
      
      updateConfirmationStatus(index)
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };
  const updateConfirmationStatus = (index) => {
    setData((prevData) => {
      const updatedData = { ...prevData };
      updatedData.registered[index] = {
        ...updatedData.registered[index],
        confirm: true,
      };
      return updatedData;
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 m-4 min-w-[900px]">
      <h1 className="text-2xl font-bold mb-4 text-center bg-black text-white p-2">Admin Panel</h1>
      {
        data.registered.length==0?<h1 className="text-2xl font-bold mb-4 text-center p-2">No Data Found</h1>
        : <table className="min-w-full bg-white mt-8">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Phone</th>
            <th className="py-2">Ticket Type</th>
            <th className="py-2">Total Tickets</th>
            <th className="py-2">Attendance</th>
            <th className="py-2">Total Price</th>
            <th className="py-2">Registered At</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.registered.map((item,index) => (
            <tr key={item.id} className="border text-center">
              <td className="py-2 border ">{item.name[0]}</td>
              <td className="py-2 border">{item.email}</td>
              <td className="py-2 border">{item.phone}</td>
              <td className="py-2 border">{item.ticketType}</td>
              <td className="py-2 border">{item.totalTickets}</td>
              <td className="py-2 border">{item.attendence}</td>
              <td className="py-2 border">₹ {item.totalPrice}</td>
              <td className="py-2 border">
               
                {new Date(item.registerAt).toLocaleDateString()}
              </td>
              <td className="py-2 ">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded m-1 mr-2 "
                  onClick={() => handleShowScreenshot(item.screenshotUrl)} // Add screenshotUrl to your data
                >
                  Show Screenshot
                </button>
                <button
                  className={`${item.confirm ? "bg-gray-500" : "bg-green-500"} text-white px-2 py-1 rounded`}
                  onClick={() => handleConfirm(item.ticketCode,index)}
                  disabled={item.confirm}
                >
                  Confirm
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      }
     

      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <img src={modalImage} alt="Screenshot" />
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setModalImage(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
