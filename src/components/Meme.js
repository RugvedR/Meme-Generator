import React, { useEffect, useState } from 'react'
import './Memes.css'
import { useNavigate } from 'react-router-dom';

const Meme = () => {

    const [memes, setNemes] = useState([]);
    const [memeIndex, setMemeIndex] = useState(0);
    const [captions, setCaptions] = useState([]);
    let navigate = useNavigate();
    const updateCaption= (e, index)=>{
        const text = e.target.value || '';
        setCaptions(
            captions.map((c, i)=>{
                if(index===i){
                    return text;
                }else{
                    return c;
                }
            })
        );
    }

    const generateMeme = ()=>{
        const currentMeme = memes[memeIndex];
        const formData = new FormData();
        

        formData.append('username', 'lofaxe805');
        formData.append('password', 'rugved123');
        formData.append('template_id', currentMeme.id );

        captions.forEach((c, index)=> formData.append(`boxes[${index}][text]`, c))

        fetch('https://api.imgflip.com/caption_image', {
            method: 'POST',
            body: formData
        }).then(res=>{
            res.json().then(res=>{
                navigate(`/generated?url=${res.data.url}`)
            })
        })
    };

    const shuffleMemes = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * i);
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      };
    
    useEffect(()=>{
        fetch('https://api.imgflip.com/get_memes').then(res=> res.json().then(res=>{
            const _memes = res.data.memes;
            shuffleMemes(_memes);
            setNemes(_memes);
        })
        );
    },[]);

    useEffect(()=>{
        if(memes.length){
            setCaptions(Array(memes[memeIndex].box_count).fill(''));
        }
    }, [memeIndex, memes]);


  return (
    memes.length ? 
    <div className='container' >
        <button onClick={generateMeme } className='generate' >Generate</button>
        <button onClick={()=>{setMemeIndex(memeIndex+1)} } className='skip' >Skip</button>

        {
            captions.map((c, index)=>(
                <input onChange={(e)=>{ updateCaption(e, index)}} key={index} type="text" />
            ))
        }
        <div className="memeContainer">
            <img src={memes[memeIndex].url} alt="meme" />
        </div>
    </div> : <></>
  )
}

export default Meme
