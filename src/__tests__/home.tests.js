import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../Views/Home';
import { MemoryRouter } from 'react-router-dom'

const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn()
  };
  
global.navigator.geolocation = mockGeolocation;

describe ('test Home View', () => {
    test('Renders Home component', () => {
        render ( <Home />, { wrapper: MemoryRouter } );
        screen.debug();
        expect(screen.getByText('Next 10 Buses')).toBeInTheDocument();
        expect(screen.getByText(/Current position/)).toBeInTheDocument();
        expect(screen.getByText(/Current location/)).toBeInTheDocument();
        expect(screen.getByText('Map View')).toBeInTheDocument();
        expect(screen.getByText('Journey View')).toBeInTheDocument();
    });
});