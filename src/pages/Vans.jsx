import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { getVans } from '../api'

export default function Vans(){
    const [vans, setVans] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const typeFilter = searchParams.get('type')
    
    useEffect(() => {
        async function loadVans(){
            setLoading(true)
            try {
                const data = await getVans()
                setVans(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
            
        } 
            
        loadVans()
    }, [])

    const filteredVan = typeFilter
    ? vans.filter(van => van.type === typeFilter)
    : vans
     
    const vanEl = filteredVan.map(van => (
        <div key={van.id} className="van-tile">
            <Link 
                to={van.id}
                state={{ 
                    search: `?${searchParams.toString()}`,
                    type: typeFilter
                     }}
            >
                <img src={van.imageUrl} alt={`Photo of ${van.name}`}/>
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p><span>${van.price}</span>/day</p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ))

        function handleFilterChange(key, value) {
            setSearchParams(prevParams => {
                if (value === null) {
                    prevParams.delete(key)
                } else {
                    prevParams.set(key,value)
                }
                return prevParams
            })
        }

        if(loading) {
            return <h1 aria-live="polite">Loading ...</h1>
        }

        if(error){
            return <h1 aria-live="assertive">There was an error: {error.message}</h1>
        }

    return(
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">
                <button className={
                    `van-type simple ${typeFilter === 'simple' ? 'selected' : ''}` }
                    onClick={() => handleFilterChange("type","simple")}>
                    Simple
                </button>
                <button className={
                    `van-type luxury ${typeFilter === 'luxury' ? 'selected' : ''}` } 
                    onClick={() => handleFilterChange("type", "luxury")}>
                    Luxury
                </button>
                <button className={
                    `van-type rugged ${typeFilter === 'rugged' ? 'selected' : ''}` }
                    onClick={() => handleFilterChange("type", "rugged")}>
                    Rugged
                </button>
                { typeFilter ? (
                    <button className="van-type clear-filters"
                    onClick={()=> handleFilterChange("type", null)}> 
                    Clear filter 
                </button>
                ): null
                }
                
            </div>
           
                <div className="van-list">
                    {vanEl}
                </div>
        </div>
    )
}