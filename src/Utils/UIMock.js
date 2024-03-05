export function createButton(id = 'my-button-' + Math.random(), innerText = 'Click me') {
  let button = document.createElement('button')
  button.id = id
  button.classList.add('xr-button')
  button.innerText = innerText
  return button
}
