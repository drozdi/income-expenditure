export const ComponentBase = {
	defaultProps: {
		children: undefined,
		className: null
	},
	extend: (props = {}) => {
		const defaultProps = { ...ComponentBase.defaultProps, ...props.defaultProps };

		const getProps = (props, context = {}) => {
			ComponentBase.context = context;


			return Object.assign({}, defaultProps, props);
		};

		const getOtherProps = (props) => {
			return Object.keys(props)
				.filter((key) => !defaultProps.hasOwnProperty(key))
				.reduce((result, current) => {
					result[current] = props[current];
					return result;
				}, {});
		}

		return {
			getProps,
			getOtherProps
		}
	}
}