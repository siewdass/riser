import React, { CSSProperties, ReactElement } from 'react'

export function Col( props: any ): ReactElement {

	const style: CSSProperties = { 
		display: 'flex',
		flexDirection: 'column',
		flexGrow: props.grow ? 1 : 0,
		height: props.height ? '100%' : 'auto',
		width: props.width,
		padding: props.padding,
		margin: props.margin,
		gap: props.gap,
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