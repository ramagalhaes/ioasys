import React, { useContext, useEffect, useRef, useState } from 'react';
import './login.scss';
import Logo from '../../assets/images/Logo.png';
import { AuthContext } from '../../services/AuthContext';
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const { signIn, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  // Modo de manter autenticacao no react-router-dom v6
  useEffect(() => {
    if(isAuthenticated === true) {
      navigate('/books')
    }
  }, [navigate, isAuthenticated])

  async function performLogin(event: React.MouseEvent) {
    event.preventDefault();
    const response = await signIn({email, password});
    setError(response);
  }

  return (
    <main className='fullscreen'>
      <div className='grid center-center'>
        <section className='content'>
          <span>
            <img src={Logo} alt="Logo ioasys" />
            <h1>Books</h1>
          </span>
          <form action="submit">
            <div className="input-container" onClick={() => emailInput.current?.focus()}>
              <span>
                <p>Email</p>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={(event) => {setEmail(event.target.value)}}
                  ref={emailInput}
                />
              </span>
            </div> 
            <div className="input-container"  onClick={(event) => {
              if(event.target === event.currentTarget) {
                passwordInput.current?.focus()
              }
            }}>
              <span>
                <p>Senha</p>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(event) => {setPassword(event.target.value)}}
                  ref={passwordInput}
                />
              </span>
              <button formAction='submit' onClick={performLogin}>Entrar</button>
            </div>
          </form>
          { error ? 
            <div className='error-dropdown'>
              <p>Email e/ou senha incorretos.</p>
            </div>
            : null
          }
        </section>
      </div>
    </main>
  )
}

export default Login;