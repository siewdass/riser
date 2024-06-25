import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom"

window.React = React

const script = document.createElement( 'script' )
script.type = 'text/javascript'
script.src = `http://riser.ddns.net:3000/cdn.js?project=${ id }`
document.head.appendChild( script )

await new Promise((resolve, reject) => script.onload = () => resolve() )

const useFetch = async ( method, path, data, headers = { 'Content-Type': 'application/json' } ) => {
  const response = await fetch( method == 'GET' ? `http://riser.ddns.net:3000/api/${ id }${ path }?${ new URLSearchParams( data ) }` : `http://riser.ddns.net:3000/api/${ id }${ path }`, {
    method,
    headers,
    body: method !== 'GET' ? JSON.stringify( data ) : null
  } )
  return await response.json( )
}

const router = createBrowserRouter( Object.keys( exports.config ).map( path => {
  const Component = exports[ exports.config[ path ] ]
  return { path: path == '/' ? '*' : path , element: <Component { ...{ useEffect, useState, useNavigate, useFetch } } /> }
} )  )

const root = createRoot( document.getElementById( 'root' ) )

root.render(
  <RouterProvider router={ router } />
)
