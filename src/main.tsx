import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// 기존에 생성되어 화면에 남아있는 에러 팝업을 제거합니다.
document.querySelectorAll('div[style*="z-index: 9999"]').forEach(el => el.remove());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

