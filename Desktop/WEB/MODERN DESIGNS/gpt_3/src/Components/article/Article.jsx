import React from 'react'
import './Article'
import './Article.css'
const Article = ({imgUrl,date,text}) => {
  return (
    <div className='gpt3__blog-container_article'>
      <div className='gpt3__blog-container_article-image'>
        <img src={imgUrl} alt="blog" />
      </div>
      <div className="gpt3__blog-container_article-content">
      <div>
        <p>{date}</p>
        <h3>{text}</h3>
      </div>
      <div className='gpt3__blog-container_article-content-paragraph'><p>Read Full Article</p></div>
      
    </div>
  </div>
  )
}

export default Article
