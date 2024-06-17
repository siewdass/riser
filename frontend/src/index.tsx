import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Project } from './project'
import { User } from './user'
import { library } from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';

const iconList = Object.keys(Icons)
  .filter((key) => key !== 'fas' && key !== 'prefix')
  .map((icon) => Icons[icon]);

library.add(...iconList);

const router = createBrowserRouter( [
  { path: "/", element: <div>Login</div> },
	{ path: "/user", element: <User /> },
	{ path: "/project", element: <Project /> },
] )

const root = document.getElementById( 'root' )

if ( root ) ReactDOM.createRoot( root ).render(
	<RouterProvider router={ router } />
)
