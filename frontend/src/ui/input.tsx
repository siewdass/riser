import React, { CSSProperties, ReactElement, useState } from 'react'
import { Theme } from '../services/theme'
import { error } from 'console'

export function Input( props ): ReactElement {
	const { color, light, dark, radius } = Theme()
	const [ hover, setHover ] = useState( false )
	const [ focus, setFocus ] = useState( false )
	const [ active, setActive ] = useState( false )

	const floating: any = {
		position: 'absolute',
		padding: 2,
		transition: 'all .1s ease-in',
		userSelect: 'none',
		pointerEvents: 'none',
		background: light,
		textTransform: 'capitalize',
		fontWeight: 'bold'
	}

	const styles: { [ key: string ]: CSSProperties } = {
		container: {
			position: 'relative'
		},
		input: {
			WebkitBoxShadow: `0 0 0 30px inherit inset`,
			WebkitTextFillColor: active || focus ? color : dark,
			textIndent: '.5rem',
			border: focus || hover ? `.1px solid ${color}` : `.1px solid ${dark}`,
			padding: '.85rem',
			width: '100%',
			borderRadius: radius,
			outline: 'none',
			fontSize: '0.8rem',
			background: 'inherit'
		},
		label: {
			...floating,
			left: '1.2rem',
			top: active || focus ? '-.70rem' : '.50rem',
			fontSize: active || focus ?  '0.7rem' : '1rem',
			color: active || focus ? color : dark,
			background: active || focus ? light : '',
		},
		error: {
			...floating,
			top: '2.25rem',
			right: '1rem',
			fontSize: '0.7rem',
			color: 'red'
		}
	}

	return (
		<div
			style={ styles.container }
			onMouseEnter={ e => setHover( true ) }
			onMouseLeave={ e => setHover( false ) }
		>
			<input
				type={ props.form.validations[ props.name ].type }
				{ ...props.form.register( props.name, props.form.validations[ props.name ] ) }
				onInput={ ( e: any ) => setActive( e.target.value ? true : false ) }
				onFocus={ e => setFocus( true ) }
				onBlur={ e => setFocus( false ) }
				style={ styles.input }
				autoComplete='new-password'
			/>
			<label style={ styles.label } >{ props.name }</label>
			{ props.form.errors[ props.name ] ? <label style={ styles.error } >{ props.form.errors[ props.name ]?.message }</label> : null}
		</div>
	)
}