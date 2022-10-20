import { expect } from 'chai';
import sinon from 'sinon';
import LensModel from '../../../models/Lens';
import mongoose from 'mongoose';
import { lensMock, lensMockWithId, allLensMock } from '../../mocks/lensMocks';

describe('Lens Model', () => {
  const lensModel = new LensModel();

  beforeEach(() => {
    sinon.stub(mongoose.Model, 'create').resolves(lensMockWithId);
    sinon.stub(mongoose.Model, 'findOne').resolves(lensMockWithId);
    sinon.stub(mongoose.Model, 'find').resolves(allLensMock);
    sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(lensMockWithId);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('creating lens', () => {
    it('successfully created', async () => {
      const newLens = await lensModel.create(lensMock);
      expect(newLens).to.be.deep.equal(lensMockWithId);
    });
  });

  describe('searching a lens', () => {
    it('successfully found', async () => {
      sinon.stub(mongoose, 'isValidObjectId').returns(true);
      const foundLens = await lensModel.readOne('valid-id');
      expect(foundLens).to.be.deep.equal(lensMockWithId);
      sinon.restore();
    });

    it('_id not found', async () => {
      sinon.stub(mongoose, 'isValidObjectId').returns(false);
      let result;
      try {
        await lensModel.readOne('invalid-id');
      } catch (error: any) {
        result = error;
      }
      expect(result.message).to.be.equal('InvalidMongoId');
      sinon.restore();
    });
  });

  describe('searching all lens', () => {
    it('successfully found', async () => {
      const allLens = await lensModel.read();
      expect(allLens).to.be.deep.equal(allLensMock);
    });
  });

  describe('deleting a lens', () => {
    it('successfully deleted', async () => {
      sinon.stub(mongoose, 'isValidObjectId').returns(true);
      const foundLens = await lensModel.destroy('valid-id');
      expect(foundLens).to.be.deep.equal(lensMockWithId);
      sinon.restore();
    });

    it('_id not found', async () => {
      sinon.stub(mongoose, 'isValidObjectId').returns(false);
      let result;
      try {
        await lensModel.destroy('invalid-id');
      } catch (error: any) {
        result = error;
      }
      expect(result.message).to.be.equal('InvalidMongoId');
      sinon.restore();
    });
  });
});