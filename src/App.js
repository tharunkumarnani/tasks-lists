import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TagItem from './components/TagItem'
import TaskItem from './components/TaskItem'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    userTask: '',
    selectedTag: tagsList[0].displayText,
    tasksList: [],
    showTags: [],
  }

  onChangeUserTask = event => {
    this.setState({userTask: event.target.value})
  }

  onChangeTag = event => {
    this.setState({selectedTag: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {userTask, selectedTag} = this.state
    const taskItem = {
      id: uuidv4(),
      taskName: userTask,
      tag: selectedTag,
    }
    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, taskItem],
      userTask: '',
      selectedTag: tagsList[0].displayText,
    }))
  }

  addTagInList = id => {
    const {showTags} = this.state
    if (showTags.includes(id)) {
      const filterTags = showTags.filter(each => each !== id)
      this.setState({showTags: filterTags})
    } else {
      this.setState(prevState => ({showTags: [...prevState.showTags, id]}))
    }
  }

  render() {
    const {userTask, selectedTag, tasksList, showTags} = this.state
    const isTagsSelected = showTags.length
    const filterTaskList = isTagsSelected
      ? tasksList.filter(each => showTags.includes(each.tag.toUpperCase()))
      : tasksList
    const isAnyTasks = filterTaskList.length === 0
    return (
      <div className="bg-cont">
        <div className="left-part">
          <form onSubmit={this.onSubmitForm} className="form-style">
            <h1 className="create-task">Create a task!</h1>
            <label htmlFor="userInput" className="label-style">
              Task
            </label>
            <input
              id="userInput"
              value={userTask}
              className="input-style"
              placeholder="Enter the task here"
              onChange={this.onChangeUserTask}
            />
            <label htmlFor="userSelect" className="label-style">
              Tags
            </label>
            <select
              id="userSelect"
              onChange={this.onChangeTag}
              className="select-style"
              value={selectedTag}
            >
              {tagsList.map(each => (
                <option value={each.optionId} key={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
            <button className="add-btn" type="submit">
              Add Task
            </button>
          </form>
        </div>
        <div className="right-part">
          <h1 className="heading">Tags</h1>
          <ul className="tags-list">
            {tagsList.map(each => (
              <TagItem
                addTagInList={this.addTagInList}
                tagDetails={each}
                key={each.optionId}
                showTags={showTags}
              />
            ))}
          </ul>
          <h1 className="heading">Tasks</h1>
          {isAnyTasks && (
            <div className="empty">
              <p>No Tasks Added Yet</p>
            </div>
          )}
          {!isAnyTasks && (
            <ul className="tasks-list">
              {filterTaskList.map(each => (
                <TaskItem key={each.id} taskDetails={each} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
