import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

export const SidebarData = [
  {
    title: 'Home',
    path: '/Home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Perguntas',
    path: '/Question',
    icon: <AiIcons.AiFillQuestionCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Criar Rotas',
    path: '/CreateUserRoute',
    icon: <FaIcons.FaMapSigns />,
    cName: 'nav-text'
  },
];