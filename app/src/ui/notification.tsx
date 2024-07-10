import React, { useRef } from 'react'
import { Style } from 'services'

let ref

export function Notification( ) {
	ref = useRef( )

	const style: Style = {
		visibility: 'hidden',
		minWidth: 250,
		marginLeft: -125,
		background: '#333',
		color: '#fff',
		textAlign: 'center',
		borderRadius: 2,
		padding: 16,
		position: 'fixed',
		zIndex: 1,
		left: '50%',
		bottom: 30,
		fontSize: 17,
	}

	return <div ref={ ref } style={ style }></div>
}

export function notify( param ) {
	ref.current.innerHTML = param
	ref.current.style.visibility = 'visible'
	ref.current.style.animation = 'fadein 0.5s, fadeout 0.5s 2.5s'
	setTimeout( ( ) => ref.current.style.visibility = 'hidden', 2500 )
}