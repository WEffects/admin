import React, { useState, useEffect } from "react";
import "./index.css";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  // const baseUrl="http://localhost:5000/"
  // const baseUrl="https://event-r4pe.onrender.com/"
  const baseUrl="https://event-production.up.railway.app/"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}get-registered`); // Replace with your API endpoint
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
  
  const handleShowScreenshot = (ticketImageUrl) => {
    setModalImage(ticketImageUrl);
  };

  const handleConfirm = async (ticketCode,index) => {
    console.log("ticket",ticketCode)
    try {
      const response = await fetch(`${baseUrl}confirm/${ticketCode}`, {
        method: "PUT",
        
      });
      if (!response.ok) {
        throw new Error("Failed to confirm");
      }
      alert("Confirmation successful!");
      
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
  const handleEntered = async (ticketCode,index) => {
    console.log("ticket",ticketCode)
    try {
      const response = await fetch(`${baseUrl}enter/${ticketCode}`, {
        method: "PUT",
        
      });
      if (!response.ok) {
        throw new Error("Failed to confirm");
      }
      alert("Entry Confirmed!");
      
      updateEntryStatus(index)
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };
  const updateEntryStatus = (index) => {
    setData((prevData) => {
      const updatedData = { ...prevData };
      updatedData.registered[index] = {
        ...updatedData.registered[index],
        entered: true,
      };
      return updatedData;
    });
  };
  const filteredData = searchQuery
    ? data.registered.filter((item) =>{
        if(item.serialNumber){
           return item.serialNumber
           .toLowerCase()
           .includes(searchQuery.toLowerCase())
        }
       
      })
    : data.registered;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 m-4 min-w-[1100px]">

      <h1 className="text-2xl font-bold mb-4 text-center bg-black text-white p-2">Admin Panel</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Ticket Code"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      {
        filteredData.length==0?<h1 className="text-2xl font-bold mb-4 text-center p-2">No Data Found</h1>
        : <table className="min-w-full bg-white mt-8">
        <thead>
          <tr>
            <th className="py-2">Sr. No</th>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Phone</th>
            <th className="py-2">Ticket Code</th>
            <th className="py-2">Ticket Type</th>
            <th className="py-2">Total Tickets</th>
            <th className="py-2">Total Price</th>
            <th className="py-2">Registered At</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item,index) => (
            <tr key={item.id} className="border text-center">
              <td className="py-2 border">{index+1}</td>
              <td className="py-2 border ">{item.name[0]}</td>
              <td className="py-2 border">{item.email}</td>
              <td className="py-2 border">{item.phone}</td>
              <td className="py-2 border">{item.serialNumber?item.serialNumber:"--"}</td>
              <td className="py-2 border">{item.ticketType}</td>
              <td className="py-2 border">{item.totalTickets}</td>
              <td className="py-2 border">₹ {item.totalPrice}</td>
              <td className="py-2 border">
               
                {new Date(item.registerAt).toLocaleDateString()}
              </td>
              <td className="py-2 flex justify-center ">
                <button
                  className="bg-blue-500 text-white rounded p-1 m-1"
                  onClick={() => handleShowScreenshot(item.ticketImageUrl)} // Add screenshotUrl to your data
                >
                  Show Screenshot
                </button>
                <button
                  className={` p-1 m-1 ${item.confirm ? "bg-gray-500" : "bg-green-500 px-3"} text-white rounded`}
                  onClick={() => handleConfirm(item.ticketCode,index)}
                  disabled={item.confirm}
                >
                 {item.confirm ? "Confirmed" : "Confirm"}
                </button>
                <button
                  className={` p-1 m-1 ${item.entered ? "bg-gray-500" : "bg-green-500 px-3"} text-white rounded`}
                  onClick={() => handleEntered(item.ticketCode,index)}
                  disabled={item.entered}
                >
                 {item.entered ? "Entered" : "Enter"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      }
     

      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white  p-4 rounded shadow-lg">
           
            <img className="max-h-[80vh]" src={modalImage} alt="Screenshot" />
            <div className="mt-1 flex justify-center">
            <button
              className=" bg-red-500 text-white px-6 py-2 rounded-full"
              onClick={() => setModalImage(null)}
            >
              {/* <img className="w-4" src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-close-512.png"></img> */}
              Close
            </button>
            </div>
           
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
