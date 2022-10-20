import ILens from '../../interfaces/Lens';

export const lensMock: ILens = {
  degree: 2.5,
  blueLightFilter: true,
  antiGlare: true,
};

export const lensMockWithId:ILens & { _id:string } = {
  _id: '20pega70corre',
  degree: 2.5,
  blueLightFilter: true,
  antiGlare: true,
};

export const allLensMock:(ILens & { _id:string })[] = [
  {
    _id: '20pega70corre',
    degree: 2.5,
    blueLightFilter: true,
    antiGlare: true,
  },
  {
    _id: '100nocao',
    degree: 0.1,
    blueLightFilter: false,
    antiGlare: false,
  },
];