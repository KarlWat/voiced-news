import React, { useState, useEffect } from 'react';

import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';

import  NewsCards  from './components/NewsCards/NewsCards';
import useStyles from './styles.js'

const alanKey = '13541b588df7d179d282fa395d2fb0d52e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  
  const classes = useStyles ();


    useEffect(() => {
        alanBtn({
          key: alanKey,
          onCommand: ({ command, articles, number }) => {
            if (command === 'newHeadlines') {;
              setNewsArticles(articles);
              setActiveArticle(-1);
            
            } else if (command === 'highlight') {
              setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
            } else if (command === 'open') {
              const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
              const article = articles[parsedNumber - 1];
    
              if (parsedNumber > 20) {
                alanBtn().playText('Please try that again...')
              } else if (article) {
                window.open(article.url, '_blank');
                alanBtn().playText('Opening...');
                   
        }
        }
      }
    });
  }, [])

    return (
        <div>
            <div className={classes.logoContainer}>
            <img src='https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png' className={classes.alanLogo} alt="Logo" />

            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    );
}

export default App;