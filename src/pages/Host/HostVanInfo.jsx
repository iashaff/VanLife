import { useOutletContext } from "react-router-dom"

export default function HostVanInfo() {

    const { currentVan } = useOutletContext()
    return (
        <div className="host-van-outlet">
            <h4>Name:</h4>
            <p>{currentVan.name}</p>
            <h4>Category:</h4>
            <p>{currentVan.type}</p>
            <h4>Description:</h4>
            <p>{currentVan.description}</p>
            <h4>Visibility:</h4>
            <p>public</p>
        </div>
    )
}