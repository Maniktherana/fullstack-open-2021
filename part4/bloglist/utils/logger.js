/* eslint-disable no-mixed-spaces-and-tabs */
const info = (...params) => {
	// eslint-disable-next-line no-undef
	if (process.env.NODE_ENV !== 'test') {
		console.log(...params)
	  }
	
}
  
const error = (...params) => {
	// eslint-disable-next-line no-undef
	if (process.env.NODE_ENV !== 'test') {
		console.log(...params)
	  }
}
  
module.exports = {
	info, error
}