export interface Movie{
    title       : string,
    year        : number,
    director    : string,   
}


export interface ApiResponse{
 results: Movie[],
}