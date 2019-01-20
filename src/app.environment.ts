const isProd = process.env.PROD == 'true';
export const AppEnvironment = {
    dbHost: isProd ? 'mongodb://localhost/products' : 'mongodb://localhost:27017/products'
}