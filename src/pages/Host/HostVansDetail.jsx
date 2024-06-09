import { useParams, Link, Outlet, NavLink } from "react-router-dom"
import { useState, useEffect } from "react"
// import { getHostVans } from "../../api"
import { getVan } from "../../api"

export default function HostVansDetail() {
    const { id } = useParams()
    const [currentVan, setCurrentVan] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const activeLink ={
        fontWeight: 'bold',
        textDecoration: "underline",
        color: '#161616'
    }

    useEffect(() => {
        async function LoadVans(){
            setLoading(true)
            try {
                const data = await getVan(id)
                 setCurrentVan(data)
            } catch(err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        LoadVans()
         
    }, [id])

   

    if(loading){
        return <h2>Loading...</h2>
    }

    if(error){
        return <h1>There was an error: {error.message}</h1>
    }

    return (       
        <section>
        <Link
            to=".."
            relative="path"
            className="back-button"
        >&larr; <span>Back to all vans</span></Link>
        {currentVan &&
            <section className="host-van-detail-layout-container">
                <div className="host-van-detail">
                    <img src={currentVan.imageUrl} alt={`Photo of ${currentVan.name}`}/>

                <div>
                
                    <div className="host-van-detail-info-text">
                            <i
                                className={`van-type van-type-${currentVan.type}`}
                            >
                                {currentVan.type}
                            </i>
                            <h3>{currentVan.name}</h3>
                            <h4>${currentVan.price}/day</h4>
                    </div>

                    <div className="host-van-detail-main-info">
                        <nav className="host-van-detail-nav">
                            <NavLink
                                to="."
                                end
                                style={({ isActive }) => isActive ? activeLink : null}
                            >
                                Details
                        </NavLink>
                            <NavLink
                                to="pricing"
                                style={({ isActive }) => isActive ? activeLink : null}
                            >
                                Pricing
                        </NavLink>
                            <NavLink
                                to="photos"
                                style={({ isActive }) => isActive ? activeLink : null}
                            >
                                Photos
                        </NavLink>
                        </nav>
                        <Outlet context={{ currentVan }} />
                    </div>
                </div>
            </div>
            </section>}
    </section>
    )
}