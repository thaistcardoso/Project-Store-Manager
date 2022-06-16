const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db');

const { getAllSales, salesId } = require('../../../services/servicesSales');

describe('Testa se o banco de dados está realizando as busca por todos as vendas', () => {
    describe('caso não haja nenhum vendas no banco de dados.', () => {
        before(async () => {
            sinon.stub(connection, 'execute').resolves([[]]);
        });

        after(() => {
            connection.execute.restore();
        });

        it('testa se o retorno é um array', async () => {
            const allSearchResult = await getAllSales();
            expect(allSearchResult).to.be.an('array');
        });

        it('testa se o retorno é um array vazio', async () => {
            const allSearchResult = await getAllSales();
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
            const allSearchResult = await getAllSales();
            expect(allSearchResult).to.be.an('object');
        });

        it('Testa se o retorno não está vazio', async () => {
            const allSearchResult = await getAllSales();
            expect(allSearchResult).to.not.be.empty;
        });

        it('Testa se o objeto retorna com as propriedades: id, name e quantity', async () => {
            const allSearchResult = await getAllSales();
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
            const oneResult = await salesId();
            expect(oneResult).to.be.an('object');
        })

        it('Testa se o retorno não está vazio', async () => {
            const oneResult = await salesId();
            expect(oneResult).to.not.be.empty;
        });

        it('Testa se o objeto retorna com as propriedades: id, name e quantity', async () => {
            const oneResult = await salesId();
            expect(oneResult).to.includes.all.keys('id', 'name', 'quantity');
        });

    });

});