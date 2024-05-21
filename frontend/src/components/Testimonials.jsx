import React from "react";
import "../styles/testimonials.css";

export default function Testimonials() {
    return (
        <>
            <div
                style={{
                    margin: "5rem 2rem 2rem 3rem",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <h2>Testimonials</h2>
            </div>
            <div className="testimonials">
                <div className="testimonial">
                    <div className="comment">
                        <div class="rating">
                            <div id="star"></div>
                            <div id="star"></div>
                            <div id="star"></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div className="description">
                            <p>
                                This book rental service is fantastic! The selection is vast, and
                                the delivery is incredibly fast. I've discovered so many great books
                                I wouldn't have otherwise. Highly recommended!
                            </p>
                        </div>
                    </div>
                    <div className="commenter">
                        <div className="profile">
                            <h2>Joe Doe</h2>
                            <p>Digital Marketing</p>
                        </div>
                        <div>
                            <img
                                src="https://qph.cf2.quoracdn.net/main-thumb-1529746431-200-ilmthkmwexpgmbqqgkiwdanovfosliym.jpeg"
                                style={{ height: "45px", width: "45px", borderRadius: "50%", objectFit: 'cover' }}
                                alt="Profile image"
                            />
                        </div>
                    </div>
                </div>
                <div className="testimonial">
                    <div className="comment">
                        <div class="rating">
                            <div id="star"></div>
                            <div id="star"></div>
                            <div id="star"></div>
                            <div id="star"></div>
                            <div id="star"></div>
                        </div>
                        <div className="description">
                            <p>
                                This book rental library has been a game-changer for me. I can rent multiple books at a fraction of the cost of buying them. Plus, the return process is super easy."
                            </p>
                        </div>
                    </div>
                    <div className="commenter">
                        <div className="profile">
                            <h2>Sophie Monroe</h2>
                            <p>Human ressources</p>
                        </div>
                        <div>
                            <img
                                src="https://lh3.googleusercontent.com/proxy/aW6d9fP-XzgF4PaYmf7yCHqxSxondJggySDTtBvu3NvD75Rcc0hbF8JvW-MyXXhHvTXgDht0UTPrv3sAOEmucVba4kMwuVPeqwYE1vM"
                                style={{ height: "45px", width: "45px", borderRadius: "50%", objectFit: 'cover' }}
                                alt="Profile image"
                            />
                        </div>
                    </div>
                </div>
                <div className="testimonial">
                    <div className="comment">
                        <div class="rating">
                            <div id="star"></div>
                            <div id="star"></div>
                            <div id="star"></div>
                            <div id="star"></div>
                            <div></div>
                        </div>
                        <div className="description">
                            <p>
                                Renting books has never been easier. The user-friendly website and the wide range of genres available make it my go-to place for finding new reads.
                            </p>
                        </div>
                    </div>
                    <div className="commenter">
                        <div className="profile">
                            <h2>Alex Dovetsky</h2>
                            <p>Phycology</p>
                        </div>
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                                style={{ height: "45px", width: "45px", borderRadius: "50%", objectFit: 'cover' }}
                                alt="Profile image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
