import { useEffect, useState } from "react"
import { Link, useParams, useLocation } from "react-router-dom"
// import { getVans } from "../api" import function for mirage js
import { getVan } from "../api"


export default function VanDetails(){
    const location = useLocation()
    const params = useParams()
    const [van, setVan] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=> {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVan(params.id)
                setVan(data)
            } catch (err){
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVans()
     
    }, [params.id])

    if (loading) {
        return <h1>Loading...</h1>
    }
    
    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }
   
    const search = location.state && location.state.search || ""
    const type = location.state?.type || 'all'

    return (
        <div>
            <Link to={`..${search}`} relative="path"
                className="back-button">
                &larr; <span>Back to {type} vans</span>
            </Link>
            {van ? (
                <div className="van-detail-container">
                    <img src={van.imageUrl} alt={`Photo of ${van.name}`}/>
                    <div className="van-detail-info">
                        <i className={`van-type ${van.type} selected`}>{van.type}</i>
                        <h2>{van.name}</h2>
                        <p className="van-price"><span>${van.price}</span>/day</p>
                        <p className="van-description">{van.description}</p>
                        <button className="link-button">Rent this van</button>
                    </div>
                </div>
            ) : <h2>Loading...</h2>}
        </div>
    )
}