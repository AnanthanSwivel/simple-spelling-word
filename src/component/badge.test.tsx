import React from 'react';
import { render } from '@testing-library/react';
import Badge from './badge';



test("render without crashing" ,() =>{
    const { getByTestId } = render(
          <Badge />
      );
    
      expect(getByTestId(/badge-test-id/i)).toBeInTheDocument();
})