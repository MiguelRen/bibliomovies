import type {Movie} from './interfaces/types'
export function fetchMovies (query:string): Promise<Movie[]>{
    const url  = `http://www.omdbapi.com/?i=tt3896198&apikey=d8092da5=${encodeURIComponent(query)}`
     const query2 = fetch(url)
    
    }