import React, { useEffect, useState } from 'react'
import { Network } from './services/network'

const network = new Network( )

export function Home( ) {
  const [ input, setInput ] = useState( '' )
  const [ input2, setInput2 ] = useState( '' )
  const [ data, setData ] = useState( [] )

  useEffect( () => {
    network.read( {
      table: 'test',
      index: { owner: 'siewdass' },
      state: setData,
      page: [ 0, 10 ],
      sort: 'value'
    } )
  }, [] )

  const Create = () => {
    if ( input != '' ) network.create( {
      table: 'test',
      index: { owner: 'siewdass' },
      value: { owner: 'siewdass', value: input }
    } )
  }

  const Update = () => {
    if ( input != '' && input2 != '' ) network.update( {
      table: 'test',
      index: { owner: 'siewdass' },
      value: { owner: 'siewdass', value: input },
      renew: { value: input2 }
    } )
  }

  const Delete = () => {
    if ( input != '' ) network.delete( {
      table: 'test',
      index: { owner: 'siewdass' },
      value: { owner: 'siewdass', value: input }
    } )
  }

  const SignIn = ( ) => {
    network.signin( {
      email: 'siewdass@gmail.com',
      password: '123456',
      callback: () => console.log('signed')
    } )
  }

  return (
    <div>
      <input placeholder='add or delete' value={ input } onChange={ ( e: any ) => setInput( e.target.value ) } />
      <input placeholder='update' value={ input2 } onChange={ ( e: any ) => setInput2( e.target.value ) } />
      <button onClick={ Create }>add</button>
      <button onClick={ Update }>update</button>
      <button onClick={ Delete }>delete</button>
      <button onClick={ SignIn }>sign</button>
      <ul>
        { data.map( (item: any, index: number ) => <li key={ index }>{ item.value }</li> ) }
      </ul>
    </div>
  )
}