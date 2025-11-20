import type { Movie } from './interfaces/types.js'

export function displayMovies(movies: Movie[]) {
	const containerId = 'results'

	// Find or create the results container
	let container = document.getElementById(containerId)
	if (!container) {
		const mountPoint = document.getElementById('app') ?? document.body
		container = document.createElement('div')
		container.id = containerId
		mountPoint.appendChild(container)
	}

	// Clear previous results
	container.innerHTML = ''

	// If no movies, show a friendly message
	if (!movies || movies.length === 0) {
		const msg = document.createElement('p')
		msg.textContent = 'No movies found.'
		container.appendChild(msg)
		return
	}

	// Iterate and render each movie
	movies.forEach((m) => {
		const card = document.createElement('div')
		card.className = 'movie-card'

		const img = document.createElement('img')
		img.src = m.poster_path || ''
		img.alt = m.title || 'poster'
		img.width = 120
		card.appendChild(img)

		const info = document.createElement('div')
		info.className = 'movie-info'

		const title = document.createElement('h3')
		title.textContent = `${m.title} ${m.year ? `(${m.year})` : ''}`
		info.appendChild(title)

		if (m.overview) {
			const overview = document.createElement('p')
			overview.textContent = m.overview
			info.appendChild(overview)
		}

		card.appendChild(info)
		container.appendChild(card)
	})
}