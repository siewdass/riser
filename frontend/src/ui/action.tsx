import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CSSProperties, ReactElement, useState } from 'react'
import { Theme } from '../services/theme'

export function Action( props: any ): ReactElement {
	const [ hover, setHover ] = useState( false )
	const { color, radius, dark, light, shadow } = Theme()

	const style: CSSProperties = { 
		position: 'fixed',
		right: 20,
		bottom: 20,
		height: 55,
		width: 55,
		background: !hover ? color : dark,
		color: 'white',
		borderRadius: radius,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 30,
		border: `1px solid ${light}`
	}

	return (
		<div
			style={ { ...style, ...props.style } }
			onClick={ props.onClick }
			onMouseEnter={ () => setHover( true ) }
			onMouseLeave={ () => setHover( false ) }
		>
			<FontAwesomeIcon icon={ props.icon } size="lg" onClick={ props.click }/>
		</div>
	)

}