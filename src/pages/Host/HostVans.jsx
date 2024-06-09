import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getHostVans } from "../../api"

export default function HostVans () {
    const [vans, setVans] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try{
                const data = await getHostVans()
                 setVans(data)
            } catch(err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVans()
    }, [])

    const vanEl = vans.map(item => (
        <Link 
            to={item.id}
            key={item.id}
            className="host-van-link-wrapper">
            <div className="host-van-single" key={item.id}>
                <img src={item.imageUrl} alt={`Photo of ${item.name}`} />
                <div className="host-van-info">
                    <h3>{item.name}</h3>
                    <p>${item.price}<span>/day</span></p>
                </div>
                
            </div>
        </Link>
    )

    )
    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }


    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <div className="host-vans-list">
                {
                    vans.length > 0 ? (
                        <section className="rendered-host-vans">
                            {vanEl}
                        </section>

                    ) : (
                            <h2>Loading...</h2>
                        )
                }
            </div>
        </section>

        )
    
}