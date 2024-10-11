import "./AdminNavigationBar.css"

function AdminNavigationBar() {
    const pathname = location.pathname

    return (<>
        <div id="admin-navigation-bar">
            <a href="/profile"  className={ pathname == "/profile"?  "active" : "" }>Профиль</a>
            <a href="/schedule" className={ pathname == "/schedule"? "active" : "" }>Расписание</a>
            <a href="/patients" className={ pathname == "/patients"? "active" : "" }>Пациенты</a>
            <a href="/doctors"  className={ pathname == "/doctors"?  "active" : "" }>Доктора</a>
        </div>
        <div id="admin-navigation-bar-actions">
            <a href="/patients/new" id="new-patient">Новый пациент</a>
            <a href="/schedule/new" id="new-appointment">Новый приём</a>
            <a href="/logout" id="logout">→ Выход</a>
        </div>
    </>)
}

export default AdminNavigationBar