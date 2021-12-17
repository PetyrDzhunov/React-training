
const ValidationError = (props) => {
	return (
		<span style={{ color: 'red' }}>{props.children}</span>
	);
};

export default ValidationError;
