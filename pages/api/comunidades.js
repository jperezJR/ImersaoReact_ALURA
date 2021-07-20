import {SiteClient} from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    
    if (request.method === 'POST'){
        
        const TOKEN = 'a523b8115f54e83450e397e506e31a';
        const client = new SiteClient(TOKEN);

        const registroCriado = await client.items.create({
            itemType: "980227", // model ID
            ...request.body,
            // title: "Comunidade de Teste",
            // imageUrl: "https://github.com/jperezjr.png",
            // creatorSlug: "jperezjr",        
        });



        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,

        })
        return;
    }

    response.status(404).json({
        message: 'Ainda nao temos nada no GET, mas no POST tem!'
    })




}