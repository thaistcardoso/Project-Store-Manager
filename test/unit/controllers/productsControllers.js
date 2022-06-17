const sinon = require('sinon');
const { expect } = require('chai');

const servicesProducts = require('../../../services/servicersProducts');
const { getAllProd, getOneProduct, insertNewProduct, upDateNewProduct } = require('../../../controllers/controllersProducts');

describe('Testando a camada Controllers na rota /products Method GET ', () => {
    const req = {};
    const res = {};
    describe('teste da função getAllProdcts', () => {
        const resultDB = [
            {
                id: 1,
                name: "produto A",
                quantity: 10
            },
            {
                id: 2,
                name: "produto B",
                quantity: 20
            }
        ];

        before(async () => {
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(servicesProducts, 'getAllProducts').resolves(resultDB)
        });

        after(() => {
            servicesProducts.getAllProducts.restore();
        });

        it('Testa se o cód 200 retorna com caso de sucesso na requisição', async () => {
            await getAllProd(req, res);
            expect(res.status.calledWith(200)).to.be.true;
        });


        // it('Testa se o objeto retorna com caso de sucesso na requisição', async () => {
        //     await getAllProd(req, res);
        //     expect(res.json.calledWith(resultDB)).to.be.true;

        // });
    });

});

describe('Testando a camada Controllers na rota /products/:id  Method GET ', () => {
    const req = {};
    const res = {};
    describe('Teste da função getOneProduct', () => {
        const oneproductBD = {
            id: 1,
            name: "Martelo de Thor",
            quantity: 10
        };

        before(async () => {
            req.params = {
                id: 1
            }

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(servicesProducts, 'prodId').resolves(oneproductBD)
        });

        after(() => {
            servicesProducts.prodId.restore();
        });

        // it('Testa se o cód 200 retorna com ID correto como passado na requisição', async () => {
        //     await getOneProduct(req, res);
        //     expect(res.status.calledWith(200)).to.be.true;
        //     expect(res.json.calledWith(oneproductBD[0])).to.be.true;
        // });

        // it('Testa se o objeto retorna com caso de sucesso na requisição', async () => {
        //     await getOneProduct(req, res);
        //     expect(res.json.calledWith(oneproductBD[0])).to.be.true;

        // });


        // it('Testa se retorna status 404 e um erro de "Not Found" caso não retorna nada na requisição', async () => {
        //     await getOneProduct(req, res);
        //     expect(res.status.calledWith(400)).to.be.true;
        //     expect(res.json.calledWith({ message: 'Not Found' })).to.be.true;
        // });
    });

});

describe('Testando a camada Controllers na rota /products  Method POST ', () => {
    const req = {};
    const res = {};
    describe('Teste da função insertNewProduct', () => {
        const newProductBD = {
            id: 1,
            name: "Martelo de Thor",
            quantity: 10
        };

        before(async () => {
            req.body = { name: "produto", quantity: 10 };

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            sinon.stub(servicesProducts, 'insertProd').resolves(newProductBD);
        });

        after(() => {
            servicesProducts.insertProd.restore();
        });

        // it('Testa se retorna o status 201 ao cadatrar um novo produto com sucesso', async () => {
        //     await insertNewProduct(req, res);
        //     expect(res.status.calledWith(201)).to.be.true;
        // });

        it('Testa se o produto já existe no Banco de dados', async () => {
            await insertNewProduct(req, res);
            expect(res.json.calledWith({ message: 'Product already exists' })).to.be.true;

        });
    });
});

describe('Testando a camada Controllers na rota /products/:id  Method PUT ', () => {
    const req = {};
    const res = {};
    describe('Teste da função upDateProduct', () => {
        const upDateProductBD = {
            id: 1,
            name: "Martelo de Thor",
            quantity: 10
        };

        before(async () => {
            req.params = { id: 1 };
            req.body = { name: "produto", quantity: 10 };

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            sinon.stub(servicesProducts, 'upDateById').resolves(upDateProductBD);
        });

        after(() => {
            servicesProducts.upDateById.restore();
        });

        // it('Testa se o cód 200 retorna quando um produto é atualizado', async () => {
        //     await upDateNewProduct(req, res);
        //     expect(res.status.calledWith(200)).to.be.true;
        //     expect(res.json.calledWith(upDateProductBD)).to.be.true;
        // });

        // it('Testa se o objeto atualizado retorna em caso de sucesso na requisição', async () => {
        //     await upDateNewProduct(req, res);
        //     expect(res.json.calledWith(upDateProductBD)).to.be.true;

        // });


        // it('Testa se retorna um erro de "Not Found" caso não o ID não seja encontrado', async () => {
        //     await upDateNewProduct(req, res);
        //     expect(res.json.calledWith({ message: 'Not Found' })).to.be.true;
        // });
    });
});