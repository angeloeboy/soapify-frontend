import React, { useState, useMemo, useCallback, useEffect } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

import { Transforms, Element as SlateElement } from "slate";
import styled from "styled-components";
import RenderSlateContent from "./renderAbout";
import { editTermsAndConditions, getTermsAndConditions } from "@/api/site_settings";
import { toast } from "react-toastify";

const EditedSlate = styled(Editable)`
	background: rgb(255, 255, 255);
	max-width: 42em;
	/* margin: 20px auto; */
	padding: 20px;
	color: red;
	min-height: 200px;
`;

const SaveButton = styled.button`
	min-width: 100px;
	max-width: 200px;
	padding: 0.5rem 1rem;
	border-radius: 5px;
	border: none;
	display: block;
	margin-right: 5px;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	background-color: rgba(0, 32, 86, 1);
	color: white;
	margin-top: 1rem;
	margin-bottom: 40px;
	&:hover {
		background-color: #012a70;
	}
`;

const Button = styled.div`
	/* min-width: 100px; */
	max-width: 200px;
	padding: 6px;
	font-size: 12px;
	border-radius: 5px;
	border: none;
	display: inline-block;
	margin-right: 5px;
	margin-bottom: 16px;
	background-color: ${(props) => (props.$open ? "#34b4eb" : "#fffff")};
	color: ${(props) => (props.$open ? "#fff" : "#000")};
	border: ${(props) => (props.$open ? "1px solid #34b4eb" : "1px solid #000")};
	text-align: center;
	cursor: pointer;
	margin-top: 1rem;
`;

const MyEditor = () => {
	const editor = useMemo(() => withReact(createEditor()), []);
	const [isButtonDisabled, setButtonDisabled] = useState(false); // State to control button disabled
	const [value, setValue] = useState([
		// {
		// 	type: "paragraph",
		// 	children: [
		// 		{
		// 			text: "This is editable asdfasdf",
		// 		},
		// 	],
		// },
		// {
		// 	type: "paragraph",
		// 	children: [
		// 		{
		// 			text: "",
		// 		},
		// 	],
		// },
		// {
		// 	type: "paragraph",
		// 	children: [
		// 		{
		// 			text: "asdfasdfadfasdf",
		// 		},
		// 	],
		// },
	]);

	// const insertH2 = () => {
	// 	const text = { text: "" };
	// 	const h2Block = { type: "h2", children: [text] };
	// 	Transforms.insertNodes(editor, h2Block);
	// };

	// const renderElement = useCallback((props) => {
	// 	switch (props?.element?.type) {
	// 		case "h2":
	// 			return <h2 {...props?.attributes}>{props?.children}</h2>;
	// 		// ... (other cases)
	// 		default:
	// 			return <p {...props?.attributes}>{props?.children}</p>;
	// 	}
	// }, []);

	// const handleChange = useCallback((newValue) => {
	// 	setValue(newValue);
	// }, []);

	// const toggleButton = () => {
	// 	setButtonDisabled(!isButtonDisabled);
	// };

	const applyFormat = (format) => {
		Transforms.setNodes(editor, { type: format }, { match: (n) => SlateElement.isElement(n), split: true });
	};

	const save = async () => {
		console.log(value);

		const res = await editTermsAndConditions(value);

		if (!res) return;

		if (res.status === "Success") {
			toast.success("Terms and Conditions updated successfully");
		}
	};

	const getTermsAndConditionsFunc = async () => {
		const res = await getTermsAndConditions();

		if (!res) return;

		// if (res.status === "Success") {
		// }

		setValue(res.data.terms_and_conditions_text);

		console.log(res.data.terms_and_conditions_text);
	};

	useEffect(() => {
		getTermsAndConditionsFunc();
	}, []);

	return (
		<div>
			<h2>Terms and Conditions</h2>
			<Button
				onClick={(e) => {
					e.preventDefault();
					applyFormat("h2");
				}}
			>
				H2
			</Button>
			<Button
				onClick={(e) => {
					e.preventDefault();
					applyFormat("paragraph");
				}}
			>
				Paragraph
			</Button>

			{value.length > 0 && (
				<Slate editor={editor} initialValue={value} onChange={setValue}>
					<EditedSlate
						renderElement={({ attributes, children, element }) => {
							switch (element.type) {
								case "h2":
									return <h3 {...attributes}>{children}</h3>;
								case "paragraph":
									return <p {...attributes}>{children}</p>;
								default:
									return <p {...attributes}>{children}</p>;
							}
						}}
					/>
				</Slate>
			)}

			{/* <Slate editor={editor} initialValue={value} onChange={setValue}>
				<EditedSlate
					renderElement={({ attributes, children, element }) => {
						switch (element.type) {
							case "h2":
								return <h3 {...attributes}>{children}</h3>;
							case "paragraph":
								return <p {...attributes}>{children}</p>;
							default:
								return <p {...attributes}>{children}</p>;
						}
					}}
				/>
			</Slate> */}

			<SaveButton onClick={() => save()}>Save</SaveButton>
			{/* {value.length > 0 && <RenderSlateContent content={value} />} */}
			{/* <RenderSlateContent content={value} /> */}
		</div>
	);
};

export default MyEditor;
