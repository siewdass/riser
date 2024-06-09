import { Theme } from '../services/theme'
import { useState } from 'react'

export const Modal = ( props ) => {
	const { light, dark, color } = Theme()
	const [ height, setHeight ] = useState( 0 )

	const styles: any = {
		background: {
			background: dark,
			position: 'fixed',
			zIndex: '49',
			transition: 'opacity 0.3s ease-in',
			width: props.open ? '100%' : '0',
			height: props.open ? '100%' : '0',
			opacity: props.open ? '0.4' : '0',
			left: '0',
			top: '0',
		},
		window: {
			position: 'fixed',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			background: color,
			zIndex: '50',
			transition: 'all .1s linear',
			... props.vertical ? {
				width: '100%',
				left: '0',
				borderRadius: '1rem 1rem 0 0',
				bottom: props.open ? 0 + height : '-100%'
			} : {
				height: '100%',
				top: '0',
				... props.left ? { left: props.open ? '0' : '-100%', } : { right: props.open ? '0' : '-100%' }
			}
		},
		ornament: {
			display: 'flex',
			background: light,
			height: '.3rem',
			width: '3rem',
			marginTop: '.5rem',
			borderRadius: '1rem'
		}
	}

	return (
		<>
			<div style={ { ...styles.background, ...props.style } } onClick={ ( ) => setTimeout( () => {props.onClose( false )}, 100 ) }></div>
			<div style={ { ...styles.window, ...props.style } }>
				<div style={ props.vertical ? styles.ornament : {} }></div>
				{ props.children }
			</div>
		</>
	)
}