import React from 'react'
import '../styles/services.css'

export default function Services() {
    return (
        <div className='services-container'>
            <div className='service'>
                <i class="fa-solid fa-truck-fast fa-xl" style={{color:'#86469C'}}></i>
                <h4> Quick delivery</h4>
                <p>Get your hands on your favorite books in record time, because waiting is so last season! Lightning-fast service guaranteed for you.</p>
            </div>
            <div className='service'>
                <i class="fa-solid fa-credit-card fa-xl" style={{color:'#86469C'}}></i>
                <h4> Secure Payment</h4>
                <p>Shop with peace of mind knowing that your transactions are safeguarded with top-notch security measures. Your privacy and safety, our priority.</p>
            </div>
            <div className='service'>
            <i class="fa-solid fa-medal fa-xl" style={{color:'#86469C'}}></i>
                <h4> Best Quality </h4>
                <p>Experience reading like never before with our carefully curated collection of top-quality books, because you deserve nothing but the best!</p>
            </div>
            <div  className='service'>
                <i class="fa-solid fa-shield-halved fa-xl" style={{color:'#86469C'}}></i>
                <h4> Return Guarantee </h4>
                <p>Didn't click with your latest read? No worries! Enjoy hassle-free returns and find the perfect book that speaks to you. Your satisfaction, our steadfast commitment.</p>
            </div>
        </div>
    )
}
