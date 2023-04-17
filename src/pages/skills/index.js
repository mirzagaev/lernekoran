import React, { useState, useEffect, useRef } from "react";
import { Auth, API, DataStore, Predicates } from 'aws-amplify';
import { Quran, Skills } from '../../models';
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

function SuraContainer({username, sura}) {
    const [stateSura, setStateSura] = useState(0);

    useEffect(() => {
        DataStore.query(Skills, (c) => c.and(c => [
            c.teilnehmer.eq(username),
            c.skillsSuraId.eq(sura.id)
        ])).then(function(result) {
            if(result.length > 0 ) {
                setStateSura(result[0].state);
            } else {
                setStateSura(0);
            }
        });
    }, [stateSura, username, sura]);

    return (
        <div className="p-2 md:w-1/4">
            <div className={"flex flex-col px-5 py-3 sm:flex-row"+((stateSura===0 && " bg-gray-100") || (stateSura===1 && " bg-lime-100") || (stateSura===2 && " bg-amber-100"))}>
                <div className="inline-flex items-center justify-center h-6 text-xl text-gray-500 w-7 sm:mr-5">{sura.nr}</div>
                <div className="flex-grow text-lg font-medium text-gray-900 title-font">{sura.sura}</div>
                <div className="flex items-center">
                    <input
                        type="radio"
                        name={"sura_"+(sura.nr)}
                        id={"0_"+(sura.nr)}
                        className="w-4 h-4"
                        value="0"
                        checked={stateSura===0 && true}
                        // onChange={checkHandler}
                        // ref={checkbox0}
                    />
                    <label htmlFor={"0"+(sura.nr)} className="pl-1 pr-3 text-base font-medium">0</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="radio"
                        name={"sura_"+(sura.nr)}
                        id={"1"+(sura.nr)}
                        className="w-4 h-4"
                        value="1"
                        checked={stateSura===1 && true}
                        // onChange={checkHandler}
                        // ref={checkbox1}
                    />
                    <label htmlFor={"1"+(sura.nr)} className="pl-1 pr-3 text-base font-medium">1</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="radio"
                        name={"sura_"+(sura.nr)}
                        id={"2"+(sura.nr)}
                        className="w-4 h-4"
                        value="2"
                        checked={stateSura===2 && true}
                        // onChange={checkHandler}
                        // ref={checkbox2}
                    />
                    <label htmlFor={"2"+(sura.nr)} className="pl-1 text-base font-medium">2</label>
                </div>
            </div>
        </div>
    );
}

function SkillsContainer({username}) {
    const [userFound, setUserFound] = useState(false);
    const [userdata, setUserdata] = useState([]);
    const [suran, setSuran] = useState([]);
    const [skillsNr, setSkillsNr] = useState(0);

    useEffect(() => {
        (async () => {
            let res = await getUserData(username);
            if (res.Username.length > 0) {
                setUserdata(res);
                setUserFound(true);

                // get Number of Skills
                DataStore.query(Skills, (c) => c.and(c => [
                    c.teilnehmer.eq(username),
                    c.state.eq(1)
                ])).then(function(result) {
                    setSkillsNr(result.length);
                });
            } else {
                setUserFound(false);
                setSkillsNr(0);
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
                <h1>{userdata.UserAttributes[3].Value} hat {skillsNr} Suran gelernt</h1>
                {!suran.length && <Alert type="warning" title="Laden fehlgeschlagen" content="Suran konnten nicht geladen werden" />}
                
                <div className="flex flex-wrap mt-4 -m-4">
                {suran.map(sura => (
                    <SuraContainer username={username} sura={sura} key={sura.id} />
                ))}
                </div>

                
                </>
            ): (<Alert type="error" title="Benutzer nicht gefunden" content="Benutzer ID konnte nicht zugeordnet werden." />)}
        </div>
    );
}

export default SkillsContainer;