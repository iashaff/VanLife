import bgImg from "../assets/about-img.png"
import { Link } from 'react-router-dom'

export default function About(){
    return(
        <div className="about-page">
            <img src={bgImg} alt="A man on a van under the starry sky."/>
            <div className="about-page-content">
                <h1>Don’t squeeze in a sedan when you could relax in a van.</h1>
                <p>Our mission is to enliven your road trip with the perfect travel van rental. 
                    Our vans are recertified before each trip to ensure your travel plans can go off without a hitch.
                    (Hitch costs extra 😉)
                </p>
                <p>Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.
                </p>
            </div>
            <div className="about-page-cta">
                <h2>Your destination is waiting. <br /> Your van is ready.</h2>
                <Link to="./vans" className="link-button">Explore our vans</Link>
            </div>
        </div>
    )
}