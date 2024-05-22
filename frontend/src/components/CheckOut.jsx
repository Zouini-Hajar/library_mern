import React from 'react'
import '../styles/checkout.css'

export default function CheckOut() {
    return (
        <div style={{backgroundColor: '#F0E3F4', borderRadius:'10px', marginTop:'2rem'}}>
            <div className='checkout-container'>
                <div className='summary'>
                    <h2>Checkout Summary</h2>
                    <p>Please review your rental details below. Once you confirm everything is correct, click "Checkout" to complete your order. If you have any questions or need assistance, please contact our customer service team. Thank you for choosing BookSphere!</p>
                    <span>Have a coupon code?</span>
                    <div class="input-group">
                        <input type="text" class="input" id="promo" name="Promo" placeholder="Enter promo code here" autocomplete="off" />
                        <button class="button--submit">
                        <i class="fa-solid fa-arrow-right fa-lg"></i>
                        </button>
                    </div>
                </div>
                <div className='checkout'>
                    <table className='checkout-table'>
                        <tr>
                            <th>Subtotal:</th>
                            <td>12.99$</td>
                        </tr>
                        <tr>
                            <th>Tax:</th>
                            <td>2.99$</td>
                        </tr>
                        <tr className='total-row'>
                            <th>Total:</th>
                            <td>{12.99 + 2.99}$</td>
                        </tr>
                    </table>
                    <button>
                        Checkout
                    </button>
                </div>
            </div>
        </div>

    )
}
