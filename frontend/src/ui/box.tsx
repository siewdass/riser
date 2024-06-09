import React, { CSSProperties, ReactElement, useState } from 'react'
import { Theme } from '../services/theme'

export function Box( props: any ): ReactElement {

	const style: CSSProperties = { 
		display: 'flex',
		flexDirection: props.row ? 'row' : 'column',
		flexGrow: props.grow ? 1 : 0,
		height: props.height || '100%',
		width: props.width || '100%',
		minHeight: props.height,
		minWidth: props.width,
		padding: props.padding,
		margin: props.margin,
		gap: props.gap,
		alignItems: props.align,
		justifyContent: props.justify,
		background: props.background
	}

	return <div style={ { ...style, ...props.style } }>{ props.children }</div>

}