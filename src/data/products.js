import image1 from '../assets/photo/11.jpg';
import image2 from '../assets/photo/12.jpg';
import image3 from '../assets/photo/13.jpg';
import image4 from '../assets/photo/141.jpg';
import image5 from '../assets/photo/151.jpg';
import image6 from '../assets/photo/161.jpg';
import image7 from '../assets/photo/171.jpg';
import image8 from '../assets/photo/men.jpg';

export const products = [
  {
    id: '1',
    name: 'TEJASI',
    price: 599,
    description: 'A luxurious fragrance for women with elegant floral notes that captivate and inspire.',
    category: 'For Her',
    images: [image1],
    reviews: [
      { text: 'Amazing fragrance!', author: 'Sarah', date: '2024-08-20' },
      { text: 'Love the scent', author: 'Priya', date: '2024-08-18' }
    ],
    discount: 10,
    quantity: 50
  },
  {
    id: '2',
    name: 'AQUA',
    price: 799,
    description: 'A refreshing fragrance for men with aquatic notes that energize and refresh.',
    category: 'For Him',
    images: [image2],
    reviews: [
      { text: 'Very fresh scent!', author: 'Rahul', date: '2024-08-19' }
    ],
    discount: 5,
    quantity: 30
  },
  {
    id: '3',
    name: 'YODHA',
    price: 899,
    description: 'An oriental fragrance for men with bold and powerful woody notes.',
    category: 'For Him',
    images: [image3],
    reviews: [],
    discount: 15,
    quantity: 25
  },
  {
    id: '4',
    name: 'VAHINI',
    price: 399,
    description: 'A sweet and gentle fragrance for kids with playful fruity notes.',
    category: 'For Kids',
    images: [image4],
    reviews: [],
    discount: 0,
    quantity: 20
  },
  {
    id: '5',
    name: 'VAASNA',
    price: 699,
    description: 'A sophisticated fragrance for men with complex spicy undertones.',
    category: 'For Him',
    images: [image5],
    reviews: [],
    discount: 20,
    quantity: 40
  },
  {
    id: '6',
    name: 'SENORA',
    price: 649,
    description: 'A floral fragrance for women with romantic rose and jasmine blend.',
    category: 'For Her',
    images: [image6],
    reviews: [],
    discount: 30,
    quantity: 35
  },
  {
    id: '7',
    name: 'TANTRA',
    price: 799,
    description: 'A dynamic and bold fragrance for men with intense musky notes.',
    category: 'For Him',
    images: [image7],
    reviews: [],
    discount: 25,
    quantity: 15
  },
  {
    id: '8',
    name: 'MYSTIQUE',
    price: 749,
    description: 'An elegant fragrance for women with mysterious and alluring notes.',
    category: 'For Her',
    images: [image8],
    reviews: [],
    discount: 12,
    quantity: 28
  }
];
