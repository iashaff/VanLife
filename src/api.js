import { initializeApp } from "firebase/app"
import { getFirestore, collection, doc, getDocs, getDoc, query, where } from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyAapSb-vkFJpH_OKWe0QNqq6rh8p_OoSEc",
  authDomain: "vanlife-ea700.firebaseapp.com",
  projectId: "vanlife-ea700",
  storageBucket: "vanlife-ea700.appspot.com",
  messagingSenderId: "871552645679",
  appId: "1:871552645679:web:f92a1d8c1dacf1e70d64da"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const vansCollectionRef = collection(db, 'vans')

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id){
   const docRef =  doc(db, "vans", id)
   const snapshot = await getDoc(docRef)
   return {
    ...snapshot.data(),
    id: snapshot.id
   }
}

// export async function getVans(id) {
//     const url = id ? `/api/vans/${id}` : "/api/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function getHostVans(){
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))

    return vans
}

// export async function getHostVans(id) {
//     const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}