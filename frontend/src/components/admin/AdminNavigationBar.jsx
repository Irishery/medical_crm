import "./AdminNavigationBar.css"

function AdminNavigationBar() {
    const pathname = location.pathname
    console.log(pathname)

    return <div id="admin-navigation-bar">
        <a href="/profile"  className={ pathname == "/profile"?  "active" : "" }>Профиль</a>
        <a href="/schedule" className={ pathname == "/schedule"? "active" : "" }>Расписание</a>
        <a href="/patients" className={ pathname == "/patients"? "active" : "" }>Пациенты</a>
    </div>
}

export default AdminNavigationBar