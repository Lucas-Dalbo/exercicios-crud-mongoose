import IFrame from '../../interfaces/Frame';

export const frameMock:IFrame = {
  material: 'Ouro',
  color: 'Daquele naipe'
};

export const frameMockWithId:IFrame & { _id:string } = {
  _id: '62cf1fc6498565d94eba52cd',
  material: 'Ouro',
  color: 'Daquele naipe'
};

export const allFramesMock:(IFrame & { _id:string })[] = [
  {
    _id: '62cf1fc6498565d94eba52cd',
    material: 'Ouro',
    color: 'Daquele naipe'
  },
  {
    _id: '62cf1fc6498565d94eba52db',
    material: 'Diamantes',
    color: 'Rubro'
  },
];