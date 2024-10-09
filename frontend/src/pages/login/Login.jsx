import './Login.css'


function Login() {
    return (
        <div id="login-container">
            <div id="inputs">
                <form method="get" action="/profile">
                    <input type="email" id="email" name="email" placeholder="Почта"/><br/>
                    <input type="password" id="password" name="password" placeholder="Пароль"/><br/>
                    <input type="submit" value="Вход"></input>
                </form>
            </div>
        </div>
    )
}

export default Login