import React, { Component } from 'react';
import hljs from 'highlight.js'

interface CodeBlockProps {
  value: string,
  language?: string
}

export class CodeBlock extends Component<CodeBlockProps> {
  private codeEl: any;

  constructor(props: CodeBlockProps) {
    super(props);
    this.setRef = this.setRef.bind(this)
  }

  setRef(el: any) {
    this.codeEl = el
  }

  componentDidMount() {
    this.highlightCode()
  }

  componentDidUpdate() {
    this.highlightCode()
  }

  highlightCode() {
    hljs.highlightBlock(this.codeEl)
  }

  render() {
    return (
      <pre>
        <code ref={this.setRef} className={`language-${this.props.language}`}>
          {this.props.value}
        </code>
      </pre>
    )
  }
}