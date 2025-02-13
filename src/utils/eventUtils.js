// eventUtils.js
export const dispatchCartUpdateEvent = () => {
	const event = new CustomEvent("cartUpdate")
	window.dispatchEvent(event)
}
