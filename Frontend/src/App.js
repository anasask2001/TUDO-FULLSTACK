import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBIcon,
} from "mdb-react-ui-kit";

const App = () => {
  const [datapost, setDatapost] = useState({ Title: "", Description: "" });
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  const postdata = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3003/api/tudolist/addtudo",
        {
          Title: datapost.Title,
          Description: datapost.Description,
        }
      );

      toast.success(response.data.message);
      const updatedList = await axios.get(
        "http://localhost:3003/api/tudolist/showalldatas"
      );
      setData(updatedList.data);
      setDatapost({ Title: "", Description: "" });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3003/api/tudolist/deletetudo/${id}`
      );

      // Update state to remove the deleted item from the list
      setData(data.filter((x) => x._id !== id));
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to delete TODO item");
    }
  };

  const edittudo = async (id) => {
    try {
      const todoItem = data.find((x) => x._id === id);
      if (todoItem) {
        setDatapost({ Title: todoItem.Title, Description: todoItem.Description });
        setEditId(id);
      }
    } catch (error) {
      toast.error("Failed to fetch TODO item for editing");
    }
  };

  const updateTodo = async (e) => {
    e.preventDefault();
    if (editId === null) return;

    try {
      const response = await axios.put(
        `http://localhost:3003/api/tudolist/updatetudo/${editId}`,
        {
          Title: datapost.Title,
          Description: datapost.Description,
        }
      );

      toast.success(response.data.message);
      const updatedList = await axios.get(
        "http://localhost:3003/api/tudolist/showalldatas"
      );
      setData(updatedList.data);
      setDatapost({ Title: "", Description: "" });
      setEditId(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchTodoData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3003/api/tudolist/showalldatas"
        );
        setData(response.data);
      } catch (error) {
        toast.error("Failed to fetch TODO list");
      }
    };

    fetchTodoData();
  }, []);

  return (
    <MDBContainer className="p-5">
      <Toaster />
      <MDBRow>
        <MDBCol md="6">
          <MDBCard className="mb-4">
            <MDBCardBody>
              <MDBCardTitle className="text-center mb-4">
                {editId ? "Update TODO" : "Add TODO"}
              </MDBCardTitle>
              <form onSubmit={editId ? updateTodo : postdata}>
                <MDBInput
                  className="mb-4"
                  label="Enter Your Title"
                  type="text"
                  value={datapost.Title}
                  onChange={(e) =>
                    setDatapost({ ...datapost, Title: e.target.value })
                  }
                />
                <MDBInput
                  className="mb-4"
                  label="Enter Your Description"
                  type="textarea"
                  rows="5"
                  value={datapost.Description}
                  onChange={(e) =>
                    setDatapost({ ...datapost, Description: e.target.value })
                  }
                />
                <div className="text-center">
                  <MDBBtn type="submit" color="primary">
                    {editId ? "Update" : "Submit"}
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="6">
          <MDBCard className="mb-4">
            <MDBCardBody>
              <MDBCardTitle className="text-center mb-4">
                TODO Items
              </MDBCardTitle>
              {data.map((x) => (
                <MDBCard key={x._id} className="mb-3">
                  <MDBCardBody>
                    <MDBCardTitle>{x.Title}</MDBCardTitle>
                    <MDBCardText>{x.Description}</MDBCardText>
                    <div className="d-flex justify-content-end">
                      <MDBBtn
                        size="sm"
                        color="warning"
                        className="me-2"
                        onClick={() => edittudo(x._id)}
                      >
                        <MDBIcon icon="edit" /> Edit
                      </MDBBtn>
                      <MDBBtn
                        size="sm"
                        color="danger"
                        onClick={() => deleteTodo(x._id)}
                      >
                        <MDBIcon icon="trash" /> Delete
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              ))}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default App;
