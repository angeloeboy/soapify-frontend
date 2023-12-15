const RenderSlateContent = ({ content }) => {
	const renderElement = (element) => {
		switch (element.type) {
			case "h2":
				return <h4>{element.children.map(renderChild)}</h4>;
			case "paragraph":
				return <p>{element.children.map(renderChild)}</p>;
			default:
				return <p>{element.children.map(renderChild)}</p>;
		}
	};

	const renderChild = (child) => {
		if (child.text) {
			return child.text.split("\n").reduce((acc, line, i, array) => {
				if (i < array.length - 1) {
					return acc.concat([line, <br key={i} />]);
				} else {
					return acc.concat(line);
				}
			}, []);
		}
		// Add other cases here for more complex structures
	};

	return (
		<div>
			{content.map((node, index) => {
				return <div key={index}>{renderElement(node)}</div>;
			})}
		</div>
	);
};

export default RenderSlateContent;
