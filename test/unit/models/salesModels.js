const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db');

const { allSalesDB, getSalesId, insertSalesProduct } = require('../../../models/modelsSales');

describe('Testa se o banco de dados está realizando as busca por todos as vendas', () => {
    describe('caso não haja nenhum vendas no banco de dados.', () => {
        before(async () => {
            sinon.stub(connection, 'execute').resolves([[]]);
        });

        after(() => {
            connection.execute.restore();
        });

        it('testa se o retorno é um array', async () => {
            const [allSearchResult] = await allSalesDB();
            expect(allSearchResult).to.be.an('array');
        });

        it('testa se o retorno é um array vazio', async () => {
            const [allSearchResult] = await allSalesDB();
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
            const [allSearchResult] = await allSalesDB();
            expect(allSearchResult).to.be.an('object');
        });

        it('Testa se o retorno não está vazio', async () => {
            const [allSearchResult] = await allSalesDB();
            expect(allSearchResult).to.not.be.empty;
        });

        it('Testa se o objeto retorna com as propriedades: id, name e quantity', async () => {
            const [allSearchResult] = await allSalesDB();
            expect(allSearchResult).to.includes.all.keys('id', 'name', 'quantity');
        });
    });

});

describe('Testa se o banco de dados está realizando as busca produtos por id', () => {
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
            const [oneResult] = await getSalesId();
            expect(oneResult).to.be.an('object');
        })

        it('Testa se o retorno não está vazio', async () => {
            const oneResult = await getSalesId();
            expect(oneResult).to.not.be.empty;
        });

        it('Testa se o objeto retorna com as propriedades: id, name e quantity', async () => {
            const [oneResult] = await getSalesId();
            expect(oneResult).to.includes.all.keys('id', 'name', 'quantity');
        });

    });


});

describe('testa se o banco de dados está inserindo a uma nova venda ', () => {
    describe('caso a inserção ocorra com sucesso', () => {
        const ProductSaled = [{ "product_id": 4, "quantity": 15 }];
        
        before(async () => {
            const identify = [{ id: 4 }];
            sinon.stub(connection, 'execute').resolves([[identify]]);
        });

        after(async() => {
            connection.execute.restore();
        });

        it('retorna um array ', async () => {
            const [saleDB] = await insertSalesProduct(ProductSaled);
            expect(saleDB).to.be.an('array');
        });

        it('o array não é vazio', async () => {
            const [saleDB] = await insertSalesProduct(ProductSaled);
            expect(saleDB).to.be.not.empty;

        });

    })

})