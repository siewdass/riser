import { CSSProperties, ReactElement, useState } from 'react'
import { Theme } from '../services/theme'

export function Input( props ): ReactElement {
	const { color, light, dark, radius } = Theme()
	const [ hover, setHover ] = useState( false )
	const [ focus, setFocus ] = useState( false )
	const [ active, setActive ] = useState( false )

	const styles: { [ key: string ]: CSSProperties } = {
		container: {
			position: 'relative'
		},
		input: {
			WebkitBoxShadow: `0 0 0 30px ${props.background || color} inset`,
			WebkitTextFillColor: props.color || light,
			textIndent: '.5rem',
			border: props.color ? `.1rem solid ${props.color}` : ( focus || hover ? `.1rem solid ${dark}` : `.1rem solid ${light}` ),
			padding: '.85rem',
			color: props.color || 'white',
			width: '100%',
			borderRadius: radius,
			outline: 'none',
			fontSize: '0.8rem',
		},
		title: {
			position: 'absolute',
			padding: '.4rem',
			transition: 'all .1s ease-in',
			userSelect: 'none',
			pointerEvents: 'none',
			background: props.background || color,
			textTransform: 'capitalize',
			... active || focus ? {
				top: '-.80rem',
				left: '1rem',
				fontSize: '0.7rem',
			} : {
				top: '.45rem',
				left: '.8rem',
				fontSize: '0.8rem',
			},
			... focus || hover ? {
				color: dark
			} : {
				color: props.color || light,
			}
		},
		error: {
			position: 'absolute',
			padding: '.4rem',
			transition: 'all .1s ease-in',
			userSelect: 'none',
			background: color,
			top: '2rem',
			right: '1rem',
			fontSize: '0.7rem',
			color: 'red',
		}
	}

	return (
		<div
			style={ styles.container }
			onMouseEnter={ e => setHover( true ) }
			onMouseLeave={ e => setHover( false ) }
		>
			<input
				type={ props.form[ props.name ].type || props.type }
				{ ...props.form.register( props.name, props.form[ props.name ] ) }
				onInput={ ( e: any ) => e.target.value ? setActive( true ) : setActive( false ) }
				onFocus={ e => setFocus( true ) }
				onBlur={ e => setFocus( false ) }
				style={ styles.input }
			/>
			<label
				style={ styles.title }
			>{ props.name }
			</label>
			{props.form.errors[ props.name ] ? <label style={ styles.error } >{ props.form.errors[ props.name ]?.message }</label> : null}
		</div>
	)
}