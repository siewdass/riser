import React, { useEffect } from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom"
import { Project } from './project'
import { Database } from './database'
import { User } from './user'
import { library } from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';

library.add(
  ...Object.keys(Icons)
  .filter((key) => key !== 'fas' && key !== 'prefix')
  .map((icon) => Icons[icon])
)

function Home( ) {
  const navigate = useNavigate( )
  useEffect( () => navigate( '/user' ) )
  return <></>
}

const router = createBrowserRouter( [
  { path: "/", element: <Home /> },
	{ path: "/user", element: <User /> },
	{ path: "/project", element: <Project /> },
  { path: "/database", element: <Database /> },
] )

const root = document.getElementById( 'root' )

if ( root ) ReactDOM.createRoot( root ).render(
	<RouterProvider router={ router } />
)
