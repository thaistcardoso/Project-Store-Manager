const sinon = require('sinon');
const { expect } = require('chai');
const chai = require('chai');
chai.use(require("chai-as-promised"));
const connection = require('../../../db');

const servicersSales = require('../../../services/servicesSales');
const { allSales, getOneSales, insertSalesProduct, updateSaleQtd } = require('../../../controllers/controllersSales');

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

const oneproductBD = {
    id: 1,
    name: "Martelo de Thor",
    quantity: 10
};
describe('Testando a camada Controllers na rota /Sales Method GET ', () => {
    const req = {};
    const res = {};
    describe('teste da função allSales', () => {
        
        before(async () => {
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(connection, 'execute').resolves([]);
            sinon.stub(servicersSales, 'getAllSales').resolves(resultDB)
        });

        after(() => {
            servicersSales.getAllSales.restore();
            connection.execute.restore();
        });

        it('Testa se o cód 200 retorna com caso de sucesso na requisição', async () => {
            await allSales(req, res);
            expect(res.status.calledWith(200)).to.be.true;
        });


        it('Testa se o objeto retorna com caso de sucesso na requisição', async () => {
            await allSales(req, res);
            expect(res.json.calledWith(resultDB)).to.be.true;

        });
    });

});

describe('Testando a camada Controllers na rota /sales/:id  Method GET ', () => {
    const req = {};
    const res = {};
    describe('Teste da função getOneSales quando busca uma venda por id', () => {
        const req = { params: { id: 1 }}


        before(async () => {

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(connection, 'execute').resolves([]);
            sinon.stub(servicersSales, 'salesId').resolves(oneproductBD)
        });

        after(() => {
            servicersSales.salesId.restore();
            connection.execute.restore();
        });

        it('Testa se o cód 200 retorna com ID correto passado na requisição', async () => {
            await getOneSales(req, res);
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(oneproductBD[0])).to.be.equal;
        })

        it('Testa se o objeto retorna com caso de sucesso na requisição', async () => {
            await getOneSales(req, res);
            expect(res.json.calledWith(oneproductBD[0])).to.be.equal;

        });
    });

    describe('Teste da função getOneSales quando busca uma venda por id não ocorre', () => {
        const req = { params: { id: 1 }}
        
        before(async () => {

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(servicersSales, 'salesId').resolves(oneproductBD)
        });

        after(() => {
            servicersSales.salesId.restore();
        });

        it('Testa se retorna um erro de "Not Found" caso não retorna nada na requisição', async () => {
            await getOneSales(req, res);
            expect(res.json.calledWith({ message: 'Not Found' })).to.be.equal;
        }); 
    })

});

describe('Testando a camada Controllers na rota /sales  Method POST ', () => {
    const req = {};
    const res = {};
    describe('Teste da função insertSalesProduct', () => {
        const newProductBD = {
            "id": 1,
            "itemsSold": [
                {
                    "productId": 1,
                    "quantity": 3
                }
            ]
        };

        before(async () => {
            req.body = [
                {
                    "productId": 1,
                    "quantity": 3
                }
            ];

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            sinon.stub(connection, 'execute').resolves([]);
            sinon.stub(servicersSales, 'insertedSalesProduct').resolves(newProductBD);
        });

        after(() => {
            servicersSales.insertedSalesProduct.restore();
            connection.execute.restore();
        });

        it('Testa se retorna o status 201 ao cadastrar uma nova venda com sucesso', async () => {
            await insertSalesProduct(req, res);
            expect(res.status.calledWith(201)).to.be.true;
        });

        it('Testa se a venda já existe no Banco de dados', async () => {
            await insertSalesProduct(req, res);
            expect(res.json.calledWith({ message: 'Product already exists' })).to.be.equal;

        });
    });
});

describe('Testando a camada Controllers na rota /sales/:id  Method PUT ', () => {
    const req = {};
    const res = {};
    describe('Teste da função updateSaleQtd', () => {
        const updateSaleBD = {
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
            req.body = [
                {
                    "productId": 1,
                    "quantity": 6
                }
            ];

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns(updateSaleBD);

            sinon.stub(servicersSales, 'salesId').resolves()
            sinon.stub(servicersSales, 'updateSales').resolves(updateSaleBD);
        });

        after(() => {
            servicersSales.salesId.restore();
            servicersSales.updateSales.restore();
        });

        it('Testa se o cód 200 retorna quando um produto é atualizado', async () => {
            await updateSaleQtd(req, res);
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(updateSaleBD)).to.be.equal;
        })

        it('Testa se o objeto atualizado retorna em caso de sucesso na requisição', async () => {
            await updateSaleQtd(req, res);
            expect(res.json.calledWith(updateSaleBD)).to.be.equal;

        });


        it('Testa se retorna um erro de "Not Found" caso não o ID não seja encontrado', async () => {
            await updateSaleQtd(req, res);
            expect(res.json.calledWith({ message: 'Not Found' })).to.be.equal;
        });
    });
});