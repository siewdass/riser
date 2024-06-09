import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { CSSProperties, useState } from 'react'
import { Theme } from '../services/theme'
import { isTouch } from '../services/device'

export const Button = ( props ) => {
	const { light, medium, dark, radius } = Theme()

	const [ hover, setHover ] = useState( false )

	const style: CSSProperties = {
		width: props.width || '100%',
		height: props.height || '48px',
		border: props.border ? `1px solid ${light}` : '',
		color: 'white',
		borderRadius: radius,
		fontSize: 12,
		fontWeight: 'bold',
		cursor: 'pointer',
		outline: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		... hover ? { backgroundColor: dark } : { background: 'transparent' }
	}

	const click = ( ) => {
		props.onClick()
	}

	return (
		<div
			style={ { ...style, ...props.style } }
			onClick={ click }
			onMouseEnter={ () => setHover( true ) }
			onMouseLeave={ () => setHover( false ) }
		>
			{ props.label ? props.label : <FontAwesomeIcon icon={ props.icon } size="lg" /> }
		</div>
	)
}
