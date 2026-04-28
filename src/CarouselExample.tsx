import Carousel from '@semcore/carousel';
import Card from '@semcore/card';

const content = [
  {
    name: 'Mary',
    text: 'I have been able to close the gaps between my organic and paid efforts thus distributing my budget and tactics in a comprehensive manner.',
  },
  {
    name: 'Jane',
    text: 'The ads not only fit the client brief, but also have returned great results.',
  },
  {
    name: 'Mike',
    text: 'It tells me what kind of ads are being run by a specific domain. It is good to optimize my own strategy!',
  },
];

const Demo = () => (
  <>
    <h2>App Reviews</h2>

    <Carousel
      w='min(100%, 600px)'
      aria-label='App reviews'
    >
      {content.map((item, index) => (
        <Carousel.Item
          key={index}
        >
          <Card m={2} h={200}>
            <p>{item.text}</p>
            {item.name}
          </Card>
        </Carousel.Item>
      ))}
    </Carousel>
  </>
);

export default Demo;
