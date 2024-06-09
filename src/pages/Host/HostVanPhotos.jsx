import { useOutletContext } from "react-router-dom"

export default function HostVanPhotos(){
    const { currentVan } = useOutletContext()
    return(
        <img className="host-van-image" src={currentVan.imageUrl} alt={`Photo of ${currentVan.name}`} />
    )
}