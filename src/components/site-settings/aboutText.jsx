import { convertToRaw, EditorState } from "draft-js";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { Fragment } from "react";

const AboutTextEditor = () => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [text, setText] = useState();
	const [render, setRender] = useState(false);

	const onEditorStateChange = (editorState) => {
		setEditorState(editorState);
		const text = editorState.getCurrentContent().getPlainText("\u0001");
		setText(text);
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			setRender(false);
		} else {
			setRender(true);
		}
	}, []);

	return (
		<>
			<div style={{ height: "80px", overflow: "auto" }}>{text}</div>

			{render && (
				<Editor
					editorState={editorState}
					toolbarClassName="toolbarClassName"
					wrapperClassName="wrapperClassName"
					editorClassName="editorClassName"
					onEditorStateChange={onEditorStateChange}
				/>
			)}
		</>
	);
};

export default AboutTextEditor;
