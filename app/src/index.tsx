import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { library } from '@fortawesome/fontawesome-svg-core'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import * as Brands from '@fortawesome/free-brands-svg-icons'
import { Project } from './project'
import { Database } from './database'
import { User } from './user'
import { Table } from './table'
import { Viewer } from './viewer'
import { Home } from './home'

library.add( ...Object.keys(Icons).filter(key => key !== 'fas' && key !== 'prefix').map(icon => Icons[icon]))
library.add( ...Object.keys(Brands).filter(key => key !== 'fab' && key !== 'prefix').map(icon => Brands[icon]))

const router = createBrowserRouter( [
  { path: "*", element: <Home /> },
	{ path: "/user", element: <User /> },
	{ path: "/project", element: <Project /> },
  { path: "/database", element: <Database /> },
  { path: "/table", element: <Table /> },
  { path: "/viewer", element: <Viewer /> }
] )

const root = document.getElementById( 'root' )

if ( root ) ReactDOM.createRoot( root ).render(
  <>
  	<RouterProvider router={ router } />
  </>
)
