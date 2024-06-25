import { CSSProperties } from 'react'
import { Theme } from '../services/theme'

export function Text( props ) {
	const { light, medium, dark, radius, color } = Theme()

	const style: CSSProperties = {
		textAlign: props.max ? 'left' : 'center',
		fontSize: props.size ? props.size : '1rem',
		color: props.color ? props.color : dark,
		fontWeight: 'bold',
		fontStyle: props.italic ? 'italic' : '',
		cursor: props.hover ? 'pointer' : 'default',
		userSelect: 'none',
		flexGrow: props.grow ? 1 : 0,
		textTransform: props.transform ? props.transform : 'capitalize',
		display: props.max ? 'inline-block' : 'flex',
		whiteSpace: ( props.max || props.nowrap ) ? 'nowrap' : '',
		overflow: props.max ? 'hidden' : '',
		textOverflow: props.max ? 'ellipsis' : '',
		justifyContent: props.center ? 'center' : '',
		margin: 0,
		padding: props.padding | 0
	}

	return <p style={ { ...style, ...props.style } } onClick={ props.onClick }>{ props.label } </p>
}