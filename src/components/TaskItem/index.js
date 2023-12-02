import './index.css'

const TaskItem = props => {
  const {taskDetails} = props
  const {taskName, tag} = taskDetails
  return (
    <li className="task-item">
      <p className="task">{taskName}</p>
      <p className="tag">{tag}</p>
    </li>
  )
}

export default TaskItem
