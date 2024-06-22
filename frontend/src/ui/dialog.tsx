import { transform } from 'framer-motion'
import { Theme } from '../services/theme'

export const Dialog = ( props ) => {
	const { color } = Theme( )

	const styles: any = {
		background: {
			background: '#71797e',
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
			background: 'inherit',
			zIndex: '50',
			opacity: props.open ? 1 : 0,
			transition: 'opacity .1s, width 2s, height 2s, linear',
			width: props.open ? '80%' : 0,
			height: props.open ? 'auto' : 0,
			left: '10%',
			top: '40%',
			padding: 20,
			gap: 20,
			borderRadius: 20,
			border: '1px solid #71797e'
		},
		title: {
			fontSize: 20,
			color: color,
			pointerEvent: 'none'
		}
	}

	return (
		<>
			<div style={ styles.background } onClick={ ( ) => setTimeout( () => {props?.onClose( false )}, 100 ) }></div>
			<div style={ styles.window }>
				<div style={ styles.title }>{ props.title }</div>
				<div>{ props.children }</div>
			</div>
		</>
	)

}