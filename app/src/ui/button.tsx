import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { CSSProperties, useState } from 'react'
import { Theme } from '../services/theme'

export const Button = ( props ) => {
	const { light, medium, dark, radius, color } = Theme()

	const [ hover, setHover ] = useState( false )

	const style: CSSProperties = {
		width: props.width || '100%',
		height: props.height || 48,
		border: `.1px solid ${dark}`,
		color: hover ? 'white' : dark,
		borderRadius: radius,
		fontSize: '1rem',
		fontWeight: 'bold',
		cursor: 'pointer',
		outline: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: hover ? color : 'inherit',
		textTransform: 'capitalize',
		userSelect: 'none'
	}

	return (
		<div
			style={ {...style, ...props.style } }
			onClick={ props?.onClick }
			onMouseEnter={ () => setHover( true ) }
			onMouseLeave={ () => setHover( false ) }
		>
			{ props.label ? props.label : <FontAwesomeIcon icon={ props.icon } size="lg" /> }
		</div>
	)
}
