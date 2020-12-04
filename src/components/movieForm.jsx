import React from 'react';

const MovieForms = ({match, history}) => {
    return ( 
        <div>

        <h1>movieforms {match.params.id}</h1>
        <button className="btn btn-primary"onClick={() => history.push('/movies')} >Save</button>
        </div>
     );
}
 
export default MovieForms;