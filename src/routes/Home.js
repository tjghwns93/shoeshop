import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


function Home(props){
   const navigate =  useNavigate();
   

    return (
        <>
        <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 2500, 
        disableOnInteraction: false, 
      }}
      >
      <SwiperSlide>
      <div className='ad-wrap iu'>
        <img src="https://github.com/tjghwns93/images/blob/main/iu1.jpeg?raw=true"/>
        <div className='ad-content'>
            <h2>아이유의 선택</h2>
            <span>IU's Pick for Spring</span>
         </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className='ad-wrap yeona'>
      <img src="https://github.com/tjghwns93/images/blob/main/yeona.jpeg?raw=true"/>
        <div className='ad-content'>
            <h2>소프트 우먼스 골지</h2>
            <span>Feel The Soft Fit</span>
         </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className='ad-wrap nike'>
      <img src="https://github.com/tjghwns93/images/blob/main/shoes.jpeg?raw=true"/>
        <div className='ad-content'>
            <h2>최상의 쿠셔닝화</h2>
            <span>Fresh Foam X 1080v13</span>
         </div>
        </div>
      </SwiperSlide>
      </Swiper>

      <div id='best' className='shoes-wrap'>
       <h3>BEST</h3>
       <div className='container'>
        {
         props.shoes.map((a, i)=>{
          return (
         <div className='shoes-item' onClick={()=>{navigate(`/detail/${a.id}`)}}>
           <img src={`https://codingapple1.github.io/shop/shoes${i + 1}.jpg`}/>
           <p>{a.title}</p>
           <strong>{a.price}</strong>
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

      <div className="card-wrap">
        <h2>NB Now</h2>
        <div className="container">
          <div className="card">
            <img src="https://github.com/tjghwns93/images/blob/main/yeona2.jpeg?raw=true"/>
            <h3>RUN YOUR WAY</h3>
            <p>무슨 생각을 해? 그냥 달려, 너답게!</p>
            <button>더 알아보기</button>
          </div>
          <div className="card">
            <img src="https://github.com/tjghwns93/images/blob/main/newbalance.jpeg?raw=true"/>
            <h3>1906 Silver Metallic</h3>
            <p>메탈릭 베이스와 컬러 포인트가 조화된 1906R</p>
            <button>더 알아보기</button>
          </div>
          <div className="card">
            <img src="https://github.com/tjghwns93/images/blob/main/iu2.jpeg?raw=true"/>
            <h3>ML610T Series</h3>
            <p>패션웨어부터 가벼운 아웃도어 활동까지</p>
            <button>더 알아보기</button>
          </div>
        </div>
      </div>

      <div className='ad-wrap adidas'>
        <img src="https://raw.githubusercontent.com/tjghwns93/images/main/adidas.avif"/>
          <div className='ad-content'>
              <h2>YOU GOT THIS</h2>
              <span>이건 그저 힘찬 응원가일 뿐이야. 널 믿어</span>
              <a href="#best">더 알아보기</a>
        </div>
       </div>
       </>
    )
}

export default Home;