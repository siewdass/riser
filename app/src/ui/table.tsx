import React, { CSSProperties, ReactElement, useEffect, useState } from 'react'

import { Theme } from '../services'

export function Table( props: any ): ReactElement {
	const { color, light, dark, radius } = Theme()

  const [ isMobile, setIsMobile ] = useState( false )

  const resizeWindow = () => {
		setIsMobile( window.innerHeight > window.innerWidth )
  }

  useEffect( ( ) => {
    resizeWindow( )
    window.addEventListener( "resize", resizeWindow )
    return () => window.removeEventListener( "resize", resizeWindow )
  }, [] )

	const styles: { [ key: string ]: CSSProperties } = {
		container: { display: 'flex', flexDirection: 'column', border: '1px solid #71797E', borderRadius: radius },
		item: { display: 'flex', padding: 10, minWidth: 100, alignItems: 'center', justifyContent: 'center'},
		header: { background: color, color: 'white', borderTopLeftRadius: radius - 1, borderTopRightRadius: radius - 1, textTransform: 'uppercase' },
		content: { textTransform: 'capitalize', color: '#71797E' },
		element: { display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'space-between', fontWeight: 'bold' },
		line: { borderBottom: '1px solid #71797E'  }
	}

	return (
		<div style={ styles.container }>
			<div style={ { ...styles.element, ...styles.header } }>
				{ Object.keys( props?.data[ 0 ] ).map( ( item, index ) =>
					<div key={ index } style={ { ...styles.item } }>{ item }</div>
				) }
			</div>
			{ props?.data.map( ( item, index ) =>
				<div key={ index } style={ { ...styles.element, ...index != props?.data.length -1 ? styles.line : null } }>
					{ Object.keys( item ).map( key =>
						<div key={ key } style={ { ...styles.item, ...styles.content } }>{ typeof item[ key ] !== 'boolean' ? item[ key ] : item[ key ].toString( ) }</div>
					) }
				</div>
			) }
		</div>
	)

}