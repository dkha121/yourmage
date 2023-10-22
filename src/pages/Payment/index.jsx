import React, { useState } from 'react'
import './style.scss'
import { useNavigate, useLocation } from 'react-router-dom';

import logo from "../../assets/images/logo_multi_color_background.png"
import QR from "../../assets/images/QR_code_payment.jpg"

import { toast } from 'react-toastify';


const Payment = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { item, activeButton } = location.state;

  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleNameChange = (e) => {
    setName(e.target.value);
  };


  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, '');
    setPhoneNumber(numericValue);
  };

  const price = activeButton === "monthly" ? item.monthly.price.toFixed(2) : (item.yearly.price * 12).toFixed(2)

  const handleCheckout = () => {
    toast.success('Upgrade level successfully!')
    navigate('/home')
  }


  return (
    <div className='payment'>
      <div className="payment_left">
        <div
          className="back_button"
          onClick={() => {
            navigate(-1);
          }}
        >
          <svg class="InlineSVG Icon Header-backArrow mr2 Icon--sm" fill='rgba(0,0,0,0.5)' focusable="false" width="12" height="12" viewBox="0 0 16 16"><path d="M3.417 7H15a1 1 0 0 1 0 2H3.417l4.591 4.591a1 1 0 0 1-1.415 1.416l-6.3-6.3a1 1 0 0 1 0-1.414l6.3-6.3A1 1 0 0 1 8.008 2.41z" fill-rule="evenodd"></path></svg>
          <img src={logo} />
          <div className="text">Back</div>
        </div>

        <div className="information">
          <div className="name">
            Subscribe to {item.name}
          </div>
          <div className="price">
            ${price}
            <div className="type">{activeButton === "monthly" ? "per month" : "per year"}</div>
          </div>
        </div>

        <div className="apprentice">
          <div className="flex">
            <div className="flex_name">{item.name}</div>
            <div className="flex_price">${price}</div>
          </div>
          <div className="billed">Billed {activeButton}</div>
        </div>

        <div className="line"></div>

        <div className="apprentice">
          <div className="flex">
            <div className="flex_name">Subtotal</div>
            <div className="flex_price">${price}</div>
          </div>
        </div>

        <div className="apprentice tax">
          <div className="flex">
            <div className="flex_name">Tax</div>
            <div className="flex_price">$0.00</div>
          </div>
        </div>

        <div className="line"></div>

        <div className="apprentice">
          <div className="flex">
            <div className="flex_name">Total due today</div>
            <div className="flex_price">${price}</div>
          </div>
        </div>

      </div>

      <div className="payment_right">

        <div className="title">
          Pay with card
        </div>

        <div className="email">
          <div className="left">Email</div>
          <div className="right">mail@gmail.com</div>
        </div>

        <div className="input">
          <label htmlFor="name" className="input_title">Full name</label>
          <input id="name" name="name" type="text" className="input_feild" value={name} onChange={handleNameChange} placeholder='Full name' />
        </div>

        <div className="input">
          <label htmlFor="phone" className="input_title">Phone number</label>
          <input id="phone" name="phone" type="text" className="input_feild" value={phoneNumber} onChange={handlePhoneNumberChange} placeholder='Phone number' />
        </div>

        <div className="qr_payment">
          <img src={QR} alt="" />
        </div>

        <div className="btn-checkout">
          <div className='btn btn-primary mt-5 ml-5' onClick={handleCheckout}>
            Check out
          </div>
        </div>
      </div>

    </div>
  )
}

export default Payment