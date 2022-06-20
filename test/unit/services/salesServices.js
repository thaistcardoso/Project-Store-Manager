const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db');

const servicesSales = require('../../../services/servicesSales');
const modelsSales = require('../../../models/modelsSales');
const modelProducts = require('../../../models/modelProducts')

describe('Testa se o banco de dados está realizando as busca por todos as vendas', () => {
    describe('caso não haja nenhum vendas no banco de dados.', () => {
        before(async () => {
            sinon.stub(connection, 'execute').resolves([[]]);
        });

        after(() => {
            connection.execute.restore();
        });

        it('testa se o retorno é um array', async () => {
            const allSearchResult = await servicesSales.getAllSales();
            expect(allSearchResult).to.be.an('array');
        });

        it('testa se o retorno é um array vazio', async () => {
            const allSearchResult = await servicesSales.getAllSales();
            expect(allSearchResult).to.be.empty;
        });
    });

    describe('caso exista venda no banco de dados.', () => {
        before(async () => {
            sinon.stub(connection, 'execute').resolves([{
                id: 1,
                name: 'Martelo do Thor',
                quantity: 10,
            }]);
        });

        after(() => {
            connection.execute.restore();
        });

        it('Testa se o retorno é um objeto', async () => {
            const allSearchResult = await servicesSales.getAllSales();
            expect(allSearchResult).to.be.an('object');
        });

        it('Testa se o retorno não está vazio', async () => {
            const allSearchResult = await servicesSales.getAllSales();
            expect(allSearchResult).to.not.be.empty;
        });

        it('Testa se o objeto retorna com as propriedades: id, name e quantity', async () => {
            const allSearchResult = await servicesSales.getAllSales();
            expect(allSearchResult).to.includes.all.keys('id', 'name', 'quantity');
        });
    });

});

describe('Testa se o banco de dados está realizando as busca vendas de por id', () => {
    describe('caso retorne o resultado da busca pelo id', () => {
        before(async () => {
            sinon.stub(connection, 'execute').resolves([{
                id: 1,
                name: 'Martelo do Thor',
                quantity: 10,
            }]);
        });

        after(() => {
            connection.execute.restore();
        });

        it('Testa se o retorno é um objeto', async () => {
            const oneResult = await servicesSales.salesId();
            expect(oneResult).to.be.an('object');
        })

        it('Testa se o retorno não está vazio', async () => {
            const oneResult = await servicesSales.salesId();
            expect(oneResult).to.not.be.empty;
        });

        it('Testa se o objeto retorna com as propriedades: id, name e quantity', async () => {
            const oneResult = await servicesSales.salesId();
            expect(oneResult).to.includes.all.keys('id', 'name', 'quantity');
        });

    });

});

describe('testa se o banco de dados está inserindo a uma nova venda - servicers', () => {
    describe('caso a inserção ocorra com sucesso', () => {
        const ProductSaled = [{ "product_id": 1, "quantity": 5 }];

        before(async () => {
            sinon.stub(connection, 'execute').resolves([[{ id: 1, quantity: 10 }]]);
            sinon.stub(modelsSales, 'insertSales').resolves([{ salesId: 1 }]);
            sinon.stub(modelsSales, 'insertSalesProduct').resolves()
            sinon.stub(modelProducts, 'getQuantityById').resolves([[{ id: 1, quantity: 10 }]]);
            sinon.stub(modelProducts, 'upDateQuantityProduct').resolves([{}])

        });

        after(() => {
            connection.execute.restore();
            modelsSales.insertSales.restore();
            modelsSales.insertSalesProduct.restore();
            modelProducts.getQuantityById.restore();
            modelProducts.upDateQuantityProduct.restore();
        });

        it('retorna um objeto', async () => {
            const saleDB = await servicesSales.insertedSalesProduct(ProductSaled);
            expect(saleDB).to.be.an('object');
            expect(saleDB).include.all.keys(['id', 'itemsSold'])
        });

        it('o array não é vazio', async () => {
            const saleDB = await servicesSales.insertedSalesProduct(ProductSaled);
            expect(saleDB).to.be.not.empty;

        });

    })

    describe('caso a inserção tenha falha', () => {
        // const ProductSaled = [{ "product_id": 4, "quantity": 100 }];
        // const returnProductSaled = [{ id: saleId, itemsSold: ProductSaled }];
        const saleArray = [
            {
                "productId": 1,
                "quantity": 100
            }
        ]

        before(async () => {
            sinon.stub(connection, 'execute').resolves([[{ id: 1, quantity: 10 }]]);
            sinon.stub(modelsSales, 'insertSales').resolves([{ salesId: 1 }]);
            sinon.stub(modelsSales, 'insertSalesProduct').resolves()
            sinon.stub(modelProducts, 'getQuantityById').resolves([[{ id: 1, quantity: 10 }]]);
            sinon.stub(modelProducts, 'upDateQuantityProduct').resolves([{}])

        });

        after(() => {
            connection.execute.restore();
            modelsSales.insertSales.restore();
            modelsSales.insertSalesProduct.restore();
            modelProducts.getQuantityById.restore();
            modelProducts.upDateQuantityProduct.restore();
        });

        it('retorna mensagem de erro', async () => {
            const createSale = await servicesSales.insertedSalesProduct(saleArray);
            console.log('log', createSale);

            expect(createSale).to.be.an('object');
            expect(createSale).includes.all.keys('error', 'message');
            expect(createSale.message).to.be.equal('Such amount is not permitted to sell');

        })
    });
});