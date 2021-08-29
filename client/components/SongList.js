import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import query from '../queries/fetchSongs';
import gql from 'graphql-tag';

class SongList extends Component {
  onSongDelete(id) {
    this.props.mutate({
      variables: { id }
      //,refetchQueries: [{ query: query }]
    })
    .then(()=> this.props.data.refetch())
  }//when to use refetch instead of refetchQueries:
  //in this case the query to fetch songs is associated with the song list already
  //look at the bottom where the query is performed (line 62)
  //song list is already associated with the song fetch query so we can just re use

  renderSongs() {
    return (
      this.props.data.songs &&
      this.props.data.songs.map(({ id, title }) => {
        return (
          <li className='collection-item' key={id}>
            <Link to={`songs/${id}`}>{title}</Link>
            <i
              className='material-icons'
              onClick={() => this.onSongDelete(id)}
            >
              delete
            </i>
          </li>
        );
      })
    );
  }

  render() {
    if (this.props.data.loading) {
      return <div>...Loading</div>;
    }

    return (
      <div>
        <ul className='collection'>{this.renderSongs()}</ul>
        <Link to='/songs/new' className='btn-floating btn-large red right'>
          <i className='material-icons'>add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(query)(SongList));
