import React, { CSSProperties, ReactElement, useState } from 'react'

export function Loader( props ) {

	const style: CSSProperties = { 
		display: 'flex',
	}

	return (
		<div className="loader-container">
		  <div className="loader">
      </div>
    </div>
	)
}

/*
.loader-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.loader {
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #3498db;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}


@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
*/