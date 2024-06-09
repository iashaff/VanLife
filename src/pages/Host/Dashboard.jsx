import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { BsStarFill } from "react-icons/bs";
import { getHostVans } from "../../api"
import {nanoid} from 'nanoid'


export default function Dashboard() {
    const [vans, setVans]  = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=> {
        setLoading(true)
        getHostVans()
            .then(data => setVans(data))
            .catch(err => setError(err))
            .finally(()=> setLoading(false))
    },[])

    function renderVanElements(vans) {
        const hostVansEls = vans.map((van) => (
            <Link to={`vans/${van.id}`}>
                <div className="host-van-single" key={van.id}>
                    <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                    <div className="host-van-info">
                        <h3>{van.name}</h3>
                        <p>${van.price}/day</p>
                    </div>
                </div>
            </Link>
        ))

        return (
            <div className="host-vans-list" >
                <section className="rendered-host-vans" key={nanoid()}>
                    {hostVansEls}
                </section>
            </div>
        )
    }

    if (error) {
        return <h1>Error: {error.message}</h1>
    }

    return(
        <div className="dashboard-container">
        <section className="host-dashboard-top-section">
            <Link to="income">
                <div className="host-dashboard-earnings">
                    <div className="info">
                        <h1>Welcome!</h1>
                        <p>Income last <span>30 days</span></p>
                        <h2>$2,260</h2>
                    </div>
                </div>
            </Link>
            <Link to="reviews">
                <div className="host-dashboard-reviews">
                    <div className="info">
                        <h2>Review score</h2>
                        <div className="score">
                            <BsStarFill className="star" />
                            <p>
                                <span>5.0</span>/5
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </section>
        <section className="host-dashboard-vans">
            <div className="top">
                <h2>Your listed vans</h2>
                <Link to="vans">View all</Link>
            </div>
            {
                loading && !vans
                ? <h1>Loading...</h1>
                : (
                    <>
                        {renderVanElements(vans)}
                    </>
                )
            }
        </section>
    </div>
      
    )
}