// import dependencies
import React from 'react'

// import API mocking utilities from Mock Service Worker
// import {rest} from 'msw'
// import {setupServer} from 'msw/node'

// import react-testing methods
import {render, fireEvent, waitFor, screen} from '@testing-library/react'

// the component to test
// import TrackCard from './TrackCard'
import data from '../../single-sample'

test('Load album card and click button', () => {
    render(
        <Albumcard 
        data={data[0]}
        handleSelectedtrack={jest.fn()}
        handleUnselectedTrack={jest.fn()}
        />
    )
    const Albumname = screen.getByText('A Night At The Opera (2011 Remaster)');
    const Songname = screen.getByText('Bohemian Rhapsody - Remastered 2011');
    const Image = screen.getByRole('img');
    const button = screen.getByText('Select')
    
    expect(Albumname).toBeInTheDocument();
    expect(Songname).toBeInTheDocument();
    expect(Image).toBeInTheDocument();

    
    fireEvent.click(button);


    expect(screen.getByText('Deselect')).toBeInTheDocument();
  })
