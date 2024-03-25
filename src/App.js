import './App.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faSearch, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import data from './data';
import Home from './routes/Home';
import Detail from './routes/Detail';
import Cart from './routes/Cart';
import { useSelector } from 'react-redux';

function App() {
  const [shoes, setShoes] = useState(data);
  const [view, setView] = useState('');
  const [cartdot, setCartdot] = useState('');
  const [nav, setNav] = useState('');
  const [bar1, setBar1] = useState('');
  const [bar2, setBar2] = useState('');
  const [menuBtn, setMenuBtn] = useState(false);
  const [menu, setMenu] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 901);
  const navigate = useNavigate();
  const a = useSelector((state)=>{ return state });
  let watched =  a.watched;
  watched = new Set(watched);
  watched = Array.from(watched);
  watched = watched.reverse();

  useEffect(() => {
    const sessionData = sessionStorage.getItem('data');
    if (sessionData) {
      setShoes(JSON.parse(sessionData));
    }
  }, []);

  useEffect(()=>{
    let totalCount = a.cart.reduce((acc, a) => {
      return acc + a.count;
    }, 0);

    setView(totalCount);
  },[a.cart]);

  useEffect(()=>{
    if(a.cart.length == 0){
      setCartdot('');
    }else{
      setCartdot('nav-cart');
    }
  },[a.cart]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 901);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(()=>{
    if(menuBtn){
      setBar1('bar1-on')
      setBar2('bar2-on')
      setMenu('menu-on')
    }else{
      setBar1('')
      setBar2('')
      setMenu('')
    }
  },[menuBtn])
 

  return (
    <div className="App">
      <nav>
        <div className='container'>
          <ul>
            {
              isMobile ? (
                <>
                <li><Link to={'/'} className='nav-item'><FontAwesomeIcon icon={faHouse} /></Link></li>
                <li onClick={()=>{
                   setNav('nav-search-on')
                 }}><a className='nav-item'><FontAwesomeIcon icon={faSearch} /></a></li>
                <li><Link to={'/cart'} className={`nav-item ${cartdot}`}><FontAwesomeIcon icon={faShoppingBag} /></Link></li>
                <li className='nav-item bar' onClick={()=>{
                  setMenuBtn(!menuBtn);
                }}>
                  <div className={`bar1 ${bar1}`}></div>
                  <div className={`bar2 ${bar2}`}></div>
                </li>
            </>
              ) : (
                <>
                <li><Link to={'/'} className='nav-item'><FontAwesomeIcon icon={faHouse} /></Link></li>
                <li><a href='#best' className='nav-item'>Men</a></li>
                <li><a href='#best' className='nav-item'>Women</a></li>
                <li><a href='#best' className='nav-item'>Kids</a></li>
                <li><a href='#best' className='nav-item'>Best</a></li>
                <li><a href='#best' className='nav-item'>New</a></li>
                <li><a href='#best' className='nav-item'>Event</a></li>
                <li onClick={()=>{
                   setNav('nav-search-on')
                 }}><a className='nav-item'><FontAwesomeIcon icon={faSearch} /></a></li>
                <li><Link to={'/cart'} className={`nav-item ${cartdot}`}><FontAwesomeIcon icon={faShoppingBag} /></Link></li>
                </>
              )
            }
            
          </ul>
        </div>
        <div className={`nav-search ${nav}`} onMouseLeave={()=>{setNav('')}}>
          <div className='container'>
          <FontAwesomeIcon icon={faSearch} /><input placeholder='shoeshop.com 검색하기'></input>
          </div>
        </div>
        <div className={`nav-menu ${menu}`}>
          <ul>
            <li>스토어</li>
            <li>MEN</li>
            <li>WOMEN</li>
            <li>KIDS</li>
            <li>BEST</li>
            <li>NEW</li>
          </ul>
        </div>
      </nav>
      <div className='watched-wrap'>
          <div className='watched-cart' onClick={()=>{navigate('/cart')}}>
            CART <span>{view}</span>
          </div>
          <div className='watched-list'>
            <p>최근 본 상품</p>
          {
            watched.map((a)=>{
              return (
                <div className='watched-item'>
                  <img src={`https://codingapple1.github.io/shop/shoes${a + 1}.jpg`} onClick={()=>{navigate(`/detail/${a}`)}}/>
                </div>
              )
            })
          }
          </div>
        </div>

      <Routes>
        <Route path='/' element={<Home shoes={shoes} setShoes={setShoes}/>}/>
        <Route path='/detail/:id' element={<Detail shoes={shoes} setShoes={setShoes}/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>

      <footer className='footer'>
      <div className='container'>
        <div className='footer_header'>
          <div className='footer_link'>
          <ul>
            <li className='footer_strong'><a to='#'>멤버가입</a></li>
            <li className='footer_strong'><a to='#'>매장찾기</a></li>
            <li className='footer_strong'><a to='#'>나이키 저널</a></li>
          </ul>
          <ul>
            <li className='footer_strong'><a to='#'>고객센터</a></li>
            <li><a to='#'>주문배송조회</a></li>
            <li><a to='#'>반품 정책</a></li>
            <li><a to='#'>결제방법</a></li>
            <li><a to='#'>공지사항</a></li>
            <li><a to='#'>문의하기</a></li>
          </ul>
          <ul>
            <li className='footer_strong'><a to='#'>회사소개</a></li>
            <li><a to='#'>About Nike</a></li>
            <li><a to='#'>소식</a></li>
            <li><a to='#'>채용</a></li>
            <li><a to='#'>투자자</a></li>
            <li><a to='#'>지속가능성</a></li>
          </ul>
          </div>

          <div className='footer_sns'>
          <ul>
            <li><a to='#'><img src='https://github.com/tjghwns93/images/blob/main/twitter.png?raw=true'></img></a></li>
            <li><a to='#'><img src='https://github.com/tjghwns93/images/blob/main/facebook.png?raw=true'></img></a></li>
            <li><a to='#'><img src='https://github.com/tjghwns93/images/blob/main/youtube.png?raw=true'></img></a></li>
            <li><a to='#'><img src='https://github.com/tjghwns93/images/blob/main/insta.png?raw=true'></img></a></li>
          </ul>
          </div>

        </div>

        <div className='footer_middle'>
          <div>
            <ul>
              <li className='footer_strong'><a to='#'>대한민국</a></li>
              <li><a to='#'>© 2023 Nike, Inc. All Rights Reserved</a></li>
            </ul>
          </div>
          <div>
            <ul>
              <li><a to='#'>이용약관</a></li>
              <li><a to='#'>개인정보처리방침</a></li>
              <li><a to='#'>위치 기반 서비스 약관</a></li>
              <li><a to='#'>영상정보처리기기 운영 지침</a></li>
            </ul>
          </div>
        </div>

        <div className='footer_bottom'>
          <span>(유)나이키코리아 대표 Kimberlee Lynn Chang Mendes, 킴벌리 린 창 멘데스 | 서울 강남구 테헤란로 152 강남파이낸스센터 30층 | <br/>통신판매업신고번호 2011-서울강남-03461 | 등록번호 220-88-09068사업자 정보 확인 <br/><br/>고객센터 전화 문의 080-022-0182 FAX 02-6744-5880 | 이메일 service@nike.co.kr | 호스팅서비스사업자 (유)나이키코리아</span>
          <span>현금 등으로 결제 시 안전 거래를 위해 나이키 쇼핑몰에서 가입하신 한국결제네트웍스 유한회사의 구매안전 서비스(결제대금예치)를 이용하실 수 있습니다.<br/><br/>콘텐츠산업진흥법에 의한 콘텐츠 보호 안내자세히 보기</span>
        </div>
      </div>
    </footer>
      
    </div>///App/////
  );
}

export default App;
