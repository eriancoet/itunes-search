import React from 'react';
import renderer from 'react-test-renderer';
import DisplayResults from "../Components/Display";

describe('<DisplayResults/>', () => {
    it('should render correctly in "debug" mode', () => {
      const component = renderer.create( <DisplayResults/>).toJSON();
    
      expect(component).toMatchSnapshot();
    });
  });
  
  