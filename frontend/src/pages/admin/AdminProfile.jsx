import { useSearchParams } from "react-router-dom"

function AdminProfile() {
    const [searchParams] = useSearchParams()
    const email    = searchParams.get("email"),
          password = searchParams.get("password")

    return (
        <div id="profile-container">
            <h1>{ email }</h1>
        </div>
    )
}

export default AdminProfile