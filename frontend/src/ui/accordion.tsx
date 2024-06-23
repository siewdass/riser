import React, { CSSProperties, useState } from 'react'
import { Styles, Theme } from '../services'
import { Text } from './'

export const Accordion = ( props ) => {
	const { color, light, dark } = Theme()
	const [ active, setActive ] = useState( false )

	const styles: Styles = {
		children: {
			display: active ? 'flex' : 'none',
			height: active ? 'auto' : 0,
			transition: 'all 3s ease-in',
			borderTop: `1px solid ${ color }`,
			margin: 15,
			paddingTop: 14,
			paddingBottom: 3,
			paddingLeft: 5
		},
		container: {
			borderRadius: 10,
			border: `1px solid ${ active ? color : dark }`,
		},
		label: {
			margin: 15,
			paddingBottom: 3,
			paddingLeft: 5
		}
	}

	const onClick = ( ) => {
		if ( props.onClick ) props.onClick( )
		setActive( !active )
	}

	return (
		<div style={ styles.container }>
			<Text label={ props.label } onClick={ onClick } style={ styles.label } />
			<div style={ styles.children }>{ props.children }</div>
		</div>
	)

}