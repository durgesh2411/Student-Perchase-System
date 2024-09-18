'use client';


import { useState } from 'react';

const GetAllStudentsForm = () => {
  const [formData, setFormData] = useState({
    name: ''
  });

  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use form data values for name and id
    const queryParams = new URLSearchParams({
        name: formData.name  // Use the value from form input
    }).toString();
    
    try {
        const response = await fetch(`https://storage-microservice-1.onrender.com/student/getAll?${queryParams}`);
        
        if (response.ok) {
            const data = await response.json();
            setStudents(data);  // Update the students state with the fetched data
            setError('');  // Clear any previous error
        } else {
            const errorText = await response.text();
            setError(errorText);  // Set the error message
        }
    } catch (error) {
        console.error('Fetch error:', error);
        setError('An error occurred while fetching the data.');
    }
};

  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Get All Students</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Admin Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>

        {error && (
          <p className="mt-4 text-red-500">{error}</p>
        )}

        {students.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Students List</h3>
            <ul className="mt-4">
              {students.map((student, index) => (
                <li key={index} className="p-2 border-b">
                  {student.name} - {student.studentID}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default GetAllStudentsForm;
