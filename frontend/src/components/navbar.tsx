import React, { useEffect, useState } from 'react'
import { Box, Row, Col, Table, Button, Text } from '../ui'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Theme } from '../services/theme'

function Icon( {name, color} ) {
  const [ hover, setHover ] = useState( false)
  return ( 
    <FontAwesomeIcon
      icon={ name }
      color={ color }
      size="xl"
      onMouseEnter={() => setHover( true ) }
      onMouseLeave={() => setHover( false ) }
      style={{ padding: 5, borderBottom: hover ? '2px solid red' : 'none', width: '20%' }}
    />
  )
}

export function Navbar( ) {
	const { color, light } = Theme()

	return (
		<Col>
      <Row background={ color } justify={ 'space-between' } padding={ '10px 25px 10px 25px' }>
        <Row align={ 'center' }>
          <Text label={ 'Project' } padding={ 10 } color={ 'white' } size={ 20 }/>
        </Row>
        <Row align={ 'center' }>
          <FontAwesomeIcon icon={ 'list' } color={ 'white' } size="xl" />
        </Row>
      </Row>
      <Row background={ color } justify={ 'space-between' } padding={ '0px' } gap height={40}>
        <Icon name={ 'diagram-project' } color={ 'white' } />
        <Icon name={ 'database' } color={ 'white' } />
        <Icon name={ 'terminal' } color={ 'white' }/>
        <Icon name={ 'chart-simple' } color={ 'white' } />
        <Icon name={ 'user' } color={ 'white' } />
      </Row>
    </Col>
	)
}