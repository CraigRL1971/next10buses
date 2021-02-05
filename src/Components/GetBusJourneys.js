import HTTPRequest from './HTTPRequest'

export default function getBusJourneys(lat, long, callback) {

    //  Get list of nearby bus stops
    const url = 'https://transportapi.com/v3/uk/places.json?app_id=57b508b1&app_key=e0f14057cb2bdd76f9889e64eb968936&lat=' + lat + '&lon=' + long + '&type=bus_stop';
    let allLiveData = [];  // We will use this array to aggregate the journeys for each stop.
    HTTPRequest(url)
        .then((data) => {
            //Get next three buses for each stop, consider first four stops only.
            let index = 0;
                while (index < 4) {
                    const atcocode = data.member[index].atcocode;
                    const liveDataUrl = 'https://transportapi.com/v3/uk/bus/stop/' + atcocode + '/live.json?app_id=57b508b1&app_key=e0f14057cb2bdd76f9889e64eb968936&group=route&limit=3&nextbuses=no';
                    HTTPRequest(liveDataUrl).then((liveData) => {
                        allLiveData.push(liveData);
                    })
                    .catch((error) => console.error(error));
                    index++;
                }
                callback(allLiveData);
            }   
        )      
        .catch((error) => console.error(error));

}