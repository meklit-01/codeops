import React from 'react'
import PropTypes from 'prop-types'
import '../css/style.css'

function CategoryBar({ categories, selected, onSelect }) {

  return (
    <div className="category-bar">

      {categories.map((category) => (
        <button
          key={category}
          className={selected === category ? 'selected' : ''}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}

    </div>
  )
}

CategoryBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default CategoryBar