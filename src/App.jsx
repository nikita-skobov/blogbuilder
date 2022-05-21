import { useState } from 'react';
import './App.css'
import { Editor } from './Editor'
import MarkdownIt from 'markdown-it'

function Markdown(props) {
    console.log('rendering:')
    console.log(props.html)
    return (
        <div
            dangerouslySetInnerHTML={{ __html: props.html }}
        />
    )
}

function App() {
    const md = new MarkdownIt()
    const [markdowntext, setMarkdownText] = useState("");
    const [formOpen, toggleForm] = useState(false);

    return (
        <div className="keepit100">
            <div>
                <a href={`data:text/html,${markdowntext}`} download>Download</a>
                <span> | </span>
                <a href="#" onClick={() => {toggleForm(!formOpen)}}>Upload</a>
            </div>
            {formOpen && (
                <div>
                    <input id="titlefile" type="text" placeholder="title/file name"/>
                    <br />
                    <input id="uploadto" type="text" placeholder="upload to"/>
                    <br />
                    <input id="pass" type="password" placeholder="pass"/>
                    <br />
                    <input type="submit" value="upload"
                        onClick={() => {
                            const titlefile = document.getElementById('titlefile').value
                            const uploadto = document.getElementById('uploadto').value
                            const pass = document.getElementById('pass').value
                            const obj = { titlefile, uploadto, pass }
                            fetch(uploadto, {
                                method: 'POST',
                                headers: { 'x-at': pass },
                                body: JSON.stringify({title: titlefile, content: markdowntext})
                            })
                        }}
                    />
                </div>
            )}
            <div className="l1">
                <Editor onchange={(newtext) => {
                    const rendered = md.render(newtext)
                    setMarkdownText(rendered)
                }} />
            </div>
            <div className="l1 scroll1">
                <div className="markdown-body">
                    <Markdown html={markdowntext} />
                </div>
            </div>
        </div>
    )
}

export default App
