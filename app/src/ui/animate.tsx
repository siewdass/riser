import React, { } from 'react'

import { motion } from 'framer-motion'
import { Style } from '../services/types'

export function Animate( props ) {

	const style: Style = {
		overflowY: 'scroll',
		flexGrow: 1
	}

	return (
		<motion.div
			initial={ { opacity: 0, y: 100 } }
			animate={ { opacity: 1, y: 0 } }
			transition={ { bounce: 0, duration: .1 } }
			exit={ { opacity: 0, y: -100 } }
			style={ { ...style, ...props.style } }
		>
			{ props.children }
		</motion.div>
	)
	
}
