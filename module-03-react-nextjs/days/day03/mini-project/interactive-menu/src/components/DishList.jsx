import React from 'react'
import PropTypes from 'prop-types'
import Dish from './Dish'
import Card from './Card'

function DishList({ dishes, onAdd }) {

  if (dishes.length === 0) {
    return <p>No dishes found in this category.</p>
  }

  return (
    <section className="dish-list">

      {dishes.map((dish) => (
        <Card key={dish.id}>

          <Dish
            id={dish.id}
            name={dish.name}
            price={dish.price}
            category={dish.category}
            isSpicy={dish.isSpicy}
            onAdd={onAdd}
          />

        </Card>
      ))}

    </section>
  )
}

DishList.propTypes = {
  dishes: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
}

export default DishList