import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Context from '../Context';
const light = "#fff";
const dark = "#242526";
const gray = "#eee";
function AllPosts() {
    const theme = useContext(Context);
    const [data, setData] = useState([]);
    useEffect(async () => {
        axios.get('https://qacreator-service.herokuapp.com/api/post').then((data) => {
            setData(data.data);
        }).catch((err) => {
            return err;
        })
    }, []);
    const style = {
        input: {
            border: theme === light ? `0.1em solid ${gray}` : `none`,
            background: theme === light ? light : dark,
            color: theme === light ? dark : gray,
        },
        item: {
            background: theme === light ? light : dark,
            fontSize: "16px",
            border: theme === light ? `0.1em solid ${gray}` : `none`,
        }
    }
    const posts = data.length < 10 ? "0" + data.length : data.length;
    const [toggle, setToggle] = useState(false);
    const [read, setRead] = useState([]);
    const [value, setValue] = useState("");
    function readMore(id) {
        setToggle(!toggle);
        const infos = data.filter((data) => {
            return data._id === id;
        })
        setRead(infos);
    }
    const infos = data.filter((data) => {
        return data.question.toLowerCase().includes(value.toLowerCase().trim())
    })
    return (
        <section className="posts">
            <div className="more" style={{ display: toggle ? "flex" : "none" }}>
                <div className="more-infos">
                    <div className="quest">
                        <h4>Question:</h4>
                        <p>{read.length > 0 && read[0].question}</p>
                    </div>
                    <div className="ans">
                        <h4>Answer:</h4>
                        <p>{read.length > 0 && read[0].answer}</p>
                    </div>
                    <div className="close">
                        <button onClick={() => setToggle(!toggle)}>Close</button>
                    </div>
                </div>
            </div>
            <div className="post">
                <div className="post-title">
                    <h1>All Posts <span style={{ color: "#39a2db" }}>{posts.toLocaleString()}</span></h1>
                    <div className="search">
                        <input type="text" placeholder="Search by question..." style={style.input} value={value} onChange={e => setValue(e.target.value)} />
                    </div>
                </div>
                <div className="not-found" style={{ display: infos.length > 0 ? "none" : "block" }}>
                    <h1>Question not found!</h1>
                </div>
                <div className="post-infos">
                    <div className="infos">
                        {
                            infos.map((data) => {
                                return (
                                    <div key={data._id} className="item" style={style.item}>
                                        <div className="name-date">
                                            <p>🧍 {data.name}</p>
                                            <p style={{ color: "#999", fontSize: "14px" }}>{data.date.slice(0, 16)}</p>
                                        </div>
                                        <div className="question">
                                            <h4>Question:</h4>
                                            <p>{data.question.length > 50 ? data.question.slice(0, 50).trim() + "..." : data.question}</p>
                                        </div>
                                        <div className="answer">
                                            <h4>Answer:</h4>
                                            <p>{data.answer.length > 50 ? data.answer.slice(0, 50).trim() + "..." : data.answer}</p>
                                        </div>
                                        <div className="read-more" style={{ display: data.question.length > 50 || data.answer.length > 50 ? "flex" : "none", marginTop: "0.5em" }}>
                                            <button onClick={() => readMore(data._id)}>Read More</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
export default AllPosts;