import React, { useState, useEffect }  from 'react';
import "@aws-amplify/ui-react/styles.css";
import {  DataStore } from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-react';
import Login from '../../components/login';
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
            <div className="flex px-5 py-3 bg-lime-100 sm:flex-row">
                <div className="flex-grow">
                    <h2 className="text-lg font-medium text-gray-900 title-font">{sura.sura}</h2>
                    <p className="-mt-1 text-sm font-light leading-relaxed">Die Eröffnende</p>
                </div>
                <div className="inline-flex items-center justify-center flex-grow w-10 h-10 ml-auto text-xl text-gray-400 sm:flex-col">{sura.nr}</div>
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
            <h1>Salam {user.attributes.name} {user.attributes.family_name}</h1>

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