import { Button, FormStyled, Input, LinkStyled, Logo, SignInDiv } from "./StyledSignInPage";
import logo from "../../assets/images/Logo.png";
import FooterMenu from "../../components/FooterMenu/FooterMenu";
import { useContext, useState } from "react";
import apiAuth from "../../services/apiAuth";
import { AuthContext } from "../../context/authContext";

const SignInPage = () => {
  const { login } = useContext(AuthContext);
  const [body, setBody] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    apiAuth
      .signIn(body)
      .then((res) => {
        console.log("Logado com sucesso!");
        login(res.data);
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  function editBody(e) {
    setBody({ ...body, [e.target.name]: e.target.value });
  }

  return (
    <SignInDiv>
      <Logo src={logo} alt='logo' />
      <FormStyled onSubmit={handleSubmit}>
        <Input
          name='email'
          value={body.name}
          required
          type='email'
          placeholder='E-mail'
          onChange={editBody}
        />
        <Input
          name='password'
          value={body.password}
          required
          type='password'
          placeholder='Senha'
          onChange={editBody}
        />
        <Button>Entrar</Button>
      </FormStyled>
      <FooterMenu />

      <LinkStyled to='/cadastrar'>Primeira vez? Cadastre-se!</LinkStyled>
    </SignInDiv>
  );
};

export default SignInPage;
