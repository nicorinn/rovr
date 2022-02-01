import { within } from '@testing-library/react';
import React from 'react';
import { render, screen } from '../../test-utils';
import ImageCard from './ImageCard';

const testImage = {
  id: 921146,
  sol: 3358,
  camera: {
    id: 20,
    name: 'FHAZ',
    rover_id: 5,
    full_name: 'Front Hazard Avoidance Camera',
  },
  img_src:
    'https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/03358/opgs/edr/fcam/FLB_695611717EDR_F0922566FHAZ00337M_.JPG',
  earth_date: '2022-01-16',
  rover: {
    id: 5,
    name: 'Curiosity',
    landing_date: '2012-08-06',
    launch_date: '2011-11-26',
    status: 'active',
  },
};

describe('<ImageCard />', () => {
  test('displays caption', () => {
    render(<ImageCard {...testImage} />);
    screen.getByText(/Front Hazard Avoidance Camera/i);
  });

  test('displays date', () => {
    render(<ImageCard {...testImage} />);
    screen.getByText(/2022-01-16/i);
  });

  test('displays alt text', () => {
    render(<ImageCard {...testImage} />);
    screen.getByAltText(/nasa image/i);
  });

  test('displays like button', () => {
    render(<ImageCard {...testImage} />);
    screen.getByRole('button', { name: /like-921146/i });
  });

  test('like button is toggled on click', async () => {
    render(<ImageCard {...testImage} />);
    const likeButton = screen.getByRole('button', { name: /like-921146/i });
    screen.getByRole('img', { name: /unstarred icon/i });

    likeButton.click();
    await screen.findByRole('img', { name: /^starred icon/i });
    likeButton.click();
    await screen.findByRole('img', { name: /unstarred icon/i });
  });

  test('map button is toggled on click', async () => {
    render(<ImageCard {...testImage} />);

    const image = screen.getByAltText(/nasa image/i);
    const mapButton = screen.getByRole('button', {
      name: /map\-921146/i,
    });
    await within(mapButton).findByRole('img', {
      name: /map icon/i,
    });

    mapButton.click();

    expect(image).not.toBeInTheDocument();
    await within(mapButton).findByRole('img', { name: /image icon/i });

    mapButton.click();

    await screen.findByAltText(/nasa image/i);
    await within(mapButton).findByRole('img', {
      name: /map icon/i,
    });
  });
});
