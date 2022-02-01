import { render, screen, fireEvent } from '../../test-utils';
import ImageList from './ImageList';

jest.mock('../../api/roverPhotos.api', () => {
  const testImage = {
    id: 921146,
    sol: 3358,
    camera: {
      id: 20,
      name: 'FHAZ',
      rover_id: 5,
      full_name: 'Front Hazard Avoidance Camera',
    },
    img_src: '',
    earth_date: '2022-01-16',
    rover: {
      id: 5,
      name: 'Curiosity',
      landing_date: '2012-08-06',
      launch_date: '2011-11-26',
      status: 'active',
    },
  };

  const testImages = [
    { ...testImage, id: 1 },
    { ...testImage, id: 2 },
    { ...testImage, id: 3 },
  ];
  return {
    getLatestImages: () => testImages,
  };
});

describe('<ImageList />', () => {
  test('displays images', async () => {
    render(<ImageList />);

    expect(
      await screen.findAllByRole(/img/, { name: /nasa image/i })
    ).toHaveLength(3);
  });
});
