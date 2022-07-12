import React from 'react';
import ReactDom from 'react-dom';
import Favorite from './favorite';
import { createRoot } from 'react-dom/client';
import { render } from '@testing-library/react';



test("render without crashing" ,() =>{
    const { getByTestId } = render(
          <Favorite />
      );
    
      expect(getByTestId(/favorite-test-id/i)).toBeInTheDocument();
})