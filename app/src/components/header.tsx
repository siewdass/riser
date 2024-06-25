import React, { } from 'react'
import { Row, Text } from '../ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function Header( props ) {
	return (
    <Row align={ 'center' } justify={ 'space-between' } padding={ '0px 10px 0px 5px' }>
      <Row gap={ 15 } align={ 'center' }>
      { props?.left?.length > 0 && props.left.map( ( item, index ) =>
          <FontAwesomeIcon
            key={ index }
            icon={ item.icon }
            color={ item.color }
            size={ item.size }
            onClick={ item.onClick }/>
        ) }
        <Text label={ props?.label } size={ 20 } style={ { marginBottom: 2 } } />
      </Row>
      <Row gap={ 20 } align={ 'center' }>
        { props?.right?.length > 0 && props.right.map( ( item, index ) =>
          <FontAwesomeIcon
            key={ index }
            icon={ item.icon }
            color={ item.color }
            size={ item.size }
            onClick={ item.onClick }/>
        ) }
      </Row>
    </Row>
	)
}