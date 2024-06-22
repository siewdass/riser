import { CSSProperties, ReactElement } from 'react'

export function Row( props: any ): ReactElement {

	const style: CSSProperties = { 
		display: 'flex',
		flexDirection: 'row',
		flexGrow: props.grow ? 1 : 0,
		width: props.width ? '100%' : 'auto',
		height: props.height ? props.height : '',
		padding: props.padding ? props.padding : 0,
		margin: props.margin,
		gap: props.gap ? props.gap : 10,
		alignItems: props.align,
		justifyContent: props.justify,
		background: props.background,
		borderRadius: props.radius,
		border: props.border
	}

	return (
		<div onClick={ props.onClick } style={ { ...style, ...props.style } }>{ props.children }</div>
	)

}