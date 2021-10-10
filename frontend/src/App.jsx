import React, { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink, Link } from 'react-router-dom';
import CreatePost from './components/CreatePost';
import AllPosts from './components/AllPosts';
import Context from './Context';
const light = "#fff";
const dark = "#18191a";
function localTheme() {
    const theme = localStorage.getItem("theme");
    if (theme) {
        return theme;
    }
    else {
        return light;
    }
}
function App() {
    const [theme, setTheme] = useState(localTheme());
    const style = {
        main: {
            background: theme === light ? light : dark,
            color: theme === light ? dark : light
        }
    }
    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme])
    return (
        <Router>
            <main style={style.main}>
                <header>
                    <div className="logo">
                        <Link to="/">
                            <h1>Q & A</h1>
                            <p>Creator</p>
                        </Link>
                        <div className="color">
                            <div className="theme" style={{ display: theme === light ? "flex" : "none" }} onClick={() => setTheme(dark)} title="Switch to Dark Mode">
                                <p>Dark</p>
                            </div>
                            <div className="theme" style={{ display: theme === light ? "none" : "flex" }} onClick={() => setTheme(light)} title="Switch to Light Mode">
                                <p>Light</p>
                            </div>
                        </div>
                    </div>
                    <div className="menu">
                        <li><NavLink exact to="/" activeClassName="active">Create Post</NavLink></li>
                        <li><NavLink exact to="/all-posts" activeClassName="active">All Posts</NavLink></li>
                    </div>
                </header>
                <Switch>
                    <Context.Provider value={theme}>
                        <Route path="/" component={CreatePost} exact />
                        <Route path="/all-posts" component={AllPosts} />
                    </Context.Provider>
                </Switch>
                <footer>
                    <p>&copy; 2021 qacreator by <a href="https://github.com/Pagnavathcoding">Pagnavath</a>.</p>
                </footer>
            </main>
        </Router>
    )
}
export default App;