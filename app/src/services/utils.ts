export function download( id: string ) {
  const file = new Blob( [ `<!DOCTYPE html><html><head><script type="text/javascript">const id = '${ id }'</script></head><body><div id="root"></div><script src="https://riser.ddns.net:3000/runtime.js"></script></body></html>` ], { type: 'text/plain' } )
  const element = document.createElement( 'a' )
  element.href = URL.createObjectURL( file )
  element.download = 'index.html'
  document.body.appendChild( element )
  element.click( )
}

export function copy( param: string ) {
  navigator.clipboard.writeText( param )
}

