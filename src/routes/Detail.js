import {  faAngleDown, faAngleUp, faStar } from "@fortawesome/free-solid-svg-icons";
import {  faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAddItem, setCountUp, setWatched } from "../store";


function Detail(props){
    let a = useSelector((state)=>{ return state });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionData = sessionStorage.getItem('data');
    const {id} = useParams();
    const findId = (sessionData ? JSON.parse(sessionData) : props.shoes).find((x)=>{
        return x.id == id
    });


    const copyShoes = [...props.shoes];
    const updatedShoes = copyShoes.filter(shoe => shoe.id !== findId.id);


    const [btn1, setBtn1] = useState(false);
    const [btn2, setBtn2] = useState(false);
    const [btn3, setBtn3] = useState(false);
    const [btn4, setBtn4] = useState(false);
    const [navi, setNavi] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);

        return ()=>{
            setNavi(0);
        }
      }, [navi]);


    useEffect(()=>{
       dispatch(setWatched(findId.id));
       sessionStorage.setItem('watched', JSON.stringify(a.watched));
    },[id]);



    return (
        <div className="detail-wrap">
            <div className="container">
                <div className="ditail-img">
                    <img src={`https://codingapple1.github.io/shop/shoes${findId.id + 1}.jpg`}/>
                </div>
                <div className="detail-content">
                    <h4>{findId.title}</h4>
                    <p>{findId.content}</p>
                    <p>{findId.price}</p>
                    <button onClick={()=>{
                        a.cart.some(a=>a.id === findId.id)
                        ? dispatch(setCountUp(findId.id))
                        : dispatch(setAddItem({ id : findId.id, name : findId.title, count : 1, price : findId.price }))
                        const alert = window.confirm('장바구니창으로 이동하시겠습니까?');
                        if(alert){
                            navigate('/cart');
                        }

                    }}>장바구니 추가</button>
                    <ul className="content-info">
                        <li>
                            <h3 onClick={()=>{ setBtn1(!btn1) }}>사이즈 & 팁</h3>
                            {
                                btn1
                            ? <>
                            <div>
                                <p>• 정사이즈보다 크게 나온 제품으로, 반 사이즈 작게 주문하는 것을 추천드립니다.</p><br/>
                                <p>• 사이즈 가이드</p>
                            </div>
                            <div className="content-btn"><FontAwesomeIcon icon={faAngleUp} /></div>
                            </>
                            : <div className="content-btn"><FontAwesomeIcon icon={faAngleDown} /></div>
                            }
                        </li>
                        <li>
                            <h3 onClick={()=>{ setBtn2(!btn2) }}>무료 배송 및 반품</h3>
                            {
                                btn2
                                ?   <>
                                        <div>
                                            <p>일반 배송</p><br/>
                                            <p>• 배송지역: 전국 (일부 지역 제외)</p><br/>
                                            <p>• 배송비: 무료배송</p><br/>
                                            <p>• 제품 수령일로부터 14일 이내 제품에 대해서만 무료 반품 서비스가 가능합니다.</p>
                                        </div>
                                        <div className="content-btn"><FontAwesomeIcon icon={faAngleUp} /></div>
                                    </>
                                :   <div className="content-btn"><FontAwesomeIcon icon={faAngleDown} /></div>    
                            }
                        </li>
                        <li>
                            <h3 onClick={()=>{ setBtn3(!btn3) }}>리뷰 (9202)</h3>
                            {
                                btn3 
                              ? <>
                                <div>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <span>&emsp;&emsp;4.9 점</span><br/><br/><br/>
                                <strong>{findId.title} 좋아요</strong><br/>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <span>&emsp;&emsp;창수575029364 - 2024년 3월 16일</span><br/><br/>
                                <p>배송도 빠르게 받아서 좋았구요~ {findId.title}는 남녀노소 기본적으로 멋쟁이 운동화죠. 사이즈도 잘맞고 좋습니다. 추천</p><br/><br/><br/>
                                <strong>심플하니 괜찮으나 착용감은 다소 편하지만은 않음</strong><br/>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={farStar} />
                                <span>&emsp;&emsp;한655877817 - 2024년 3월 16일</span><br/><br/>
                                <p>심플하니 디쟌 괜찮아요 285 신는데 295로 주문했어요 새신발여서인지 좀 딱딱한 느낌으로 아주 많이 편하지는 않은듯요 옷은 구애받지 않고 잘 어우러질듯 합니다</p><br/><br/><br/>
                                <strong>만족도 최고 발볼이 넓어도 편해요</strong><br/>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <span>&emsp;&emsp;hwiba - 2024년 3월 05일</span>
                                <p>{findId.title}의 근본중의 근본이에요 베이직하고 모든 옷에 잘 어울립니다</p>
                                </div>
                                <div className="content-btn"><FontAwesomeIcon icon={faAngleUp} /></div>
                                </>
                                : <div className="content-btn"><FontAwesomeIcon icon={faAngleDown} /></div>
                            }
                        </li>
                        <li>
                            <h3 onClick={()=>{ setBtn4(!btn4) }}>추가정보</h3>
                            {
                                btn4 
                            ? <>
                                <div>
                                <p>상품정보제공고시</p><br/>
                                <p>• 제조연월: 수입제품으로 각 제품별 입고 시기에 따라 상이하여 정확한 제조연월 제공이 어렵습니다. 제조연월을 확인하시려면 고객센터에 문의하시기 바라며, 정확한 제조연월은 배송받으신 제품의 라벨을 참고하시기 바랍니다.</p>
                                <p>• A/S 책임자와 전화번호: (유)나이키코리아 온라인 스토어 고객센터 / 080-022-0182</p>
                                <p>• 세탁방법 및 취급시 주의사항: 자세한 내용은 '자세히 보기'를 클릭하여 확인 부탁드립니다.</p>
                                <p>• 미성년자 권리 보호 안내: 자세한 내용은 '자세히 보기' 를 클릭하여 확인 부탁드립니다.</p>
                                <p>• 품질보증기준: 품질보증기간-섬유 및 일반 소재(구입 후 6개월), 가죽소재(구입 후 1년). 유통 중 손상되었거나 품질에 이상이 있는 제품에 한하여 소비자 피해 보상 규정에 의거 보상하여 드립니다. 단, 제품에 부착되어 있는 사용방법 및 취급 시 주의사항에 따라 제품을 관리해 주시고, 소비자 부주의로 인한 품질 이상 및 변형에 대해서는 책임을 지지 않습니다.</p>
                                <p>• 제조자/수입품의 경우 수입자를 함께 표기: Nike. Inc / (유)나이키코리아</p>
                            </div>
                            <div className="content-btn"><FontAwesomeIcon icon={faAngleUp} /></div>
                            </>
                            : <div className="content-btn"><FontAwesomeIcon icon={faAngleDown} /></div>
                            }
                        </li>
                    </ul>
                </div>
            </div>
            <div className="recommend-wrap">
                <h3>추천제품</h3>
                <div className="recommend">
                {
         updatedShoes.map((a, i)=>{
          return (
         <div className='shoes-item' onClick={()=>{
            navigate(`/detail/${a.id}`);
            setNavi(navi + 1);
            }}>
           <img src={`https://codingapple1.github.io/shop/shoes${a.id + 1}.jpg`}/>
           <h4>{a.title}</h4>
           <p>{a.price}</p>
         </div>
          )
         })
         }
                </div>
            </div>
        </div>
    )
}

export default Detail;