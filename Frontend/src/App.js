import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [datapost, Setdatapost] = useState({ Title: '', Description: '' });
  // console.log(datapost);

  const postdata = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3003/api/tudolist/addtudo', {
        Title: datapost.Title,
        Description: datapost.Description,
      });
      
      toast.success(response.data.message);
    } catch (error) {
      
      toast.error(error.response.data.message );
    }
  };

  return (
    <>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#f0f0f0',
        }}
      >
        <form onSubmit={postdata}>
        <Toaster/>
          <div
            style={{
              width: '500px',
              backgroundColor: '#ffffff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
              marginLeft: '200px',
            }}
          >
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>TODO LIST</h2>

            <div style={{ marginBottom: '15px' }}>
              <input
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                }}
                placeholder='Enter Your Title'
                type='text'
                onChange={(e) => Setdatapost({ ...datapost, Title: e.target.value })}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <textarea
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                }}
                placeholder='Enter Your Description'
                onChange={(e) => Setdatapost({ ...datapost, Description: e.target.value })}
                rows={5}
              />
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                type='submit'
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: '#007bff',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </form>

        <div
          style={{
            width: '500px',
            height: '500px',
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
            marginLeft: '200px',
          }}
        ></div>
      </div>
    </>
  );
};

export default App;
