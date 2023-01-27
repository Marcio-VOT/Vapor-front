import { useNavigate } from "react-router-dom";
import FooterMenu from "../../components/FooterMenu/FooterMenu";
import TopMenu from "../../components/TopMenu/TopMenu";
import {
  StyledTopoCart,
  StyledMainContainerCart,
  StyledTextCenterPage,
  StyledTotalCartBuy,
  StyledContainerTotalWriting,
  StyledButtonBuy,
  StyledTotalWriting,
} from "./CartPageStyled";
import { AiOutlineLeft } from "react-icons/ai";
import { useContext, useState } from "react";
import { CartContext } from "../../context/cartContext";
import ProductCart from "../../components/ProductCart/ProductCart";
import { useEffect } from "react";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, setTotalCompra } = useContext(CartContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    for (let i = 0; i < cart.length; i++) {
      if (!cart[i].pricePromotion) {
        setTotal((novoValor) => novoValor + Number(cart[i].price));
      }
      if (cart[i].pricePromotion) {
        setTotal((novoValor) => novoValor + Number(cart[i].pricePromotion));
      }
    }
  }, []);

  const checkout = () => {
    setTotalCompra(total);
    navigate("/pagamento");
  };

  return (
    <>
      <TopMenu>
        <StyledTopoCart>
          <div>
            <AiOutlineLeft onClick={() => navigate(-1)} />
          </div>
          <h1>Carrinho</h1>
        </StyledTopoCart>
      </TopMenu>
      <StyledMainContainerCart cart={cart}>
        {cart.length === 0 ? (
          <StyledTextCenterPage>Vá as compras depois retorne aqui! s2 </StyledTextCenterPage>
        ) : (
          <>
            {cart.map((item) => (
              <ProductCart key={item._id} item={item} />
            ))}
            <StyledTotalCartBuy>
              <StyledContainerTotalWriting>
                <StyledTotalWriting>Total:</StyledTotalWriting>
                <StyledTotalWriting>R$ {total.toFixed(2).replace(".", ",")}</StyledTotalWriting>
              </StyledContainerTotalWriting>
              <StyledButtonBuy onClick={checkout}>Comprar</StyledButtonBuy>
            </StyledTotalCartBuy>
          </>
        )}
      </StyledMainContainerCart>
      <FooterMenu />
    </>
  );
};

export default CartPage;
