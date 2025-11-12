export interface Movie{
    title       : string,
    year        : number,
    overview    : string,
    poster_path : string,
    vote_average : number,
    director    : string,   
}


export interface ApiResponse{
 results: Movie[],
}