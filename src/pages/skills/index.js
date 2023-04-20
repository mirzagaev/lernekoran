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

async function getCurrentState(username, suraId) {
    const skillState = await DataStore.query(Skills, (c) => c.and(c => [
        c.teilnehmer.eq(username),
        c.skillsSuraId.eq(suraId)
    ]));
    return skillState;
}

async function onCreateSkill(username, suraId, state) {
    await DataStore.save(
        new Skills({
            teilnehmer: username,
            skillsSuraId: suraId,
            state: state,
        })
    );
}

const updateSkill = async ( original, newState ) => {
    if (original) {
        console.log(original);
        await DataStore.save(
            Skills.copyOf(original[0], updated => {
                updated.state = newState
            })
        )
    }
}

function SuraContainer({username, sura}) {
    const [stateSura, setStateSura] = useState(0);
    const checkboxSura = useRef();

    useEffect(() => {
        const subscription = DataStore.observe(Skills).subscribe((msg) => {
          console.log(msg.model, msg.opType, msg.element);
        });
    
        return () => subscription.unsubscribe();
    }, []);

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
    
    async function updateStateOfSkill(state, suraId) { 
        // get current state
        let currentSuraState = await getCurrentState(username, suraId);
        if ( currentSuraState.length === 0) {
            console.log("save new one");
            await onCreateSkill(username, suraId, state);
        } else {
            console.log("update");
            await updateSkill(currentSuraState, state);
        }
        // if current state is not null -> update; elseif -> save new one
        // setChecked(!checked);
    };

    return (
        <div className="w-full p-2 lg:w-1/2 xl:w-1/3 2xl:w-1/4">
            <div className={"flex flex-col px-5 py-3 sm:flex-row"+((stateSura===0 && " bg-gray-100") || (stateSura===1 && " bg-lime-100") || (stateSura===2 && " bg-amber-100"))}>
                <div className="inline-flex items-center justify-center h-6 text-xl text-gray-500 w-7 sm:mr-5">{sura.nr}</div>
                <div className="flex-grow text-lg font-medium text-gray-900 title-font">{sura.sura}</div>
                <div className="flex items-center">
                    <input
                        type="radio"
                        name={"sura_"+(sura.nr)}
                        id={"0_"+(sura.nr)}
                        className="w-4 h-4"
                        checked={stateSura===0 && true}
                        onChange={() => updateStateOfSkill(0, sura.id)}
                        ref={checkboxSura}
                    />
                    <label htmlFor={"0"+(sura.nr)} className="pl-1 pr-3 text-base font-medium">0</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="radio"
                        name={"sura_"+(sura.nr)}
                        id={"1"+(sura.nr)}
                        className="w-4 h-4"
                        checked={stateSura===1 && true}
                        onChange={() => updateStateOfSkill(1, sura.id)}
                        ref={checkboxSura}
                    />
                    <label htmlFor={"1"+(sura.nr)} className="pl-1 pr-3 text-base font-medium">1</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="radio"
                        name={"sura_"+(sura.nr)}
                        id={"2"+(sura.nr)}
                        className="w-4 h-4"
                        checked={stateSura===2 && true}
                        onChange={() => updateStateOfSkill(2, sura.id)}
                        ref={checkboxSura}
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