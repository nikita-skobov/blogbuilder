import { useRef, useState, useEffect } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import styles from './Editor.module.css';



export const Editor = (props) => {
	const [editor, setEditor] = useState(null);
	const monacoEl = useRef(null);
	let editorref = null

	useEffect(() => {
		if (monacoEl && !editor) {
			editorref = monaco.editor.create(monacoEl.current, {
				value: ['# my blog title', ''].join('\n'),
				language: 'text',
				minimap: { enabled: false }
			})
			setEditor(editorref);

			setInterval(() => {
				props.onchange(editorref.getValue())
			}, 800)
		}

		return () => editor?.dispose();
	}, [monacoEl.current]);

	return <div className={styles.Editor} ref={monacoEl}></div>;
};
