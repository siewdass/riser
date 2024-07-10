import React, { useEffect, useState } from 'react'
import { DB } from './services/indexeddb'

const db = new DB( )

export function Home( ) {
  const [ input, setInput ] = useState( '' )
  const [ input2, setInput2 ] = useState( '' )
  const [ data, setData ] = useState( [] )

  useEffect( () => {
    db.read( {
      table: 'user',
      index: { owner: 'siewdass' },
      state: setData,
      page: [ 0, 10 ],
      sort: 'value'
    } )
  }, [] )

  const Create = () => {
    if ( input != '' ) db.create( {
      table: 'user',
      index: { owner: 'siewdass' },
      value: { value: input }
    } )
  }

  const Update = () => {
    if ( input != '' && input2 != '' ) db.update( {
      table: 'user',
      index: { owner: 'siewdass' },
      value: { value: input },
      newd: { value: input2 }
    } )
  }

  const Delete = () => {
    if ( input != '' ) db.delete( {
      table: 'user',
      index: { owner: 'siewdass' },
      value: { value: input }
    } )
  }

  return (
    <div>
      <input placeholder='add or delete' value={ input } onChange={ ( e: any ) => setInput( e.target.value ) } />
      <input placeholder='update' value={ input2 } onChange={ ( e: any ) => setInput2( e.target.value ) } />
      <button onClick={ Create }>add</button>
      <button onClick={ Update }>update</button>
      <button onClick={ Delete }>delete</button>
      <ul>
        { data.map( (item: any, index: number ) => <li key={ index }>{ item.value }</li> ) }
      </ul>
    </div>
  )
}