'use strict'
const http = require('https');
const cheerio = require('cheerio');
const needle = require('needle');

let url = 'https://www.ticketmaster.com.mx/formula-1-gran-premio-de-la-ciudad-de-mexico-boletos/artist/2085922';



const check = () => {
    let body = [];
    var gradasDisponibles = [];
    http.get(url, (response) => {
        response.on('data', (chunk) => {
            body.push(chunk);
        });
        response.on('end',()=>{
            body = Buffer.concat(body).toString();

            const $ = cheerio.load(body);        

            const div = $('ul[data-testid="eventList"]');

            if(div.length > 0){
                const li = $('li', div).toArray();
                
                for(let i = 0; i < li.length; i++){
                    const item = li[i];
                    const spanGrada = $('.sc-fyofxi-5.bZRRFX', item).toArray();
                    
                    //grada
                    var grada = $(spanGrada[2]).text();
                    grada = grada.substring(0, grada.indexOf(','));
                    
                    //disponibilidad
                    var disponibilidad = $('.sc-46xkoe-1.iPdfOf', item).text().toLowerCase();

                    disponibilidad = 'Poca Disponibilidad'.toLowerCase();

                    if(grada == '' && disponibilidad == '')
                        continue;

                    console.log({grada, disponibilidad});

                    if(grada.length > 0 && disponibilidad.length > 0 && (disponibilidad == 'poca disponibilidad')){
                        gradasDisponibles.push({grada, disponibilidad});
                    }
                }

                console.log(gradasDisponibles);

                if(gradasDisponibles.length >= 0) {
                    var message = `🚨 ${gradasDisponibles.length} Gradas disponibles!!!`;

                    gradasDisponibles.forEach(grada => {
                        message += `\n${grada.grada}`;
                    });

                    //console.log(message);

                    //llamar API de Whatsapp
                    const data = {
                        message: message,
                        to: '5559095251'
                    };
                    
                    needle('post','http://localhost:8081/send', data, {json: true})
                        .then((res) => {console.log(res.body)})
                        .catch((err)=>{console.warn(err.Message)});
                }

            } else {
                console.log('div length 0');
            }
        });
        response.on('error', (err) => console.log(err));
    }).on('error', console.error);
}

//setInterval(check, 15000);
check();