const sinon = require('sinon');
const chai = require('chai');
const { expect } = require('chai');
chai.use(require("chai-as-promised"));
const connection = require('../../../db');

const servicersProducts = require('../../../services/servicersProducts');
const { getAllProd, getOneProduct, insertNewProduct, upDateNewProduct } = require('../../../controllers/controllersProducts');

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
    name: "Martelo do Thor",
    quantity: 10
};

describe('Testando a camada Controllers na rota /products Method GET ', () => {
    const req = {};
    const res = {};
    describe('teste da função getAllProdcts', () => {
        
        before(async () => {
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns(resultDB);
            sinon.stub(connection, 'execute').resolves([]);
            sinon.stub(servicersProducts, 'getAllProducts').resolves(resultDB)
        });

        after(() => {
            servicersProducts.getAllProducts.restore();
            connection.execute.restore();

        });

        it('Testa se o cód 200 retorna com caso de sucesso na requisição', async () => {
            await getAllProd(req, res);
            expect(res.status.calledWith(200)).to.be.true;
        });


        it('Testa se o objeto retorna com caso de sucesso na requisição', async () => {
            await getAllProd(req, res);
            expect(res.json.calledWith(resultDB)).to.be.equal;

        });
    });

});

describe('Testando a camada Controllers na rota /products/:id  Method GET ', () => {
    const req = {};
    const res = {};
    describe('Teste da função getOneProduct', () => {
        const req = {
            params: {
                id: 1
            }
        };

        before(async () => {

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns(oneproductBD);
            sinon.stub(connection, 'execute').resolves([]);
            sinon.stub(servicersProducts, 'prodId').resolves(oneproductBD)
        });

        after(() => {
            servicersProducts.prodId.restore();
            connection.execute.restore();
        });

        it('Testa se o cód 200 retorna com ID correto como passado na requisição', async () => {
            await getOneProduct(req, res);
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(oneproductBD)).to.be.equal;
        });

        it('Testa se o objeto retorna com caso de sucesso na requisição', async () => {
            await getOneProduct(req, res);
            expect(res.json.calledWith(oneproductBD)).to.be.equal;

        });

        it('Testa se retorn um erro de "Not Found" caso não retorna nada na requisição', async () => {
            await getOneProduct(req, res);
            expect(res.json.calledWith({ message: 'Not Found' })).to.be.equal;
        });
    });

});

describe('Testando a camada Controllers na rota /products  Method POST ', () => {
    const req = {};
    const res = {};
    describe('Teste da função insertNewProduct quando insere um produto', () => {
        const newProductBD = {
            id: 1,
            name: "Martelo de Thor",
            quantity: 10
        };


        const req = { body : { name: "produto", quantity: 10 }};

        before(async () => {

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns(newProductBD);
            sinon.stub(connection, 'execute').resolves([]);

            sinon.stub(servicersProducts, 'getAllProducts').resolves(resultDB);
            sinon.stub(servicersProducts, 'insertProd').resolves([{insertId:1}  ]);
        });

        after(() => {
            servicersProducts.insertProd.restore();
            servicersProducts.getAllProducts.restore();
            connection.execute.restore();
        });

        it('Testa se retorna o status 201 ao cadatrar um novo produto com sucesso', async () => {
            await insertNewProduct(req, res);
            expect(res.status.calledWith(201)).to.be.true;
        });



    });

    describe('teste da Função InsertNewProduc quando não insere um produto', () => {
        const newProduct = [{
            name: "Martelo de Thor",
            quantity: 10
        }];


        const req = { body : { name: "Martelo de Thor", quantity: 10 }};

        before(async () => {

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon.stub(connection, 'execute').resolves([]);

            sinon.stub(servicersProducts, 'getAllProducts').resolves(newProduct);
        });

        after(() => {
            servicersProducts.getAllProducts.restore();
            connection.execute.restore();
        });

        it('Testa se o produto já existe no Banco de dados', async () => {
            await insertNewProduct(req, res);
            expect(res.json.calledWith({ message: 'Product already exists' })).to.be.equal;

        });
    })
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
            sinon.stub(connection, 'execute').resolves([]);
               
            sinon.stub(servicersProducts, 'prodId').resolves([oneproductBD]);
            sinon.stub(servicersProducts, 'upDateById').resolves(upDateProductBD);
        });

        after(() => {
            servicersProducts.upDateById.restore();
            servicersProducts.prodId.restore();
            connection.execute.restore();
        });

        it('Testa se o cód 200 retorna quando um produto é atualizado', async () => {
            await upDateNewProduct(req, res);
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(upDateProductBD)).to.be.equal;
        });

        it('Testa se o objeto atualizado retorna em caso de sucesso na requisição', async () => {
            await upDateNewProduct(req, res);
            expect(res.json.calledWith(upDateProductBD)).to.be.equal;

        });


        it('Testa se retorna um erro de "Not Found" caso não o ID não seja encontrado', async () => {
            await upDateNewProduct(req, res);
            expect(res.json.calledWith({ message: 'Not Found' })).to.be.equal;
        });
    });
});
//