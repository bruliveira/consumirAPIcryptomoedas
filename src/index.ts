import fetch from "node-fetch"

const apiUrl: string = 'https://api.coinranking.com/v2/coins'

//Criar uma interface --> Deixar pronta. Lembrando que é o que a API retorna
interface ICoin{ //O Coin está dentro do data, e dentro dele tem esses:
    uuid: string;
    symbol: string;
    name: string;
    color: string;
    iconUrl: string;
    marketCap: string;
    price: string;
    listeAt: number;
    tier: number;
    change: string;
    rank: number;
    sparkline: string[];
    lowVolume: string;
    coinrankingUrl: string;
    object: string;
    btcPrice: string;
}
//Corpo geral
interface IResult{
    status: string;
    data: IData;
}
//O tipo do data que é o status e o coins
interface IData{
    status: object;
    coins: ICoin[];
}

const promise = <T>(fetchPromise: any): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
        fetchPromise.then((result: any) => {
            result.json().then((jsonResult: any) => {
                resolve(jsonResult as Promise<T>)
            })
        })
        .catch((err: any) =>{
            reject(err)
        })
    })
}
const fetchApi = <T>(url: string): Promise<T> => {
    return promise(fetch(url))
}
const getCoins = async (): Promise<ICoin[]> =>{
    return (await (await fetchApi<IResult>(apiUrl)).data.coins)
}
if(require.main === module){
    (async () => {
        console.log('Hello world!')
        
        //const coins: ICoin[] = await getCoins();
        //console.log(coins)
    })().catch((err: any) =>{
        console.log(err)
    })
}

