import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCountUp, setCountDown, setRemoveItem } from "../store";


function Cart (){

    const a = useSelector((state)=>{ return state });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.setItem('cartData', JSON.stringify(a.cart));
    }, [a]);
  

    return (
        <div className="cart-wrap">
            <div className="container">
                <h3><FontAwesomeIcon icon={faCartShopping} />&ensp; 장바구니</h3>
                <div className="cart-table">
                    <div className="cart-name table">
                        <p>#</p>
                        <p style={{width : '40%'}}>상품명</p>
                        <p style={{width : '40%'}}>수량</p>
                        <p>주문금액</p>
                    </div>
                    {
                        a.cart.map((a, i)=>{
                            return (
                            <div className="cart-item table">
                                <p>{i + 1}</p>
                                <div className="cart-images" onClick={()=>{navigate(`/detail/${a.id}`)}}>
                                    <div className="cart-img">
                                    <img src={`https://codingapple1.github.io/shop/shoes${a.id + 1}.jpg`}/>
                                    </div>
                                    <p>{a.name}</p>
                                </div>
                                <div className="cart-count">
                                    <p>{a.count}</p>
                                    <div className="cart-count-btn">
                                        <button onClick={()=>{dispatch(setCountUp(a.id))}}>+</button>
                                        <button onClick={()=>{
                                            dispatch(setCountDown(a.id));
                                            if(a.count < 2){
                                                dispatch(setRemoveItem(a.id));
                                            };
                                            }}>-</button>
                                    </div>
                                </div>
                                <p>{a.price * a.count} </p>
                            </div>
                            )
                        })
                    }
                </div>
                <div className="total">
                    <p>총 상품금액&emsp;{
                   a.cart.reduce((acc, product) => acc + product.count * product.price, 0).toLocaleString()
                } 원&emsp;</p>
                <p>-&emsp;할인비용&emsp;0원&emsp;</p>
                <p>+&emsp;배송비&emsp;0원&emsp;</p>
                <p className="total-total">=&emsp;총 결제금액&emsp;{
                   a.cart.reduce((acc, product) => acc + product.count * product.price, 0).toLocaleString()
                } 원</p>
                </div>
                <div className="pay" onClick={()=>{
                    if(a.cart.length == 0){
                        return alert('장바구니가 비었습니다.');
                    }
                    return alert('훌륭한 안목이십니다.👍')}}>결제하기</div>
            </div>
        </div>
    )
};

export default Cart;