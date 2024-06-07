import ReactDOM from 'react-dom/client'

export default function App() {
	return (
		<h1>Hello from React!</h1>
	)
}

const root = document.getElementById( 'root' )

if ( root ) ReactDOM.createRoot( root ).render( <App /> )
