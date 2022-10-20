import { expect } from 'chai';
import sinon from 'sinon';
import FrameModel from '../../../models/Frame';
import mongoose from 'mongoose';
import { frameMock, frameMockWithId, allFramesMock } from '../../mocks/frameMock';

describe('Frame Model', () => {
  const frameModel = new FrameModel();

	// fazendo dubles dos métodos do proprio Mongoose
	beforeEach(() => {
		sinon.stub(mongoose.Model, 'create').resolves(frameMockWithId);
		sinon.stub(mongoose.Model, 'findOne').resolves(frameMockWithId);
		sinon.stub(mongoose.Model, 'find').resolves(allFramesMock);
		sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(frameMockWithId);
	});

	afterEach(() => {
		sinon.restore();
	});

	// testando a criação
  describe('creating a frame', () => {
		it('successfully created', async () => {
			const newFrame = await frameModel.create(frameMock);
			expect(newFrame).to.be.deep.equal(frameMockWithId);
		});
	});

	// testando a busca
	describe('searching a frame', () => {
		// com sucesso
		it('successfully found', async () => {
			sinon.stub(mongoose, 'isValidObjectId').returns(true);
			const framesFound = await frameModel.readOne('valid-id');
			expect(framesFound).to.be.deep.equal(frameMockWithId);
			sinon.restore();
		});

		// com falha
		it('_id not found', async () => {
			sinon.stub(mongoose, 'isValidObjectId').returns(false);
			let result;
			try {
				await frameModel.readOne('invalid-id');
			} catch (error: any) {
				result = error;
			}
			expect(result.message).to.be.equal('InvalidMongoId');
			sinon.restore();
		});
	});

	describe('searching all frames', () => {
		it('successfully found', async () => {
			const allFrames = await frameModel.read();
			expect(allFrames).to.be.deep.equal(allFramesMock);
		});
	});

	describe('deleting a frame', () => {
		it('successfully deleted', async () => {
			sinon.stub(mongoose, 'isValidObjectId').returns(true);
			const frameDeleted = await frameModel.destroy('valid-id');
			expect(frameDeleted).to.be.deep.equal(frameMockWithId);
			sinon.restore();
		});

		it('_id not found', async () => {
			sinon.stub(mongoose, 'isValidObjectId').returns(false);
			let result;
			try {
				await frameModel.destroy('invalid-id');
			} catch (error: any) {
				result = error;
			}
			expect(result.message).to.be.equal('InvalidMongoId');
			sinon.restore();
		});
	});
});