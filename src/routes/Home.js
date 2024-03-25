import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Home(props){
   const navigate =  useNavigate();
   

    return (
        <>
        <div className='ad-wrap nike'>
        <div className='ad-content'>
            <h2>Classic 2002</h2>
            <span>클래식한 디자인과 편안한 착화감의 2002를 만나보세요.</span>
            <a href="#best">구매하기</a>
         </div>
        </div>
       <div className='ad-wrap adidas'>
          <div className='ad-content'>
              <h2>YOU GOT THIS</h2>
              <span>이건 그저 힘찬 응원가일 뿐이야. 널 믿어</span>
              <a href="#best">더 알아보기</a>
        </div>
       </div>

      <div id='best' className='shoes-wrap'>
       <h3>BEST</h3>
       <div className='container'>
        {
         props.shoes.map((a, i)=>{
          return (
         <div className='shoes-item' onClick={()=>{navigate(`/detail/${a.id}`)}}>
           <img src={`https://codingapple1.github.io/shop/shoes${i + 1}.jpg`}/>
           <h4>{a.title}</h4>
           <p>{a.price}</p>
         </div>
          )
         })
         }
        </div>
      <button onClick={()=>{
        axios.get(`https://codingapple1.github.io/shop/data2.json`)
        .then((result)=>{
          if(props.shoes.length = 3){
            const copyShoes = [...props.shoes, ...result.data];
            sessionStorage.setItem('data', JSON.stringify(copyShoes));
            props.setShoes(copyShoes);
          }
        }).catch(()=>{
          alert('불러오지 못했습니다.');
        })
      }}>{
        props.shoes.length < 4
        ? 'view more (1/2)'
        : 'view more (2/2)'
      }</button>
      </div>
       </>
    )
}

export default Home;