import React, { useState, useEffect } from "react";
import { Auth, API, DataStore, Predicates } from 'aws-amplify';
import { Quran } from '../../models';
import Alert from "../../components/alerts";

async function getUserData(username){
    let apiName = 'AdminQueries';
    let path = '/getUser';
    let myInit = { 
        queryStringParameters: {
            "username": username
        },
        headers: {
            'Content-Type' : 'application/json',
            Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        }
    }
    return await API.get(apiName, path, myInit);
}

function SkillsContainer({username}) {
    const [suran, setSuran] = useState([]);
    const [userFound, setUserFound] = useState(false);
    const [userdata, setUserdata] = useState([]);

    useEffect(() => {
        (async () => {
            let res = await getUserData(username);
            if (res.Username.length > 0) {
                setUserdata(res);
                setUserFound(true);
            }
        })();
    }, [username]);
    
    async function fetchData() {
        const getSuranList = await DataStore.query(Quran, Predicates.ALL, {
            sort: s => s.nr('DESCENDING')
        });
        setSuran(getSuranList);
    }

    useEffect(() => {
        fetchData();
        const subscription = DataStore.observe(Quran).subscribe(() =>
            fetchData()
        );
        return () => subscription.unsubscribe();
    });

    return (
        <div className="Skills">
            {userFound ? (
                <>
                <h1>{userdata.UserAttributes[3].Value} hat 49 Suran gelernt</h1>

                {!suran.length && <Alert type="warning" title="Laden fehlgeschlagen" content="Suran konnten nicht geladen werden" />}

                <div class="flex flex-wrap mt-4 -m-4">
                {suran.map(sura => (
                    <div class="p-2 md:w-1/4" key={sura.id}>
                        <div class="flex bg-gray-100 px-5 py-3 sm:flex-row flex-col">
                            <div class="w-7 h-6 sm:mr-5 inline-flex items-center justify-center text-gray-500 text-xl">{sura.nr}</div>
                            <div class="flex-grow text-gray-900 text-lg title-font font-medium">{sura.sura}</div>
                            <div class="flex items-center">
                                <input type="radio" name="skill" id="radio1" class="h-4 w-4" />
                                <label class="pl-1 pr-3 text-base font-medium">0</label>
                            </div>
                            <div class="flex items-center">
                                <input type="radio" name="skill" id="radio2" class="h-4 w-4" />
                                <label for="radio2" class="pl-1 pr-3 text-base font-medium">1</label>
                            </div>
                            <div class="flex items-center">
                                <input type="radio" name="skill" id="radio3" class="h-4 w-4" />
                                <label for="radio3" class="pl-1 text-base font-medium">2</label>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
                </>
            ): (<Alert type="error" title="Benutzer nicht gefunden" content="Benutzer ID konnte nicht zugeordnet werden." />)}
        </div>
    );
}

export default SkillsContainer;