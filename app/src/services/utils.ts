export function download( url: string ) {
  const anchor = document.createElement( 'a' )
  anchor.href = url
  anchor.download = url
  document.body.appendChild( anchor )
  anchor.click( )
}