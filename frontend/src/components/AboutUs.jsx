import React from 'react'
import '../styles/promo.css'
import '../styles/aboutus.css'

export default function AboutUs() {
  return (
    <div className="aboutus-container">
                <div className="promo">
                    <span>HOT PROMO</span>
                    <span>Discount 60% Special World Book Day</span>
                </div>
                <div className="aboutus">
                    <h1>Find ver 20 million book in BookSphere</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem itaque tempore et, laboriosam iusto quis sed harum quasi laborum sit.</p>
                    <button class="cssbuttons-io-button">
                        Discover Books
                        <div class="icon">
                            <svg
                                height="24"
                                width="24"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <path
                                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                        </div>
                    </button>

                </div>
            </div>
  )
}
