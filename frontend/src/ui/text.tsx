import { CSSProperties } from 'react'

export function Text( props ) {

	let style: CSSProperties = {
		textAlign: props.max ? 'left' : 'center',
		fontSize: props.size ? props.size : '1rem',
		color: props.color ? props.color : 'white',
		fontWeight: props.bold ? 'bold' : '',
		fontStyle: props.italic ? 'italic' : '',
		cursor: props.hover ? 'pointer' : 'default',
		userSelect: 'none',
		flexGrow: props.grow ? 1 : 0,
		textTransform: props.transform ? props.transform : '',

		display: props.max ? 'inline-block' : 'flex',
		whiteSpace: ( props.max || props.nowrap ) ? 'nowrap' : '',
		overflow: props.max ? 'hidden' : '',
		textOverflow: props.max ? 'ellipsis' : '' 
	}

	return <p style={ { ...style, ...props.style } } onClick={ props.onClick }>{ props.label } </p>
}