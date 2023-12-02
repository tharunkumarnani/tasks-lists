import './index.css'

const TagItem = props => {
  const {tagDetails, addTagInList, showTags} = props
  const {displayText, optionId} = tagDetails

  const selectedTagStyle = showTags.includes(optionId) ? 'selected-tag' : ''
  console.log(addTagInList, selectedTagStyle)
  const requestShowTag = () => {
    addTagInList(optionId)
  }

  return (
    <li className="tag-item">
      <button
        className={`tag-btn ${selectedTagStyle}`}
        type="button"
        onClick={requestShowTag}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TagItem
