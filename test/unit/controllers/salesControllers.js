const sinon = require('sinon');
const { expect } = require('chai');

const servicesSales = require('../../../services/servicesSales');
const { allSales, getOneSales, insertSalesProduct, updateSaleQtd } = require('../../../controllers/controllersSales');

describe('Testando a camada Controllers na rota /Sales Method GET ', () => {
    const req = {};
    const res = {};
    describe('teste da função allSales', () => {
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
            sinon.stub(servicesSales, 'insertedSalesProduct').resolves(resultDB)
        });

        after(() => {
            servicesSales.insertedSalesProduct.restore();
        });

        it('Testa se o cód 200 retorna com caso de sucesso na requisição', async () => {
            await allSales(req, res);
            expect(res.status.calledWith(200)).to.be.true;
        });


        it('Testa se o objeto retorna com caso de sucesso na requisição', async () => {
            await allSales(req, res);
            expect(res.json.calledWith(resultDB)).to.be.false;

        });

        it('Testa se retorna um erro de "Not Found" caso não retorna nada na requisição', async () => {
            await allSales(req, res);
            expect(res.json.calledWith({ message: 'Not Found' })).to.be.false;
        });
    });

});

describe('Testando a camada Controllers na rota /sales/:id  Method GET ', () => {
    const req = {};
    const res = {};
    describe('Teste da função getOneSales', () => {
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
            sinon.stub(servicesSales, 'salesId').resolves(oneproductBD)
        });

        after(() => {
            servicesSales.salesId.restore();
        });

        it('Testa se o cód 200 retorna com ID correto passado na requisição', async () => {
            await getOneSales(req, res);
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(oneproductBD[0])).to.be.false;
        })

        it('Testa se o objeto retorna com caso de sucesso na requisição', async () => {
            await getOneSales(req, res);
            expect(res.json.calledWith(oneproductBD[0])).to.be.false;

        });


        it('Testa se retorna um erro de "Not Found" caso não retorna nada na requisição', async () => {
            await getOneSales(req, res);
            expect(res.json.calledWith({ message: 'Not Found' })).to.be.false;
        });
    });

});

describe('Testando a camada Controllers na rota /sales  Method POST ', () => {
    const req = {};
    const res = {};
    describe('Teste da função insertSalesProduct', () => {
        const newProductBD =   {
            "id": 1,
            "itemsSold": [
              {
                "productId": 1,
                "quantity": 3
              }
            ]
          };

        before(async () => {
            req.body =   [
                {
                  "productId": 1,
                  "quantity": 3
                }
              ];

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            sinon.stub(servicesSales, 'insertedSalesProduct').resolves(newProductBD);
        });

        after(() => {
            servicesSales.insertedSalesProduct.restore();
        });

        it('Testa se retorna o status 201 ao cadatrar uma nova venda com sucesso', async () => {
            await insertSalesProduct(req, res);
            expect(res.json.calledWith(201)).to.be.false;
        });

        it('Testa se a venda já existe no Banco de dados', async () => {
            await insertSalesProduct(req, res);
            expect(res.json.calledWith({ message: 'Product already exists' })).to.be.false;

        });
    });
});

describe('Testando a camada Controllers na rota /sales/:id  Method PUT ', () => {
    const req = {};
    const res = {};
    describe('Teste da função updateSaleQtd', () => {
        const updateSaleBD =     {
            "saleId": 1,
            "itemUpdated": [
              {
                "productId": 1,
                "quantity": 6
              }
            ]
          };

        before(async () => {
            req.params = { id: 1 };
            req.body =   [
                {
                  "productId": 1,
                  "quantity": 6
                }
              ];

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            sinon.stub(servicesSales, 'updateSales').resolves(updateSaleBD);
        });

        after(() => {
            servicesSales.updateSales.restore();
        });

        it('Testa se o cód 200 retorna quando um produto é atualizado', async () => {
            await updateSaleQtd(req, res);
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(updateSaleBD)).to.be.true;
        })

        it('Testa se o objeto atualizado retorna em caso de sucesso na requisição', async () => {
            await updateSaleQtd(req, res);
            expect(res.json.calledWith(updateSaleBD)).to.be.true;

        });


        it('Testa se retorna um erro de "Not Found" caso não o ID não seja encontrado', async () => {
            await updateSaleQtd(req, res);
            expect(res.json.calledWith({ message: 'Not Found' })).to.be.false;
        });
    });
});