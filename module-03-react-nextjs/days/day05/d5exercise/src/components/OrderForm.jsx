import React, { useState } from 'react' 
import PropTypes from 'prop-types' 
 
function OrderForm() { 
 
  const [delivery, setDelivery] = useState({ 
    name: "", 
    phone: "", 
    area: "", 
  }) 
 
  const handleChange = (event) => { 
 
    const { name, value } = event.target 
 
    setDelivery((currentDelivery) => ({ 
      ...currentDelivery, 
      [name]: value, 
    })) 
  } 
 
  // Accepts: 
  // 0912345678 
  // +251912345678 
 
  const telebirrIsValid = 
    /^(09\d{8}|\+2519\d{8})$/.test(delivery.phone) 
 
  const handleSubmit = (event) => { 
 
    event.preventDefault() 
 
    if (!telebirrIsValid) { 
      return 
    } 
 
    alert("Delivery details submitted!") 
  } 
 
  const formIsValid = 
    telebirrIsValid && 
    delivery.name.trim() !== "" && 
    delivery.area.trim() !== "" 
 
  return ( 
    <section className="delivery-form"> 
 
      <h2>Delivery Details</h2> 
 
      <form onSubmit={handleSubmit}> 
 
        <label> 
          Name 
 
          <input 
            type="text" 
            name="name" 
            value={delivery.name} 
            onChange={handleChange} 
            required 
          /> 
 
        </label> 
 
        <label> 
          TeleBirr Phone 
 
          <input 
            type="tel" 
            name="phone" 
            value={delivery.phone} 
            onChange={handleChange} 
            placeholder="0912345678" 
            maxLength="13" 
            required 
          /> 
 
        </label> 
 
        {delivery.phone && !telebirrIsValid && ( 
          <p>Please enter a valid TeleBirr number.</p> 
        )} 
 
        <label> 
          Area 
 
          <input 
            type="text" 
            name="area" 
            value={delivery.area} 
            onChange={handleChange} 
            required 
          /> 
 
        </label> 
 
        <button 
          type="submit" 
          disabled={!formIsValid} 
        > 
          Submit Delivery Order 
        </button> 
 
      </form> 
 
    </section> 
  ) 
} 
 
OrderForm.propTypes = {} 
 
export default OrderForm