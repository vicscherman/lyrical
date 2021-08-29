import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import likeLyric from '../queries/likeLyric';
import deleteLyric from '../queries/deleteLyric';
import query from '../queries/fetchSong';

class LyricList extends Component {
  onLike(id, likes) {
    this.props.likeLyric({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id: id,
          __typename: 'LyricType',
          likes: likes + 1,
        },
      },
    });
  }

  onLyricDelete(id) {
    this.props.deleteLyric({
      variables: {id:id},
      refetchQueries: [{ query, variables: { id: this.props.songId } }],
    });
  }

  renderLyrics() {
    console.log(this.props)
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className='collection-item'>
          {content}
          <div className='vote-box'>
            <i
              className='material-icons'
              onClick={() => this.onLike(id, likes)}
            >
              thumb_up
            </i>

            <span className='badge'>{likes}</span>
            <i className='material-icons' onClick={() => this.onLyricDelete(id)}>
            delete
          </i>
          </div>
        
        </li>
      );
    });
  }

  render() {
    return <ul className='collection'>{this.renderLyrics()}</ul>;
  }
}

//for using multiple mutations or queries

const LyricListWithMutations = compose(
  graphql(likeLyric, {
    name: 'likeLyric',
  }),
  graphql(deleteLyric, {
    name: 'deleteLyric',
  })
)(LyricList);

export default LyricListWithMutations;
