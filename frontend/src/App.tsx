/**
 * Componente principal da aplicação
 * Gerencia a autenticação do usuário e o layout principal da aplicação
 */

import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import MainLayout from "./layout/MainLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser, UserSlicePath } from "./provider/slice/user.slice";

function App() {
  // Estado para controlar o carregamento inicial da aplicação
  const [loading, SetLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector(UserSlicePath);

  /**
   * Busca os dados do usuário autenticado
   * @param {string} token - Token de autenticação JWT
   */
  const fetchUser = async (token: string) => {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/v1/auth/profile",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log(data.user);
      dispatch(setUser(data.user));

      SetLoading(false);
      return;
    } catch (error) {
      console.log(error);

      // Redireciona para login em caso de erro de autenticação
      navigate("/login");
      return;
    }
  };

  // Efeito para verificar autenticação na inicialização
  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    if (!token) {
      // Redireciona para login se não houver token
      navigate("/login");
      return;
    } else {
      if (selector?.email) {
        // Se o usuário já está carregado, finaliza o carregamento
        SetLoading(false);
        return;
      } else {
        // Busca dados do usuário se houver token mas não dados carregados
        (async () => {
          await fetchUser(token);
        })();
      }
    }
  }, []);

  // Exibe tela de carregamento enquanto verifica autenticação
  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Header />
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  );
}

export default App;
