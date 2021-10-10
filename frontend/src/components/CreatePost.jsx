import React, { useState, useEffect, useContext } from 'react';
import Context from '../Context';
import axios from 'axios';
const light = "#fff";
const dark = "#242526";
const gray = "#eee";
function CreatePost() {
    const theme = useContext(Context);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const username = firstName + lastName;
    const style = {
        input: {
            border: theme === light ? `0.1em solid ${gray}` : `none`,
            background: theme === light ? light : dark,
            color: theme === light ? dark : gray,
        },
        dot1: {
            background: firstName === "" || lastName === "" || username.length > 26 ? "red" : "green"
        },
        dot2: {
            background: question === "" || question.length > 350 ? "red" : "green"
        },
        dot3: {
            background: answer === "" || answer.length > 350 ? "red" : "green"
        },
        btn: {
            display: firstName === "" || lastName === "" || question === "" || answer === "" || question.length > 350 || answer.length > 350 || username > 26 ? "none" : "block"
        }
    }
    const [toggle, setToggle] = useState("Publish");
    function handleSubmit() {
        axios.post('https://qacreator-service.herokuapp.com/api/post', {
            name: `${firstName} ${lastName}`,
            question: question,
            answer: answer
        });
        setToggle("Published");
    }
    function clearForm() {
        setFirstName("");
        setLastName("");
        setQuestion("");
        setAnswer("");
        setToggle("Publish");
    }
    return (
        <section className="container">
            <div className="content">
                <div className="title">
                    <h1>Create Post</h1>
                </div>
                <div className="enter">
                    <div className="user">
                        <p>Username <span style={{ fontSize: "14px", color: "#999", fontFamily: '"Merriweather", serif' }}>({username.length > 26 ? 26 : username.length}/26)</span><span style={{ display: username.length > 26 ? "block" : "none", color: "red", fontFamily: '"Merriweather", serif' }}>-{username.length - 26}</span></p>
                        <div className="username">
                            <input type="text" placeholder="First name" style={style.input} value={firstName} onChange={e => setFirstName(e.target.value)} />
                            <input type="text" placeholder="Last name" style={style.input} value={lastName} onChange={e => setLastName(e.target.value)} />
                        </div>
                    </div>
                    <div className="q">
                        <p>Question <span style={{ fontSize: "14px", color: "#999", fontFamily: '"Merriweather", serif' }}>({question.length > 350 ? 350 : question.length}/350) <span style={{ display: question.length > 350 ? "block" : "none", color: "red", fontFamily: '"Merriweather", serif' }}>-{question.length - 500}</span></span></p>
                        <textarea name="question" placeholder="Question..." style={style.input} value={question} onChange={e => setQuestion(e.target.value)}></textarea>
                    </div>
                    <div className="a">
                        <p>Answer <span style={{ fontSize: "14px", color: "#999", fontFamily: '"Merriweather", serif' }}>({answer.length > 350 ? 350 : answer.length}/350) <span style={{ display: answer.length > 350 ? "block" : "none", color: "red", fontFamily: '"Merriweather", serif' }}>-{answer.length - 350}</span></span></p>
                        <textarea name="answer" placeholder="Answer..." style={style.input} value={answer} onChange={e => setAnswer(e.target.value)}></textarea>
                    </div>
                    <div className="match">
                        <div className="matching">
                            <div className="dot" style={style.dot1}></div>
                            <p>Username: required</p>
                        </div>
                        <div className="matching">
                            <div className="dot" style={style.dot2}></div>
                            <p>Question: required</p>
                        </div>
                        <div className="matching">
                            <div className="dot" style={style.dot3}></div>
                            <p>Answer: required</p>
                        </div>
                    </div>
                    <div className="submit" style={style.btn}>
                        <button onClick={handleSubmit}>{toggle === "Publish" ? "Publish" : "Published"}</button>
                        <button style={{ marginLeft: "1em", background: "red" }} onClick={clearForm}>Clear Form</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default CreatePost;