import React, { useState, useEffect }  from 'react';
import "@aws-amplify/ui-react/styles.css";
import {  DataStore } from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-react';
import Login from '../../components/login';
import Alert from '../../components/alerts';
import { Quran, Skills } from '../../models';

function SuraContainer({suraId}) {
    const [sura, setSura] = useState();

    useEffect(() => {
        DataStore.query(
            Quran, suraId
        ).then(function(res){
            setSura(res);
        });
    }, [suraId]);

    return (
        sura &&
        <div className="w-full p-4 sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5">
            <div className="flex items-center justify-center px-5 py-3 bg-lime-100 sm:flex-row">
                <div className="flex-grow">
                    <h2 className="text-lg font-medium text-gray-900 title-font">{sura.sura}</h2>
                    <p className="-mt-1 text-sm font-light leading-relaxed">Die Eröffnende</p>
                </div>
                <div className="inline-flex items-center justify-center ml-auto text-lg font-semibold text-gray-500 rotate-45 bg-white w-9 h-9 sm:flex-col">
                    <div className='-rotate-45'>{sura.nr}</div>
                </div>
            </div>
        </div>
    );
}

function UserContainer({user}) {
    // const [suran, setSuran] = useState([]);
    const [skills, setSkills] = useState([]);

    async function fetchData() {
        const SkillsList = await DataStore.query(Skills, (c) => c.and(c => [
            c.teilnehmer.eq(user.username),
            c.state.eq(1)
        ]));
        // console.log(SkillsList);
        setSkills(SkillsList);
    }
    
    useEffect(() => {
        fetchData();
        const subscription = DataStore.observe(Skills).subscribe(() =>
            fetchData()
        );
        return () => subscription.unsubscribe();
    });

    return (
        <div className="MemberSkillsContainer">
            <h1>Gelernte Suran</h1>

            <Alert type="info" title="Dein aktuelles Ziel" content="Absolviere die Prüfung für das 30. Kapitel, bevor du Suran aus dem 29. Kapitel lernst." />

            <div className="flex flex-wrap mt-4 -m-4">
                {skills.map(skill => (
                    <SuraContainer suraId={skill.skillsSuraId} key={skill.skillsSuraId} />
                ))}
            </div>
        </div>
    );
}

function Userpanel() {
    const { route, user } = useAuthenticator((context) => [
        context.route,
        context.user
    ]);
    
    return (
        <div className="w-full Userpanel">
            {route === 'authenticated' ? <UserContainer user={user} /> : <Login />}
        </div>
    );
}

export default Userpanel;