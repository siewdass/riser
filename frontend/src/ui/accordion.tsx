import { CSSProperties } from 'react'

export const Accordion = ( props ) => {

	const style: CSSProperties = {
		transition: 'height .1s ease-in',
		height: props.active ? 200 : 0,
		display: 'flex',		
	}

	return <div style={ style }>{ props.children }</div>

}