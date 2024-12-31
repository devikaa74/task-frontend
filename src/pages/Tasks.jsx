import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import Add from '../pages/Add';
import Edit from '../pages/Edit';
import '../App.css'; // Ensure your CSS styles are loaded
import { taskDeleteAPI, userTasksAPI } from '../services/allAPI';


const Tasks = () => {
  const [username, setUsername] = useState('');
  const [userTasks, setUserTasks] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      setUsername(JSON.parse(sessionStorage.getItem('user')).username.split(' ')[0]);
    } else {
      setUsername('');
    }
  }, []);

  useEffect(() => {
    getUserTasks();
  }, []);

  const getUserTasks = async () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const reqHeader = { Authorization: `Bearer ${token}` };
      try {
        const result = await userTasksAPI(reqHeader);
        if (result.status === 200) {
          setUserTasks(result.data);
        } else {
          alert(result.response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const reqHeader = { Authorization: `Bearer ${token}` };
      try {
        const result = await taskDeleteAPI(taskId, reqHeader);
        if (result.status === 200) {
          alert('Task Deleted Successfully');
          getUserTasks();
        } else {
          alert('Failed to delete task');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container className="task-container">
    <Row>
      <Col md={12} className="d-flex justify-content-between align-items-center">
        <h2 className="task-title mt-4">Your tasks</h2>
        <Add getUserTasks={getUserTasks} />
      </Col>
    </Row>

    <Row>
      <Col md={12}>
        <Table striped bordered hover responsive className="task-table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {userTasks.length > 0 ? (
              userTasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.taskName}</td>
                  <td>{task.taskDescription}</td>
                  <td>{new Date(task.startDate).toLocaleDateString()}</td>
                  <td>{new Date(task.endDate).toLocaleDateString()}</td>
                  <td >
                    {task.taskStatus}
                  </td>
                  <td>
                    <Edit task={task} getUserTasks={getUserTasks} />
                    
                  </td>
                  <td>
                  
                    <Button
                      variant="danger" // Use "danger" for a more prominent button
                      className="delete-btn"
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center no-tasks">
                  No tasks available.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
  </Container>
  );
};

export default Tasks;