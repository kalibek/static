import React, { Component } from 'react';
interface Article {
  title: string;
  date: string;
  author: string;
  content: string;
  tags: string[];
}

export class Content extends Component {
  render() {
    return <div className="Content">Home</div>;
  }
}
