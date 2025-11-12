import type { Movie } from './interfaces/types.js'

export async function fetchMovies(query: string): Promise<Movie[]> {
    try {
        // Build URL: use the OMDB search parameter `s` for searching by title.
        // NOTE: replace the API key with your own if this example key stops working.
        const apiKey = 'd8092da5'
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
            query
        )}`
 
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Network error: ${res.status} ${res.statusText}`)

        const data = await res.json()

        // OMDB returns { Response: "True", Search: [ ... ] } on success,
        // or { Response: "False", Error: "Movie not found!" } on failure.
        if (data.Response === 'False') return []

        const items = data.Search ?? data.results ?? []

        // Map API result shape to our Movie interface. Use safe fallbacks and coercions.
        return (items as any[]).map((it) => ({
            title: it.Title ?? it.title ?? '',
            year: Number(it.Year ?? it.year ?? 0) || 0,
            overview: it.Plot ?? it.overview ?? '',
            poster_path: it.Poster ?? it.poster_path ?? '',
            vote_average: Number(it.imdbRating ?? it.vote_average ?? 0) || 0,
            director: it.Director ?? it.director ?? '',
        }))
    } catch (err) {
        // Centralized error handling for network/parse errors.
        // Return an empty array so callers can handle 'no results' uniformly.
        // You may want to rethrow or return a Result type instead depending on UI needs.
        console.error('fetchMovies error:', err)
        return []
    }
}