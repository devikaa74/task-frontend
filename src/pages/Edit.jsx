import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { taskUpdateAPI } from '../services/allAPI';

const Edit = ({ task, getUserTasks }) => {
  const [show, setShow] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    taskName: '',
    taskDescription: '',
    startDate: '',
    endDate: '',
    taskStatus: '',
  });

  // Handle modal show and hide
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Initialize task data when component mounts or task changes
  useEffect(() => {
    if (task) {
      setTaskDetails({
        taskName: task.taskName || '',
        taskDescription: task.taskDescription || '',
        startDate: task.startDate || '',
        endDate: task.endDate || '',
        taskStatus: task.taskStatus || '',
      });
    }
  }, [task]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails({ ...taskDetails, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { taskName, taskDescription, startDate, endDate, taskStatus } = taskDetails;

    // Check if all fields are filled
    if (!taskName || !taskDescription || !startDate || !endDate || !taskStatus) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const token = sessionStorage.getItem("token"); // Get the token from sessionStorage
      if (!token) {
        alert('You must be logged in to update the task.');
        return;
      }

      const reqHeader = { Authorization: `Bearer ${token}` }; // Set the token in the Authorization header

      // Log request data for debugging
      console.log('Updating task with data:', taskDetails);

      const result = await taskUpdateAPI(task._id, taskDetails, reqHeader);

      // Log API response for debugging
      console.log('API Response:', result);

      if (result.status === 200) {
        alert('Task updated successfully');
        getUserTasks(); // Refresh task list
        handleClose();
      } else {
        alert('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      alert('An error occurred while updating the task.');
    }
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="taskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task name"
                name="taskName"
                value={taskDetails.taskName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="taskDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                name="taskDescription"
                value={taskDetails.taskDescription}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={taskDetails.startDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={taskDetails.endDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="taskStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="taskStatus"
                value={taskDetails.taskStatus}
                onChange={handleChange}
                required
              >
                <option value="">Select status</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Edit;