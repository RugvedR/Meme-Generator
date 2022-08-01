import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import './MemeGenerated.css'
import { useClipboard } from 'use-clipboard-copy';


const MemeGenerated = () => {

    const [copied, setCopied] = useState(false);

    let navigate = useNavigate();
    let location = useLocation();
    let clipboard = useClipboard();

    const url = new URLSearchParams(location.search).get('url');

    const copyLink =()=>{
        clipboard.copy(url);
        setCopied(true);
    }

  return (
    <div className='container' >
        <button onClick={()=>{navigate('/')}} className="btn" >Make more Memes</button>
      {
        url && <img src={url} alt="meme" />
      }
      <button className="btn" onClick={copyLink} >
        {copied? 'Link copied!': 'Copy Link'}
      </button>
    </div>

  )
}

export default MemeGenerated
