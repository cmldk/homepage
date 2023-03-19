import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { slugify } from '../../lib/helper';

function a({ children, node, ...props }) {
  return (
    <a
      className="text-blue-600 dark:text-blue-400 hover:underline font-['regular']"
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      {children}
    </a>
  );
}

function strong({ children, node, ...props }) {
  return (
    <strong className="font-semibold font-['regular']" {...props}>
      {children}
    </strong>
  );
}

function hr({ node, ...props }) {
  return (
    <hr
      className="my-14 border-0 border-b border-black opacity-10 dark:border-white"
      {...props}
    />
  );
}

function ul({ node, ...props }) {
  return (
    <ul
      className="list-inside list-disc space-y-3 font-['regular']"
      {...props}
    />
  );
}

function ol({ node, ...props }) {
  return (
    <ol
      className="list-inside list-decimal space-y-3 font-['regular']"
      {...props}
    />
  );
}

function blockquote({ node, ...props }) {
  return (
    <blockquote
      className="bg-mandalina text-sm text-dark my-6 mx-auto border-[1px] border-portakal border-l-[1px] border-l-portakal border-l-[5px] rounded-lg py-2 px-4 font-['regular']"
      {...props}
    />
  );
}

function p({ node, ...props }) {
  return <p className="my-2 font-['regular'] leading-8" {...props} />;
}

function h1({ children, node, ...props }) {
  return (
    <h1
      className="text-4xl my-8 text-dark dark:text-light font-['semibold']"
      {...props}
    >
      {children}
    </h1>
  );
}

function h2({ children, node, ...props }) {
  const value = children[0];
  return (
    <h2
      id={slugify(value)}
      className="article-heading text-2xl mt-8 my-2 text-dark dark:text-light font-['semibold']"
      {...props}
    >
      <a className="anchor-heading" href={`#${slugify(value)}`}>
        #
      </a>
      {children}
    </h2>
  );
}

function h3({ children, node, ...props }) {
  const value = children[0];

  return (
    <h3
      id={slugify(value)}
      className="article-heading text-xl mt-4 my-1 text-dark dark:text-light font-['semibold']"
      {...props}
    >
      <a className="anchor-heading" href={`#${slugify(value)}`}>
        #
      </a>
      {children}
    </h3>
  );
}

function h4({ children, node, ...props }) {
  const value = children[0];

  return (
    <h4
      id={slugify(value)}
      className="article-heading text-lg mt-4 my-2 text-dark dark:text-light font-['semibold']"
      {...props}
    >
      <a className="anchor-heading" href={`#${slugify(value)}`}>
        #
      </a>
      {children}
    </h4>
  );
}

function h5({ children, node, ...props }) {
  const value = children[0];

  return (
    <h5
      id={slugify(value)}
      className="article-heading text-md mt-3 my-2 text-dark dark:text-light font-['regular']"
      {...props}
    >
      <a className="anchor-heading" href={`#${slugify(value)}`}>
        #
      </a>
      {children}
    </h5>
  );
}

function img({ src, alt, node, ...props }) {
  return (
    <figure className="my-6 text-center">
      <a className="inline-block" href={src} target="_blank" rel="noreferrer">
        <img src={src} alt={alt} className="mx-auto max-h-[400px]" {...props} />
      </a>
      <figcaption className="text-sm text-gray-600 dark:text-gray-400">
        {alt}
      </figcaption>
    </figure>
  );
}

function code({ node, inline, className, children, ...props }) {
  const match = /language-(\w+)/.exec(className || '');
  const language = match?.[1];
  const linenumber = node?.data?.meta === 'linenumber';

  return !inline && match ? (
    <div className="my-6 font-mono">
      {linenumber && language && <div>.{language}</div>}
      <SyntaxHighlighter
        language={language}
        style={tomorrow}
        customStyle={{
          fontSize: '14px',
          borderRadius: '10px',
        }}
        showLineNumbers={linenumber}
        wrapLongLines
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code
      className={
        className +
        ' font-mono bg-gray-200 dark:bg-gray-600 py-1 px-2 text-dark dark:text-light rounded-md border-[1px] border-gray-300 dark:border-gray-700'
      }
      style={tomorrow}
      {...props}
    >
      {children}
    </code>
  );
}

const MDComponents = {
  strong,
  a,
  hr,
  ul,
  ol,
  blockquote,
  h1,
  h2,
  h3,
  h4,
  h5,
  code,
  p,
  img,
};

export default MDComponents;
