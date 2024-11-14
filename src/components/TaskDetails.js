import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function TaskDetails({ task }) {
    const [dueDate, setDueDate] = useState(task.dueDate || null);

    return (
        <div className="task-details">
            <h2>{task.title}</h2>
            <div className="details-content">
                <label>Add Due Date:</label>
                <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />
            </div>
        </div>
    );
}

export default TaskDetails;