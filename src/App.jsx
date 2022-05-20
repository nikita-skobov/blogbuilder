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

    return (
        <div className="keepit100">
            <div>
                <a href={`data:text/html,${markdowntext}`} download>Download</a>
            </div>
            <div className="l1">
                <Editor onchange={(newtext) => {
                    const rendered = md.render(newtext)
                    setMarkdownText(rendered)
                }} />
            </div>
            <div className="l1">
                <div className="markdown-body">
                    <Markdown html={markdowntext} />
                </div>
            </div>
        </div>
    )
}

export default App
