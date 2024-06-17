import React, { CSSProperties, ReactElement, useEffect, useState } from 'react'

import { Theme } from '../services/theme'

export function Table( { rows, columns }: any ): ReactElement {

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
		header: { background: '#71797E', color: 'white', borderTopLeftRadius: radius - 5, borderTopRightRadius: radius - 5, textTransform: 'uppercase' },
		content: { textTransform: 'capitalize', color: '#71797E' },
		element: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', fontWeight: 'bold' },
		line: { borderBottom: '1px solid #71797E'  }
	}

	return (
		<div style={ styles.container }>
			<div style={ { ...styles.element, ...styles.header } }>
				{ rows.map( ( item, index ) =>
					<div key={ index } style={ { ...styles.item } }>{ item.label }</div>
				) }
			</div>
			{ columns.map( ( item, index ) =>
				<div key={ index } style={ { ...styles.element, ...index != columns.length -1 ? styles.line : null } }>
					{ rows.map( e => e.label ).map( key =>
						<div key={ key } style={ { ...styles.item, ...styles.content } }>{ item[ key ] }</div>
					) }
				</div>
			) }
		</div>
	)

}